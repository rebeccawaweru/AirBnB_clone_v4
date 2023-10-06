$(document).ready(init);

function init () {
  const amenityObj = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObj[$(this).attr('data-name')];
    }
    const names = Object.keys(amenityObj);
    $('.amenities h4').text(names.sort().join(', '));
  });
}
fetch('http://0.0.0.0:5001/api/v1/status/')
  .then(response => response.json())
  .then(data => {
    const statusDiv = document.querySelector('#api_status');
     if (data.status === 'OK') {
       statusDiv.classList.add('available');
     } else {
	statusDiv.classList.remove('available');
     }
  })
  .catch(error => console.error('Error:', error));
