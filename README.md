[![Stories in Ready](https://badge.waffle.io/jasonpilz/crowdsource.png?label=ready&title=Ready)](https://waffle.io/jasonpilz/crowdsource)
# crowdsource (AKA Realtime)

### Turing M4 Project using socket.io and express.js

* Clone repo
* For twilio: Add these vars to your environment: `TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER`
* Start server with `node index.js`, or `nodemon index.js`
* Make sure to `npm install` the dependencies
* Run tests with `npm test`

>#### Checkout the [deployed application](https://turingcrowdsource.herokuapp.com/)

### Usage

* `Title` - Enter a title for your poll in the form of the question you want to ask.
* `Expiry` - Optionally enter an integer representing the amount of minutes you want the
poll to stay active, after which it will close automatically.
* `Messaging` - If you would like a SMS message sent to you indicating the result
of the poll when the poll closes, enter your phone number in the format `13035556666`
* `Real-time results updating` - enter `yes` or `no` depending on preference.
* `Options` - Enter any number of answers you want your voters to select. Minimum
is 2 options, additional options can be added by clicking on (you guessed it) `Add Option`

>#### Click `Submit` to receive the links to your poll!
