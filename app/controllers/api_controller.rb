class ApiController < ApplicationController
  rescue_from Exception,                          with: :internal_error
  rescue_from ActiveRecord::RecordInvalid,        with: :invalid_record
  rescue_from ActiveRecord::RecordNotFound,       with: :record_not_found
  rescue_from ActionController::ParameterMissing, with: :invalid_data

  serialization_scope :view_context

  skip_before_action :verify_authenticity_token

  # Just so it has a root url
  def index
    render json: { version: 'v1' }
  end

  protected

    # Use request params to apply pagination to records
    def apply_pagination(relation)
      relation = relation.page(params[:page] || 1)
      relation = relation.per(params[:per]) if params.key?(:per)
      response.headers['X-Chunks'] = relation.total_pages
      relation
    end

    # Handle any other exception
    def internal_error(exception)
      log_error_message(exception, :fatal)
      if Rails.env.production?
        render json: { error: I18n.t(:exception) }, status: :internal_server_error
      else
        backtrace = exception.backtrace# .select { |path| path.start_with?(Rails.root.to_s) }
        render plain: <<~ERROR, status: :internal_server_error
        [#{exception.class.name}]
        #{exception.message};
        Application trace:
        #{backtrace.inspect}
        ERROR
      end
    end

    # Handle errors for invalid records
    def invalid_record(exception)
      log_error_message(exception, :info)
      render json: {
        error: exception.message,
        details: exception.record.errors.details,
        messages: exception.record.errors.messages
      }, status: :not_acceptable
    end

    # Handle errors on ActiveRecord::Base#find
    def record_not_found(exception)
      log_error_message(exception, :info)
      render json: { error: exception.message }, status: :not_found
    end

    # Handle errors with strong parameters and filter errors
    def invalid_data(exception)
      log_error_message(exception, :warn)
      render json: { error: exception.message }, status: :bad_request
    end

    # Handle any errors for test purpose
    def log_error_message(exception, level)
      backtrace = exception.backtrace.select { |path| path.start_with?(Rails.root.to_s) }
      Rails.logger.public_send(level, <<~ERROR.squish)
      [#{exception.class.name}]
      #{exception.message};
      Application trace: #{backtrace.inspect}
      Full trace: #{exception.backtrace.inspect}
      ERROR
    end
end
