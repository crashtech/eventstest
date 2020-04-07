class ApplicationJob < ActiveJob::Base
  def perform(*)
    raise NotImplementedError
  end
end
