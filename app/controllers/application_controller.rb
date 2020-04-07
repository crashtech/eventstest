class ApplicationController < ActionController::Base
  around_action :set_time_zone

  def index
    request.session_options[:skip] = true
    render file: 'layouts/application.html.erb'
  end

  protected

    def set_time_zone(&block)
      timezone = timezone_from_header || 'UTC'
      Time.use_zone(timezone, &block)
    end

    def timezone_from_header
      request.headers['X-TZ']
    end
end
