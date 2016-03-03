const $options   = $('#options');
const $addOption = $('#add-option');

$addOption.click((event) => {
  $options.append(
    `<input type="text" name="poll[responses][]" class="form-control">
    <br>`
  )
})
