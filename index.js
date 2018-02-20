const PORT = process.env.PORT || 5000

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Openpay = require('openpay');

const app = express();
const openpay = new Openpay('mg5nk23vsodhgb4zjf9w','sk_4b45db1074bb4eb48c9f66312cc946ab');

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

app.post('/purchase', (request, response) => {
  let charge = {
    "source_id": request.body.source_id,
    "device_session_id": request.body.device_session_id,
    "customer": {
        "name": "Customer",
        "last_name": "Unknown",
        "phone_number": request.body.customer.phone_number,
        "email": request.body.customer.email
    },
    "currency": request.body.currency,
    "amount": request.body.amount,
    "method": request.body.method,
    "description": request.body.description
  };
    openpay.charges.create(charge, (error, body) => {
      if(error) {
        response.send(error);
      } else {
        response.send(body);
      }
    });
});

app.post('/payout', (request, response) => {
    let payout = {
      "method": "bank_account",
      "bank_account":{
        "clabe":"012298026516924616",
        "holder_name": "John Doe"
      },
      "amount" : 10.50,
      "description" : "Monthly payment"
    };
    openpay.payouts.create(payout, function (error, body){
      // ...
    });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
