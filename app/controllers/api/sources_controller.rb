class Api::SourcesController < ApiController
  def all_teams
    teams = "http://nflarrest.com/api/v1/team"
    allTeams = HTTParty.get(teams)

    data_json = { allTeams: allTeams }
    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end

  def crime_count
    teamID = params[:teamID]
    team_crime_count = "http://nflarrest.com/api/v1/team/topCrimes/#{TeamID}"
    teamCrimeCount = HTTParty.get(team_crime_count)
    binding.pry

    # currently working here 
    # data_json = { allTeams: allTeams }
    # respond_to do |format|
    #   format.json { render json: data_json }
    #   format.html
    # end
  end
end
