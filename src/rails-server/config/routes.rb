Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'temperatures/filter_one_date/:date', to: 'temperatures#filter_one_date'
  resources :temperatures
end
