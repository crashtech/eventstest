FactoryBot.define do
  factory :location do
    name { Faker::WorldCup.stadium }

    trait :verified do
      verified_at { Time.current }
    end
  end
end
