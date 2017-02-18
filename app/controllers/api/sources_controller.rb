class Api::SourcesController < ApiController
  def all_teams
    allTeamsJSON = JSON.parse(Team.all.to_json)

    allTeamsJSON.each do |team|
      team_obj = Team.find(team['id'])
      team['crimes'] = JSON.parse(team_obj.crimes.to_json)
      team['crimes'].each do |crime|
        crime_obj = Crime.find(crime['id'])
        crime['categories'] = JSON.parse(crime_obj.categories.to_json)
      end
    end

    data_json = { allTeams: allTeamsJSON }

    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end
end
