const $ = window.$;
$(document).ready(function () {
  const amenityList = [];
  // let amenityList = {};
  $('input[type="checkbox"].amenity-checkbox').change(function () {
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

  const stateCityList = [];

  $('input[type="checkbox"].state-checkbox').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');

    if ($(this).prop('checked')) {
      if ($(this).parent().is('li')) {
        // Checkbox belongs to state or city
        stateCityList.push({ id, name });
      }
    } else {
      if ($(this).parent().is('li')) {
        // Checkbox belongs to state or city
        const index = stateCityList.findIndex((item) => item.id === id);
        if (index !== -1) stateCityList.splice(index, 1);
      }
    }

    const stateCityNames = stateCityList.map((item) => item.name);
    $('div.locations h4').text(stateCityNames.join(', '));
  });

  const API = 'http://localhost:5001/api/v1/status/';
  $.get(API, (data, status) => {
    // console.log(data);
    // console.log(status);
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
      // console.log('Data:', data);
      const placesSection = $('.places');
      $.each(data, function (index, place) {
        const article = $('<article></article>');
        article.append(
          '<div class="title_box">' +
            '<h2>' +
            place.name +
            '</h2>' +
            '<div class="price_by_night">$' +
            place.price_by_night +
            '</div>' +
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
            '<div class="description">' +
            place.description +
            '</div>'
        );
        placesSection.append(article);
      });
    }
  });

  $('#searchButton').click(function (e) {
    e.preventDefault();

    // Create an object for the POST request
    const requestData = {
      amenities: amenityList.map((item) => item.id),
      states: stateCityList
        .filter((item) => item.id.startsWith('state'))
        .map((item) => item.id),
      cities: stateCityList
        .filter((item) => item.id.startsWith('city'))
        .map((item) => item.id)
    };

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
      success: function (response) {
        // Handle the response
        console.log(response);
      },
      error: function (error) {
        console.error(error);
      }
    });
  });
});
