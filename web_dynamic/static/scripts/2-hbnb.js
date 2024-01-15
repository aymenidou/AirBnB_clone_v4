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
});
