FactoryBot.define do
  factory :event do
    title { Faker::Esport.event }
    date { rand(1..90).days.from_now }
    location { Faker::WorldCup.stadium }
    artists { [Faker::Name.name] }

    trait :past do
      date { rand(1..90).days.ago }
    end

    transient do
      with_genres { 3 }
      new_genres { true }
    end

    before(:create) do |event, evaluator|
      event.music_genres ||= begin
        genres = MusicGenre.all.load.to_a
        genres << nil if evaluator.new_genres
        rand(1..evaluator.with_genres).times.map do
          genres.sample || Faker::Music.genre
        end.uniq
      end
    end
  end
end
