// Get center
var map_center = new google.maps.LatLng(0.1700235000, 20.7319823000);
 
// Load google map
var map = new google.maps.Map(document.getElementById("gmap"), {
    zoom:1,
    center:map_center,
    mapTypeId:google.maps.MapTypeId.HYBRID,
    panControl:false,
    streetViewControl:false,
    mapTypeControl:false
});
 
var pos;
var marker;
var marker_list = [];
for (var i = 0; i < 100; i++) {
    pos = new google.maps.LatLng(Math.floor(Math.random() * 50), Math.floor(Math.random() * 100));
    marker = new google.maps.Marker({
        position:pos,
        map:map,
        title:'Title',
        icon:'/other/gmap/marker.gif'
    });
    var storyClick = new Function("event", "alert('Click on marker " + i + " ');");
    google.maps.event.addListener(marker, 'click', storyClick);
 
    marker_list.push(marker);
}
 
    // Add marker clustering
    var markerCluster = new MarkerClusterer(map, marker_list, {
        gridSize:40,
        minimumClusterSize: 4,
        calculator: function(markers, numStyles) {
	    // Custom style can be returned here
            return {
                text: markers.length,
                index: numStyles
            };
        }
    });
 