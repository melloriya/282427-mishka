function initMap() {
  var centerLatLng = new google.maps.LatLng (59.93871, 30.32304);
  var mapOptions = {
    center: centerLatLng,
    zoom: 17
  };

  var map = new google.maps.Map (document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker ({
    position: centerLatLng,
    map: map,
    icon: "img/icon-map-pin.svg"
  });
}

google.maps.event.addDomListener(window, "load", initMap);
