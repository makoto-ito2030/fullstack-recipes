namespace :db do
  desc "Apply schema using Ridgepole and annotate models"
  task :migrate do
    config = Rails.configuration.database_configuration[Rails.env]
    cmd = [
      "bundle exec ridgepole",
      "-c config/database.yml",
      "--env #{Rails.env}",
      "--apply",
      "-f db/Schemafile"
    ].join(" ")

    puts "Running Ridgepole..."
    system(cmd)

    puts "Running Annotate..."
    system("bundle exec annotate")
  end
end
