require 'sidekiq/web'
require 'sidekiq/cron/web'

Rails.application.routes.draw do
  root 'application#index'

  mount Sidekiq::Web, at: '/sidekiq'

  scope path: '/api' do
    mount ActionCable.server, at: '/cable'
  end
end
