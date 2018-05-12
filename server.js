const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static("public"));

// Here we're setting the views directory to be ./views
// thereby letting the app know where to find the templates files
app.set('views', './views');

// Here we're setting the default engine to be ejs
// note we don't need to require it, express will do that for us
app.set('view engine', 'ejs');

// Now instead of using res.send we can use
// res.render to send the output of the template by filename






app.get('/', (req, res) => {
    const data = {
      person: {
        firstName: 'ZUNG',
        lastName: 'DINH',
      }
    }



    app.get('/contact', (req, res) => {
        res.render('contact');
      });
      
      app.post('/thanks', (req, res) => {

        var api_key = 'key-59b73dc724fb932638eb354e910eb94e';
        var domain = 'sandboxf67239fc06f64a3abda903aa97fc945b.mailgun.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
         
        var data = {
          from: 'Zung Dinh <postmaster@sandboxf67239fc06f64a3abda903aa97fc945b.mailgun.org>',
          to: 'zungdinhdesigns@gmail.com',
          subject: req.body.Name,
          text: req.body.message,
        };
         
        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });



        res.render('thanks', { contact: req.body })
      });
      
  
    // Notice now the data is the second argument passed to the template render method
    res.render('index', data);
  });

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});

