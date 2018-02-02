const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync('server.log', log + '\n', (error) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('toUpperCase', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    headTitle: 'Home',
    pageTitle: 'Home page',
    message: 'Hello in my World!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    headTitle: 'About',
    pageTitle: 'About page',
  });
});


app.get('/bad', (req, res) => {
  res.send({
    status: '404',
    errorMessage: 'This is a bad page'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});