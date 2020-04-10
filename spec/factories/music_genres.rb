FactoryBot.define do
  factory :music_genre do
    name { Faker::Music.genre }

    trait :verified do
      slug { Faker::Internet.slug(words: name, glue: '-') }
      verified_at { Time.current }
    end
  end
end
