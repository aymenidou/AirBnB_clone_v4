const $ = window.$;
$(document).ready(function () {
  let amenityList = [];
  $('input[type="checkbox"]').change(function () {
    const amenityID = $(this).data('amenity-id');
    if ($(this).prop('checked')) {
      amenityList.push(amenityID);
    } else {
      amenityList = amenityList.filter(function (id) {
        return id !== amenityID;
      });
    }
    $('div.Amenities h4').text('Amenities: ' + amenityList.join(', '));
  });
});
