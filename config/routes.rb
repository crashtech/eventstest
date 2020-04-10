Rails.application.routes.draw do
  scope path: '/api' do
    namespace :typeahead do
      get :artists
      get :locations
    end

    resources :events, only: %i[index create]

    namespace :shared do
      get :music_genres
    end
  end

  match '*path', to: 'application#index', via: :all
  root 'application#index'
end
