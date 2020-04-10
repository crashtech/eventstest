require 'rails_helper'

RSpec.describe HasFuzzySearch do
  context 'with single field' do
    let!(:model) do
      Class.new(ApplicationRecord) do
        self.table_name = 'artists'
        include HasFuzzySearch
        fuzzysearch :name
      end
    end

    it 'creates a query to search by soundex and ilike' do
      query = model.fuzzysearch('test').to_sql
      search = '(soundex("artists"."name") = soundex(\'test\') OR "artists"."name" ILIKE \'%test%\')'
      expect(query).to include(search)
    end
  end

  context 'with multiple fields' do
    let!(:model) do
      Class.new(ApplicationRecord) do
        self.table_name = 'music_genres'
        include HasFuzzySearch
        fuzzysearch :name, :slug
      end
    end

    it 'creates a query to search by soundex and ilike using or condition' do
      query = model.fuzzysearch('test').to_sql
      search = '(soundex("music_genres"."name") = soundex(\'test\') OR "music_genres"."name" ILIKE \'%test%\')'
      search += ' OR (soundex("music_genres"."slug") = soundex(\'test\') OR "music_genres"."slug" ILIKE \'%test%\')'
      expect(query).to include(search)
    end

    it 'creates a query to search by soundex and ilike using and condition' do
      query = model.fuzzysearch('test', condition: :and).to_sql
      search = '(soundex("music_genres"."name") = soundex(\'test\') OR "music_genres"."name" ILIKE \'%test%\')'
      search += ' AND (soundex("music_genres"."slug") = soundex(\'test\') OR "music_genres"."slug" ILIKE \'%test%\')'
      expect(query).to include(search)
    end
  end
end
