const PORT = process.env.PORT || 5000

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const email = require('./mail');

app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');

app.post('/email', email.sendEmail);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
