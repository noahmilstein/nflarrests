
known_categories = [
  'alcohol',
  'animal abuse',
  'animal cruelty',
  'animal neglect',
  'assault',
  'attempted murder',
  'battery',
  'breach of peace',
  'burglary',
  'child abuse',
  'child support',
  'criminal mischief',
  'coercion',
  'disorderly conduct',
  'disturbing the peace',
  'dogfighting',
  'domestic',
  'domestic dispute',
  'domestic violence',
  'drugs',
  'dui',
  'eluding police',
  'evading arrest',
  'evading police',
  'failure to appear',
  'false information',
  'false name',
  'fraud',
  'gambling',
  'gun',
  'handicap parking',
  'harassment',
  'hit and run',
  'indecent exposure',
  'interfering with police',
  'leaving scene',
  'license',
  'manslaughter',
  'murder',
  'obstruction',
  'outstanding warrant',
  'pimping',
  'privacy invasion',
  'probation violation',
  'property destruction',
  'public intoxication',
  'public urination',
  'rape',
  'reckless endangerment',
  'reckless driving',
  'resisting arrest',
  'resisting officer',
  'theft',
  'traffic warrant',
  'trespassing',
  'sex',
  'sexual assault',
  'sexual battery',
  'solicitation',
  'stalking',
  'stolen possession',
  'violating court order',
  'weapon'
]

known_categories.each do |category|
  Category.create(name: category)
end

categories_to_correct = [
  'assasult',
  'traffic warrants',
  'resisting arres',
  'resisting arrres',
  'reckless dri',
  'hit-and-run',
  'alcoh',
  'alcoho',
  'disorderly condu',
  'leaving scene.',
  'guns'
]

teams = "http://nflarrest.com/api/v1/team"
allTeams = HTTParty.get(teams)

allTeams.each do |team|
  Team.create(code: team['Team'].rstrip.lstrip, name: team['Team_name'], city: team['Team_city'])
end

all_team_objects = Team.all

all_team_objects.each do |team|

  team_crime_list = "http://nflarrest.com/api/v1/team/arrests/#{team.code}"
  teamCrimeList = HTTParty.get(team_crime_list)

  teamCrimeList.each do |crime|

    crime_category_objects = []

    if crime['Category'].is_a?(String) && crime['Category'].include?(',')
      categories = crime['Category'].split(',')
    elsif crime['Category'].is_a?(String)
      categories = [crime['Category']]
    end

    categories.each do |cat|

      category = cat.downcase.lstrip.rstrip

      if categories_to_correct.include?(category)
        if category == 'traffic warrants'
          category = 'traffic warrant'
        elsif category == 'resisting arres' || category == 'resisting arrres'
          category = 'resisting arrest'
        elsif category == 'reckless dri'
          category = 'reckless driving'
        elsif category == 'hit-and-run'
          category = 'hit and run'
        elsif category == 'alcoh' || category == 'alcoho'
          category = 'alcohol'
        elsif category == 'disorderly condu'
          category = 'disorderly conduct'
        elsif category == 'leaving scene.'
          category = 'leaving scene'
        elsif category == 'guns'
          category = 'gun'
        elsif category == 'assasult'
          category = 'assault'
        end
      end

      category_object = Category.where(name: category)
      crime_category_objects << category_object

    end

    date = Date.parse(crime['Date'])
    crime_object = Crime.create(team_id: team.id, categories: crime_category_objects.flatten, date: date, name: crime['Name'], position: crime['Position'], encounter: crime['Encounter'], description: crime['Description'], outcome: crime['Outcome'])

  end
end
