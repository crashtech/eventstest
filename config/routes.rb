Rails.application.routes.draw do
  scope path: '/api' do
    get '/typeahead/:action', controller: 'typeahead'

    resources :events, only: %i[index create]

    namespace :shared do
      get :music_genres
    end
  end

  match '*path', to: 'application#index', via: :all
  root 'application#index'
end
