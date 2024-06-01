$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    const amenityList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text('Amenities: ' + amenityList);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      for (let place of data) {
        $('.places').append(
          `<article>
             <div class="title">
               <h2>${place.name}</h2>
               <div class="price_by_night">
                 $${place.price_by_night}
               </div>
             </div>
             <div class="information">
               <div class="max_guest">
                 <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                 <br />
                 ${place.max_guest} Guests
               </div>
               <div class="number_rooms">
                 <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                 <br />
                 ${place.number_rooms} Bedrooms
               </div>
               <div class="number_bathrooms">
                 <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                 <br />
                 ${place.number_bathrooms} Bathroom
               </div>
             </div>
             <div class="description">
               ${place.description}
             </div>
           </article>`
        );
      }
    }
  });
});
