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
  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(response => response.json())
    .then(data => {
      const statusDiv = document.querySelector('#api_status');
      if (data.status === 'OK') {
        statusDiv.classList.add('available');
      } else {
        statusDiv.classList.remove('available');
      }
    });
    .catch(error => console.error('Error:', error));
  fetchPlaces();
}
function fetchPlaces () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:50001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
	$('.places ').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br/><p>' + place.max_guest + ' Guests' + '</p></div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br/><p>' + place.number_rooms + ' Bedrooms' + '</p></div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br/><p>' + place.number_bathrooms +' Bathrooms' + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
      }
    }
  });
}
