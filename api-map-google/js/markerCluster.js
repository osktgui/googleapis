function initialize(){
    // style 
    var style = [{
        url: 'images/cluster-marker.png',
        height: 35,
        width: 35,
        opt_anchor: [16, 0],
        opt_textColor: '#ff00ff',
        opt_textSize: 10
      }, {
        url: 'images/cluster-marker.png',
        height: 45,
        width: 45,
        opt_anchor: [24, 0],
        opt_textColor: '#ff0000',
        opt_textSize: 11
      }, {
        url: 'images/cluster-marker.png',
        height: 45,
        width: 45,
        opt_anchor: [32, 0],
        opt_textColor: '#ff0000',
        opt_textSize: 12
      }];

    // Get center
    var map_center = new google.maps.LatLng(0.1700235000, 20.7319823000);
     
    // Load google map
    var xmap = new google.maps.Map(document.getElementById("map"), {
        zoom:2,
        center:map_center,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        panControl:false,
        streetViewControl:false,
        mapTypeControl:false
    });

    //create Image Marker
    var image = new google.maps.MarkerImage('images/marker-neutral-cluster.png',
        new google.maps.Size(32, 32),
        new google.maps.Point(0,0),
        new google.maps.Point(0, 32));
     
    var pos;
    var marker;
    var marker_list = [];
    for (var i = 0; i < 100; i++) {
        pos = new google.maps.LatLng(Math.floor(Math.random() * 50), Math.floor(Math.random() * 100));
        marker = new google.maps.Marker({
            position:pos,
            map:xmap,
            title:''+i
        });


        // var label = new Label({
        //     map:xmap
        // });
        
        // label.set('zIndex', 1234);
        // label.bindTo('position', marker, 'position');
        // label.bindTo('clickable', marker);
        // label.set('text', ''+i);

        var storyClick = new Function("event", "alert('Click on marker " + i + " ');");

        google.maps.event.addListener(marker, 'click', storyClick);
        // google.maps.event.addListener(label, 'click', function(){ 
        //     alert('mouserover label');
        // });
        marker_list.push(marker);
    }
     // agregar un info de marker
     // var infowindow = new google.maps.InfoWindow({
     //    content: "contentString"
     // });
        // Add marker clustering
        var markerCluster = new MarkerClusterer(xmap, marker_list, {
            zoom:0,
            gridSize:40,
            minimumClusterSize: 4,
            styles:style,
            calculator: function(markers, numStyles) {
    	    // Custom style can be returned here
                return {
                    text: markers.length,
                    index: numStyles
                };
            }
        });

         google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster){
             // infowindow.content +="<div>content div</div>";
             // infowindow.setPosition(cluster.getCenter());
             // infowindow.open(map);

             // var marker = new google.maps.Marker({
             //    position: cluster.getCenter(),
             //    title:"New Marker"
             // });
             // marker.setMap(xmap);

            marker = new google.maps.Marker({
                position:cluster.getCenter(),
                map:xmap,
                title:''+i
            });

            var label = new Label({
                map:xmap
            });
            
            label.set('zIndex', 1234);
            label.bindTo('position', marker, 'position');
            label.bindTo('clickable', marker);
            label.set('text', ''+i);

         });
 }