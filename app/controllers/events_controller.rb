class EventsController < ApiController
  def index
    Event.using_timezone do
      collection = apply_filters(Event.default_sortted.future)
      render json: apply_pagination(collection)
    end
  end

  def create
    resource = Event.create!(permitted_params)
    render json: resource, status: :created
  end

  private

    def permitted_params
      params.require(:event).permit(:title, :kind, :date, :location, artists: [], music_genres: [])
    end

    def apply_filters(collection)
      super({ without_genres: :skip_genres, with_genre_slug: :genre_slug }, collection)
    end
end
