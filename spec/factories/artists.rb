FactoryBot.define do
  factory :artist do
    name { Faker::Name.name }

    trait :verified do
      slug { Faker::Internet.slug(words: name, glue: '-') }
      verified_at { Time.current }
    end
  end
end
