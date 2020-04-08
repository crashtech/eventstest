class EventsController < ApiController
  def create
    resource = Event.create!(permitted_params)
    render json: resource, status: :created
  end

  private

    def permitted_params
      params.require(:event).permit(:title, :kind, :date, :location, artists: [], music_genres: [])
    end
end
