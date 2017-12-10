require('dotenv').config()
const express = require('express');
const session = require('express-session');
const genomeLink = require('genomelink-node');
const tmdb = require('./apiHelpers/tmdbHelpers.js')
const bodyParser = require('body-parser')
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.GENOMELINK_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));
app.use(express.static('public'));

let reports,
    authorizeUrl;
app.get('/', async (req, res) => {
  tmdb.getMoviesByGenre( (result) => {
    console.log(result, 'result')
  });

  const scope = `report:agreeableness report:neuroticism report:extraversion report:conscientiousness report:openness report:depression report:anger report:reward-dependence report:harm-avoidance report:gambling report:novelty-seeking`;
  authorizeUrl = genomeLink.OAuth.authorizeUrl({ scope: scope });
  // Fetching a protected resource using an OAuth2 token if exists.
  reports = [];
  if (req.session.oauthToken) {
    const scopes = scope.split(' ');
    reports = await Promise.all(scopes.map( async (name) => {
      return await genomeLink.Report.fetch({
        name: name.replace(/report:/g, ''),
        population: 'european',
        token: req.session.oauthToken
      });
    }));
  }



  res.render('index', {
    authorize_url: authorizeUrl,
    reports: reports,
  });
});

app.get('/reports', async (req, res) => {
  res.send(reports);
});

app.get('/authorizeUrl', async (req, res) => {
  res.send({authorizeUrl});
});

app.get('/callback', async (req, res) => {
  // The user has been redirected back from the provider to your registered
  // callback URL. With this redirection comes an authorization code included
  // in the request URL. We will use that to obtain an access token.
  req.session.oauthToken = await genomeLink.OAuth.token({ requestUrl: req.url });

  // At this point you can fetch protected resources but lets save
  // the token and show how this is done from a persisted token in index page.
  res.redirect('/');
});

// Run local server on port 3000.
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
