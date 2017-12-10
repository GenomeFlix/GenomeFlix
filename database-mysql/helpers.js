var db = require('./index.js');
// User, Movie, Watched, Genre, MovieGenre

var filterRow = (rows) => {
  if (Array.isArray(rows)) {
    return rows.map(row => row.dataValues);
  }
  if (rows.dataValues) {
    return rows.dataValues;
  } else {
    console.log('FILTERING INVALID', rows);
  }
};

var genreRowIds = {}; // where rowIds for genres are stored

var clearTables = () => {
  var promises = [];
  for (var schema in db) {
    promises.push(db[schema].drop());
  }

  Promise.all(promises)
    .then(done => {
      console.log('Tables cleared!');

      var genreIds = {
        "Action": 28,
        "Adventure": 12,
        "Animation": 16,
        "Comedy": 35,
        "Crime": 80,
        "Documentary": 99,
        "Drama": 18,
        "Family": 10751,
        "Fantasy": 14,
        "History": 36,
        "Horror": 27,
        "Music": 10402,
        "Mystery": 9648,
        "Romance": 10749,
        "Science Fiction": 878,
        "Thriller": 53,
        "War": 10752,
        "Western": 37
      };

      promises = [];
      setTimeout(function () {
        for (var genre in genreIds) {
          // db.genre() // use: name, id, cb
          promises.push(module.exports.genres.save(genre, genreIds[genre]));
        }

        Promise.all(promises)
          .then(genres => {
            genres.forEach(genre => { // turns genres into a more easily manageable form
              genre = genre.dataValues;
              genreRowIds[genre.name] = genre.id;
            });

            // TESTING A MOVIE
            console.log('genreRowIds FRESHLY made', genreRowIds);
            setTimeout(function () {
              module.exports.movies.save(movie, ['Documentary', 'Comedy'])
                .then(function (movieRow) {

                  // movie genres should be populated w/ a row per genre now!
                  console.log('MOVIE ROW', movieRow);
                })
                .catch(function (err) {
                  console.error(err);
                });

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

              });
            }, 2000);
            

      }, 2000);
    })
    .catch(err => {
      console.error(err);
    });
};


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
        // console.log(movies, 'returned.');
        cb(movies);
      });
    },

    save: function (details, genres) {
      var title = details.title;
      var description = details.description;
      var trailer = details.trailer;
      var imdb_rating = details.imdb_rating;
      var RT_rating = details.RT_rating;
      return db.Movie.create({
        title: title,
        description: description,
        trailer: trailer,
        imdb_rating: imdb_rating,
        RT_rating: RT_rating
      })
      .then(movieRow => {
        movieRow = filterRow(movieRow);
        console.log('Movie Row fresh saved', movieRow);
        var promises = [];
        var movieGenres = []; // just need to add genreId as second field

        console.log('genreRowIds', genreRowIds, 'genres', genres);

        genres.forEach(genre => {
          console.log('Genre', genre);
          console.log('genreRowIds[genre]', genreRowIds[genre]);

          var movieGenre = [];
          if (genreRowIds[genre]) {
            movieGenres.push([movieRow.id, genreRowIds[genre]]);
          } else {
            console.log('THAT GENRE ISNT IN YOUR TABLE. SHOW ME WHAT YOU GOT!');
          }
        });

        movieGenres.forEach(movieGenre => {
          var movieId = movieGenre[0];
          var genreId = movieGenre[1];

          promises.push(module.exports.movieGenres.save(movieId, genreId));
        });
        
        return Promise.all(promises)
          .then(movieGenre => {
            console.log('Movie genres all added!');
          });
      });

    },
    saveAll: function () {

    }
  },

  watched: {
    query: function (cb) {
      db.Watched.findAll()
      .then(function(entries) {
        entries = entries.map(entry => entry.dataValues);
        console.log(entries, 'returned.');
        cb(entries);
      });

    },

    save: function (userID, movieID, cb) {
      db.Watched.create({
        userID: userID,
        movieID: movieID
      })
      .then(watched => {
        console.log(watched, 'entry created.');
        cb(watched);
      });

    }
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

    save: function (name, id) {
      return db.Genre.create({
        name: name,
        keyID: id
      });

    }
    
  }, 
  movieGenres: {
    query: function (cb) {
      db.MovieGenre.findAll()
      .then(function(genres) {
        genres = genres.map(genre => genre.dataValues);
        console.log(genres, 'returned.');
        cb(genres);
      });
    },

    save: function (movieID, genreID) {
      db.MovieGenre.create({
        movieID: movieID,
        genreID: genreID
      })
      .then(movieGenreEntry => {
        console.log(movieGenreEntry, 'movie genre entry created.');
      });

    }
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

clearTables();
