class TypeaheadController < ApiController
  RESULT_LIMIT = 20.freeze

  def artists
    render_options Artist.verified.default_sortted.fuzzysearch(value).limit(RESULT_LIMIT).pluck(:id, :name)
  end

  def locations
    render_options Location.verified.default_sortted.fuzzysearch(value).limit(RESULT_LIMIT).pluck(:id, :name)
  end

  def music_genres
    render_options MusicGenre.verified.default_sortted.fuzzysearch(value).limit(RESULT_LIMIT).pluck(:id, :name)
  end

  protected

    def render_options(records)
      result = records.map { |(value, text)| { value: value, text: text } }
      render json: result
    end

    def value
      params[:value]
    end
end
