'use strict';

const socket = io();

let $closePoll      = $('#close-poll');
let $error          = $('#error');
let $jumbo          = $('#choices');
let $options        = $('#options');
let $addOption      = $('#add-option');
let $buttons        = $('#choices :button');
let $usersConnected = $('#users-connected');
let $votes          = $('#votes');
let pollId          = window.location.pathname.split('/')[2];
let iVoted          = false;

// Event Listeners
$addOption.click((event) => {
  $options.append(
    `<input type="text" name="poll[responses][]" class="form-control"><br>`
  );
})

$closePoll.click(() => {
  $closePoll.removeClass('btn-danger').addClass('btn-secondary').val('Closed');
  socket.send('endPoll', {id: pollId });
});

for (let i = 0; i < $buttons.length; i++) {
  $buttons[i].addEventListener('click', function () {
    if (iVoted) {
      $error.removeClass('hidden').text('You have already Voted');
      return;
    }
    socket.send('voteCast', { choice: this.value, id: pollId });
    iVoted = true;
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
    $votes.append(`<h4>${key}: ${votes[key]}</h4>`);
  })
});

socket.on('disablePoll', () => {
  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].className += ' disabled';
  }
  $jumbo.prepend(`<div class="alert alert-danger" role="alert">
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  <span class="sr-only">Error:</span>
                  Poll has been closed.
                  </div>`);
});

