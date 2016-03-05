'use strict';

const socket = io();

let $closePoll      = $('#close-poll');
let $options        = $('#options');
let $addOption      = $('#add-option');
let $buttons        = $('#choices :button');
let $usersConnected = $('#users-connected');
let $votes          = $('#votes');
let pollId          = window.location.pathname.split('/')[2];

// Event Listeners
$addOption.click((event) => {
  $options.append(
    `<input type="text" name="poll[responses][]" class="form-control">
    <br>`
  )
})

$closePoll.click(() => {
  $closePoll.removeClass('btn-danger');
  $closePoll.addClass('btn-secondary');
  $closePoll.val('Closed');
  socket.send('endPoll', {id: pollId });
});

for (let i = 0; i < $buttons.length; i++) {
  $buttons[i].addEventListener('click', function () {
    socket.send('voteCast', { choice: this.value, id: pollId });
  });
};

// Socket.io
$(function() { socket.send('userConnected', { id: pollId }) });

socket.on('usersConnected', (count) => {
  $usersConnected.text(`Connected Users: ${count}`);
});

socket.on('updateVotes', (votes) => {
  $votes.empty();
  Object.keys(votes).forEach((key) => {
    let value = votes[key];
    $votes.append(`<h4>${key}: ${value}   </h4>`);
  })
});

socket.on('disablePoll', () => {
  console.log("Diable the poll son");
  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].className += ' disabled';
  }
});


