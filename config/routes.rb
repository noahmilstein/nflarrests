Rails.application.routes.draw do

  root 'pages#home'
  get '/', to: 'pages#home'

  get '/api/sources/all_teams', to: 'api/sources#all_teams'
  post '/api/sources/crime_count', to: 'api/sources#crime_count'

  namespace :api do
    resources :sources, only: [:all_teams, :crime_count]
  end

end
