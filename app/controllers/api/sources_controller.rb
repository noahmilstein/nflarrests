class Api::SourcesController < ApiController
  def all_teams
    teams = "http://nflarrest.com/api/v1/team"
    allTeams = HTTParty.get(teams)

    binding.pry

    count = 1
    allTeams.map do |team|
      teamID = team['Team'].rstrip
      team_crime_count = "http://nflarrest.com/api/v1/team/topCrimes/#{teamID}"
      teamCrimeCount = HTTParty.get(team_crime_count)
      # team_crime_list = "http://nflarrest.com/api/v1/team/arrests/#{teamID}"
      # teamCrimeList = HTTParty.get(team_crime_list)
      team['id'] = count
      count += 1
      team["teamCrimeCount"] = teamCrimeCount
      # team["teamCrimeList"] = teamCrimeList
    end

    data_json = { allTeams: allTeams }
    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end

  # def crime_count
  #   teamID = params[:teamID].rstrip
  #   team_crime_count = "http://nflarrest.com/api/v1/team/topCrimes/#{teamID}"
  #   teamCrimeCount = HTTParty.get(team_crime_count)
  #   team_crime_list = "http://nflarrest.com/api/v1/team/arrests/#{teamID}"
  #   teamCrimeList = HTTParty.get(team_crime_list)
  #
  #   data_json = { teamCrimeCount: teamCrimeCount, teamCrimeList: teamCrimeList }
  #   respond_to do |format|
  #     format.json { render json: data_json }
  #     format.html
  #   end
  # end
end
