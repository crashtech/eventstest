source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.3'

# Manage local env variables
gem 'dotenv-rails', '~> 2.7', '>= 2.7.5', require: 'dotenv/rails-now'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.4'
# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

## DATABASE RELATED
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Pagination
gem 'kaminari', '~> 1.2'
# Allows you to generate your JSON in an object-oriented and convention-driven manner
gem 'active_model_serializers', '~> 0.10.10'
# Add support to complex resources of PostgreSQL
gem 'torque-postgresql', '~> 1.1.4'

## SERVER RELATED
# Use Puma as the app server
gem 'puma', '~> 4.3', '>= 4.3.3'
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors', '~> 1.1', '>= 1.1.1'

## EXTRAS
# TZInfo provides daylight savings aware transformations between times in different time zones
gem 'tzinfo', '~> 1.2', '>= 1.2.5'

## FRONT END APP
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker'

group :development, :test do
  # Process manager for applications with multiple components
  gem 'foreman', '~> 0.87.1'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # RSpec rails is a testing framework for Rails
  gem 'rspec-rails', '~> 4.0'
  # Strategies for cleaning databases. Can be used to ensure a clean state for testing
  gem 'database_cleaner', '~> 1.8', '>= 1.8.4'
  # A substitute for fixtures
  gem 'factory_bot_rails', '~> 5.1', '>= 5.1.1'
  # Gem for generating fake test data such as names and emails
  gem 'faker', '~> 2.11'
  # Code coverage for Ruby 1.9 or newer
  gem 'simplecov', '~> 0.18.5'
  # Use rubocop for code syntax policies
  gem 'rubocop', '~> 0.81.0'
  # Code style checking for RSpec files
  gem 'rubocop-rspec', '~> 1.38', '>= 1.38.1'
  # Add a comment summarizing the current schema
  gem 'annotate', '~> 3.1', '>= 3.1.1'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
