var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

console.log('KEY IS', process.env.TMDB_API_KEY);
const tmdb = {
  'api_key': process.env.TMDB_API_KEY,
  'base_uri': 'http://api.themoviedb.org/3',
  'images_uri': 'http://image.tmdb.org/t/p',
  'timeout': 5000,
  call: function(url, params, success, error) {

    var params_str = 'api_key=' + tmdb.api_key;
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        params_str += '&' + key + '=' + encodeURIComponent(params[key]);
        // console.log(params_str, '!!$$!$!$!')
      }
    }
    var xhr = new XMLHttpRequest();
    xhr.timeout = tmdb.timeout;
    xhr.ontimeout = function() {
      throw ('Request timed out: ' + url + ' ' + params_str);
    };
    // console.log(tmdb.base_uri + url + '?' + params_str, 'dfdfdfdfd');
    xhr.open('GET', tmdb.base_uri + url + '?' + params_str, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.responseType = 'text';
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          if (typeof success == 'function') {
            success(JSON.parse(this.responseText));
          } else {
            throw ('No success, but the request gave results');
          }
        } else {
          if (typeof error == 'function') {
            if (this.response !== undefined) {
              error(JSON.parse(this.response));
            } else {
              error(this.response);
            }
          } else {
            throw ('No error callback');
          }
        }
      }

    };
    xhr.send();
  }
};

module.exports = tmdb;
