'use strict';

const myNum     = process.env.MY_NUMBER;
const twilioNum = process.env.TWILIO_NUMBER;
const client    = require('twilio')(process.env.TWILIO_ACCOUNT_SID,
                                    process.env.TWILIO_AUTH_TOKEN);

class Twilio {
  constructor (userNumber) {
    this.client     = client;
    this.userNumber = userNumber;
    this.twilioNum  = twilioNum;
  }

  sendMessage(poll) {
    this.client.sendMessage({
      // to: `+${this.userNumber}`,
      to: `+${myNum}`,
      from: `+${this.twilioNum}`,
      body: `Poll results for ${poll.title}: ${poll.result()}`
    }, function (error, respData) {
      if (!error) {
        console.log(`Sent from: ${respData.from}.
                     Message: ${respData.body}`);
      }
    });
  }

}

module.exports = Twilio;
