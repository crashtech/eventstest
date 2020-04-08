require 'sidekiq/web'
require 'sidekiq/cron/web'

Rails.application.routes.draw do
  scope path: '/api' do
    mount ActionCable.server, at: '/cable'

    get '/typeahead/:action', controller: 'typeahead'

    namespace :shared do
      get :music_genres
    end
  end

  mount Sidekiq::Web, at: '/sidekiq'

  match '*path', to: 'application#index', via: :all
  root 'application#index'
end
