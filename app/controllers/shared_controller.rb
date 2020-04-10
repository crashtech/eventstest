class SharedController < ApiController
  def music_genres
    collection = MusicGenre.default_sortted
    collection = collection.verified unless params[:unverified].eql?('true')
    render_options collection.pluck(:id, :name)
  end

  protected

    def render_options(records)
      result = records.map { |(value, text)| { value: value, text: text } }
      render json: result
    end
end
