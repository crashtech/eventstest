class TypeaheadController < SharedController
  RESULT_LIMIT = 20.freeze

  def artists
    render_options Artist.verified.default_sortted.fuzzysearch(value).limit(RESULT_LIMIT).pluck(:id, :name)
  end

  def locations
    render_options Location.verified.default_sortted.fuzzysearch(value).limit(RESULT_LIMIT).pluck(:id, :name)
  end

  protected

    def value
      params[:value]
    end
end
