class Api::SourcesController < ApiController
  def all_teams
    allTeamsJSON = JSON.parse(Team.all.to_json)
    allCrimeCategoriesJSON = JSON.parse(Category.all.to_json)

    # allTeams = Team.all
    # allTeams.each do |team|
    #   team.crimes.length
    #   team.crimes.each do |crime|
    #     crime.categories.each do |cat|
    #       puts cat.name
    #     end
    #   end
    # end


    allTeamsJSON.each do |team|
      team_obj = Team.find(team['id'])
      team['crimes'] = JSON.parse(team_obj.crimes.to_json)
      team['crimes'].each do |crime|
        crime_obj = Crime.find(crime['id'])
        crime['categories'] = JSON.parse(crime_obj.categories.to_json)
      end
    end

    data_json = { allTeams: allTeamsJSON, allCategories: allCrimeCategoriesJSON }

    respond_to do |format|
      format.json { render json: data_json }
      format.html
    end
  end
end
