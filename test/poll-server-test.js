'use strict';

const should    = require('should');
const io        = require('socket.io-client');

const socketUrl = 'http://localhost:9876/';
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Poll Server', () => {

  it('should broadcast user connected to all users', (done) => {
    let client1 = io.connect(socketUrl, options);

    client1.on('connect', (data) => {
      client1.emit('usersConnected', io.engine.clientsCount);

      let client2 = io.connect(socketUrl, options);

      client2.on('connect', (data) => {
        client2.emit('usersConnected', io.engine.clientsCount);
        data.should.equal(2);
      });
    })
    done();
  })
})
