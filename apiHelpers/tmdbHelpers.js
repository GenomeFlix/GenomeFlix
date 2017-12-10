const tmdb = require('./tmdb.js');
const request = require('request');
const Promise = require('bluebird');

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
}

var MovieList = {
  getMoviesByGenre: (cb) => {
    var cont = [];
    for(var i = 0; i < Object.keys(genreIds).length; i++){
      console.log(i)
      tmdb.call('/discover/movie', {
        'language': 'en-US',
        'include_adult': 'false',
        'sort_by': 'popularity',
        'with_genres': Object.values(genreIds)[i]
      }, function (result) {
        for(var x = 0; x < result.results.length; x++) {
          // console.log(result.results[0].id);
          console.log(x)
          cont = cont.concat(result.results[x].id);
        }
        if(i === Object.keys(genreIds).length){

          // console.log(cont, 'here')
          var cont2 = []
          for(var j = 0; j < cont.length; j++){
            tmdb.call('/movie/'+cont[j], {
              'language': 'en-US',
              'include_adult': 'false',
              'sort_by': 'popularity',
              'with_genres': Object.values(genreIds)[i]
            }, function (result) {
              console.log(result[0], '123123123') 
              // TODO SAVE THIS
              // MovieList.getTrailersById(result.id, (err, res) => {
              //   if(err){
              //     console.log('broken')
              //   }
              //   console.log(res, '@@@@@@')
              // })
              cont2[cont2.length] = result;
              if(j === cont.length){
                console.log(cont2, '@@@@@@@@@@@@@@')

              }

            }, function(e) {
              if(e){
                console.log('error in api call for', genre, 'genre')
              }
            });
          }
console.log(cont2, '##############')

        }

      }, function(e) {
        if(e){
          console.log('error in api call for', genre, 'genre')
        }
      });

    }





  },

  getTrailersById: (id, cb) => {
    tmdb.call('/movie/' + id + '/videos', {
      'language': 'en-US',
    }, (e) => {
      console.log(e, 'trailers');
      cb(null, e.results);
    }, (e) => {
      console.log('errorintrailers');
      cb(e, null);
    });
  },

  // getSimilarMovies: (movie, cb) => {
  //   tmdb.call('/movie/' + movie + '/similar', {
  //     'language': 'en-US',
  //   }, (e) => {
  //     var movieArr = [];
  //     e.results.forEach( value => {
  //       omdbSearch(value.original_title, value.release_date, (err, res) => {
  //         if (res[0] === '<' || res[0] === 'I') {
  //           console.log('similarbroke');
  //         } else {
  //           var resp = JSON.parse(res);
  //           movieArr.push(resp);
  //           if (movieArr.length === e.results.length) {
  //             cb(null, movieArr);
  //           }
  //         }
  //       });
  //     });
  //   }, (e) => {
  //     cb(e, null);
  //   });
  //
  // },

};

module.exports = MovieList;
