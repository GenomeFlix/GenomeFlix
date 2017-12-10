var db = require('./index.js');
// User, Movie, Watched, Genre, MovieGenre
module.exports = {
  users: {
    query: function (cb) {
      db.User.findAll()
        .then(function(users) {
          cb(users);
        });
    },

    save: function (name, traits, cb) {
      // USAGE
      // name: String
      // traits: Object
        // e.g {Agreeableness: 4, ...}
      // cb: function
      var details = {
        name: name
      };

      for (var trait in traits) {
        details[trait] = traits[trait];
      }

      console.log('Details', details);

      db.User.create(details)
        .then(user => {
          console.log(user, 'created.');
          cb(user);
        });

    },  
  },
  movies: {
    query: function (cb) {
      db.Movie.findAll({include: [db.Movie]})
      .then(function(movies) {
        console.log(movies, 'returned.');
        cb(movies);
      });
    },

    save: function (details, cb) {
      var title = details.title;
      var description = details.description;
      var trailer = details.trailer;
      var imdb_rating = details.imdb_rating;
      var RT_rating = details.RT_rating;
      db.Movie.create({
        title: title,
        description: description,
        trailer: trailer,
        imdb_rating: imdb_rating,
        RT_rating: RT_rating
      })
      .then(movie => {
        console.log(movie, 'created.');
        cb(movie);
      });

    }
  },

  watched: {
    
  },

  genres: {
    query: function (cb) {
      db.Genre.findAll()
      .then(function(genres) {
        genres = genres.map(genre => genre.dataValues);
        console.log(genres, 'returned.');
        cb(genres);
      });
    },

    save: function (name, id, cb) {
      db.Genre.create({
        name: name,
        keyID: id
      })
      .then(genre => {
        console.log(genre, 'created.');
        cb(genre);
      })

    }
    
  }, 
  movieGenres: {
    
  }
   

};
var movie = {
  title: '1984',
  description: 'jkkfawkjkjfjk kalkjwekfljwelj',
  trailer: 'fawejfkaw',
  imdb_rating: 'kakwefklwa',
  RT_rating: 'jkfalwjkefkljwe'
};

// test code

setTimeout(function () {
  // module.exports.movies.save(movie, function (data) {
  //   console.log('Data returned', data);
  // });
  /*
  Agreeableness
Neuroticism
Extraversion
Conscientiousness
Openness
Depression
Anger
Reward
Harm
Gambling
Novelty
  */
  var traits = {
    Agreeableness: 4,
    Neuroticism: 5,
    Extraversion: 2,
    Conscientiousness: 2,
    Openness: 3,
    Depression: 4,
    Anger: 3,
    Reward: 3,
    Harm: 1,
    Gambling: 2,
    Novelty: 3
  };

  // module.exports.users.save('Victor', traits, function (user) {
  //   console.log('User returned', user);
  // });
  module.exports.genres.save('Horredy', 400, function (results) {
    module.exports.genres.query(function (genres) {
      console.log('Genres returned', genres);
    });
  });
  
}, 2000);