if Rack::Handler.constants.include?(:Puma)
  settings = YAML.load_file('config/schedule.yml')
  Rails.logger.info("=> Loading #{settings.nil? ? 0 : settings.size} cron jobs")
  Sidekiq::Cron::Job.load_from_hash!(settings) unless settings.nil?
end
