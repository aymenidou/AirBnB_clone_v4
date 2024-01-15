const $ = window.$;
$(document).ready(function () {
  const amenityList = [];
  // let amenityList = {};
  $('input[type="checkbox"]').change(function () {
    // get amenity id from attribute
    const amenityID = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      // if checkbox checked add to list
      amenityList[amenityID] = amenityName;
      // amenityList.push(amenityName);
    } else {
      // else remove amenity id from the list
      delete amenityList[$(this).attr('data-id')];
      // amenityList = amenityList.filter(function (name) {
      //   return name !== amenityName;
      // });
    }
    // console.log(amenityList)
    const names = Object.values(amenityList);
    $('div.amenities h4').text(names.join(', '));
    // $('div.amenities h4').text(amenityList.keysjoin(', '));
  });

  const API = 'http://localhost:5001/api/v1/status/';
  $.get(API, (data, status) => {
    console.log(data);
    console.log(status);
    if (status === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      console.log('Data:', data);
      const placesSection = $('.places');
      $.each(data, function (index, place) {
        const article = $('<article></article>');
        article.append('<div class="title_box">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">$' + place.price_by_night + '</div>' +
          '</div>' +
          '<div class="information">' +

          '<div class="max_guest">' +
          place.max_guest +
          ' Guest' +
          (place.max_guest !== 1 ? 's' : '') +
          '</div>' +
          '<div class="number_rooms">' +
          place.number_rooms +
          ' Bedroom' +
          (place.number_rooms !== 1 ? 's' : '') +
          '</div>' +
          '<div class="number_bathrooms">' +
          place.number_bathrooms +
          ' Bathroom' +
          (place.number_bathrooms !== 1 ? 's' : '') +
          '</div>' +
          '</div>' +
          '<div class="description">' + place.description + '</div>'
        );
        placesSection.append(article);
      });
    }
  });
});
