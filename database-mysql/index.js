const Sequelize = require('sequelize');


const sequelize = new Sequelize('geneflix', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: './database.sqlite',
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  Agreeableness: Sequelize.STRING,
  Neuroticism: Sequelize.STRING,
  Extraversion: Sequelize.STRING,
  Conscientiousness: Sequelize.STRING,
  Openness: Sequelize.STRING,
  Depression: Sequelize.STRING,
  Anger: Sequelize.STRING,
  Reward: Sequelize.STRING,
  Harm: Sequelize.STRING,
  Gambling: Sequelize.STRING,
  Novelty: Sequelize.STRING,
});

const Movie = sequelize.define('movie', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  trailer: Sequelize.STRING,
  imdb_rating: Sequelize.STRING,
  RT_rating: Sequelize.STRING
});

const Watched = sequelize.define('watched', {
  userID: Sequelize.DataTypes.INTEGER,
  movieID: Sequelize.DataTypes.INTEGER
});

const Genre = sequelize.define('genre', {
  name: Sequelize.STRING,
  keyID: Sequelize.DataTypes.INTEGER
});

// const Preferences = sequelize.define('user', {

// });

const MovieGenre = sequelize.define('moviegenre', {
  movieID: Sequelize.DataTypes.INTEGER,
  genreID: Sequelize.DataTypes.INTEGER
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    // console.log(jane.toJSON());
  });

  exports.User = User;
  exports.Movie = Movie;
  exports.Genre = Genre;
  exports.Watched = Watched;
  exports.MovieGenre = MovieGenre;
