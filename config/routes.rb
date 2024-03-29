Rails.application.routes.draw do
  resources :invoices, only: [:index, :create, :destroy, :show]
  resources :transactions, only: [:index, :create, :destroy, :show]
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
