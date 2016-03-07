'use strict';

const should    = require('should');
const io        = require('socket.io-client');

const socketUrl = 'http://localhost:9876/';
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Poll Server', () => {

  it('should broadcast number of connected to all users', (done) => {
    let client1 = io.connect(socketUrl, options);

    client1.on('connect', (data) => {
      client1.emit('usersConnected', io.engine.clientsCount);

      let client2 = io.connect(socketUrl, options);

      client2.on('connect', (data) => {
        client2.emit('usersConnected', io.engine.clientsCount);
        data.should.equal(2);
        client2.disconnect();
      });

      data.should.equal(1);
      client1.disconnect();
      data.should.equal(0);
    })
    done();
  })

  it('should be able to broadcast messages', (done) => {
    let client1, client2, client3;
    let message  = { choice: 'hey', id: '12345134512asdf' }
    let messages = 0;

    let checkMessage = (client) => {
      client.on('message', (chnl, msg) => {
        message.id.should.equal(msg);
        client.disconnect();
        messages++;
        if (messages === 3) {
          done();
        }
      });
    }

    client1 = io.connect(socketUrl, options);
    checkMessage(client1);

    client1.on('connect', (data) => {
      client2 = io.connect(socketUrl, options);
      checkMessage(client2);

      client2.on('connect', (data) => {
        client3 = io.connect(socketUrl, options);
        checkMessage(client3);

        client3.on('connect', (data) => {
          client2.send('message', message);
        });
      });
    });
    done();
  });

});
