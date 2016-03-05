'use strict';

const socket = io();

let $closePoll      = $('#close-poll');
let $options        = $('#options');
let $addOption      = $('#add-option');
let $buttons        = $('#choices :button');
let $usersConnected = $('#users-connected');
let pollId          = window.location.pathname.split('/')[2];

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

socket.on('usersConnected', (count) => {
  $usersConnected.text(`Connected Users: ${count}`);
});

socket.on('voteCount', (votes) => {
  console.log(votes)
});

socket.on('disablePoll', () => {
  console.log("Diable the poll son");
})


