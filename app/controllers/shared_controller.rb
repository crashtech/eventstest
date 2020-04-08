class SharedController < ApiController
  def music_genres
    render_options MusicGenre.verified.default_sortted.pluck(:id, :name)
  end

  protected

    def render_options(records)
      result = records.map { |(value, text)| { value: value, text: text } }
      render json: result
    end
end
