const express = require('express');
const session = require('express-session');

const app = express();

const config = require('config');

const path = require('path');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const IN_PROD = process.env.NODE_ENV === 'production';

SESSION_LIFETIME = 1000 * 60 * 60 * 8; //8 Hours

app.use(
  session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true,
      secure: false,
      filterParameter: JSON.stringify({}),
      sortParameter: JSON.stringify({'date':-1}),
      set_status: 0,
      ascFlag: 0,
      descFlag: 0
    }
  })
);

// connect to db
mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error(`Something went wrong ${err}`));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authCandidate = require('./routes/auth');
app.use('/api/candidate', authCandidate);

const updateCandidate = require('./routes/update');
app.use('/api/candidate', updateCandidate);

const autocompleteCandidate = require('./routes/autocomplete');
app.use('/api/candidate', autocompleteCandidate);

app.get('/', (req, res) => {
  res.render('admin.ejs', { adError: '', adSuccess: '' });
});

// Start server to listen to the port
app.listen(config.get('server.port'), () => {
  console.log(
    `[Server running on ${config.get('server.host')}:${config.get(
      'server.port'
    )}]`
  );
});
