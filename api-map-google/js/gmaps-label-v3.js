// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options) {
     // Initialization
     this.setValues(opt_options);

     this.image_ ="images/user.jpg";

     //Create Image
     var img = document.createElement("img");
     img.src = this.image_;
     //styles 
     img.style.cssText = "width:32px; height:32px; border-radius: 20px; position:absolute; top:-16px; left:-16px;"


     // Here go the label styles
     var span = this.span_ = document.createElement('span');
     span.style.cssText = 'position: relative; left: -50%; top: -35px; ' +
                          'white-space: nowrap;color:#ffffff;' +
                          'padding: 2px;font-family: Arial; font-weight: bold;' +
                          'font-size: 12px; background-color:red;border-radius: 20px;';
 
     var div = this.div_ = document.createElement('div');
     div.appendChild(span);
     div.appendChild(img);
     div.style.cssText = 'position: absolute; display: none';
};
 
Label.prototype = new google.maps.OverlayView;
 
Label.prototype.onAdd = function() {
     var pane = this.getPanes().overlayImage;
     pane.appendChild(this.div_);
 
     // Ensures the label is redrawn if the text or position is changed.
     var me = this;
     this.listeners_ = [
          google.maps.event.addListener(this, 'position_changed',
               function() {
                me.draw();
           }),
          google.maps.event.addListener(this, 'text_changed',
               function() { 
                    me.draw();
                     }),
          google.maps.event.addListener(this, 'zindex_changed',
               function() { 
                    me.draw(); 
               }),
          google.maps.event.addListener(this, 'mouseover', 
               function(){ 
                    alert("asdfsadfasd"); 
               }),
          google.maps.event.addListener(this, 'click', 
               function(){ 
                    alert("label"); 
               })
     ];
};
 
// Implement onRemove
Label.prototype.onRemove = function() {
     this.div_.parentNode.removeChild(this.div_);
 
     // Label is removed from the map, stop updating its position/text.
     for (var i = 0, I = this.listeners_.length; i < I; ++i) {
          google.maps.event.removeListener(this.listeners_[i]);
     }
};
 
// Implement draw
Label.prototype.draw = function() {
     var projection = this.getProjection();
     var position = projection.fromLatLngToDivPixel(this.get('position'));
     var div = this.div_;
     div.style.left = position.x + 'px';
     div.style.top = position.y + 'px';
     div.style.display = 'block';
     div.style.zIndex = this.get('zIndex'); //ALLOW LABEL TO OVERLAY MARKER
     this.span_.innerHTML = this.get('text').toString();
};




    /**
     * A distance widget that will display a circle that can be resized and will
     * provide the radius in km.
     *
     * @param {google.maps.Map} map The map on which to attach the distance widget.
     *
     * @constructor
     */
    function DistanceWidget(map) {
      this.set('map', map);
      this.set('position', map.getCenter());

      var marker = new google.maps.Marker({
        draggable: true,
        title: 'Move me!'
      });

      // Bind the marker map property to the DistanceWidget map property
      marker.bindTo('map', this);

      // Bind the marker position property to the DistanceWidget position
      // property
      marker.bindTo('position', this);


      // Create a new radius widget
      var radiusWidget = new RadiusWidget();

      // Bind the radiusWidget map to the DistanceWidget map
      radiusWidget.bindTo('map', this);

      // Bind the radiusWidget center to the DistanceWidget position
      radiusWidget.bindTo('center', this, 'position');
    }
    DistanceWidget.prototype = new google.maps.MVCObject();



/**
 * A radius widget that add a circle to a map and centers on a marker.
 *
 * @constructor
 */
function RadiusWidget() {
  var circle = new google.maps.Circle({
    strokeWeight: 2
  });

  // Set the distance property value, default to 50km.
  this.set('distance', 50);

  // Bind the RadiusWidget bounds property to the circle bounds property.
  this.bindTo('bounds', circle);

  // Bind the circle center to the RadiusWidget center property
  circle.bindTo('center', this);

  // Bind the circle map to the RadiusWidget map
  circle.bindTo('map', this);

  // Bind the circle radius property to the RadiusWidget radius property
  circle.bindTo('radius', this);
}
RadiusWidget.prototype = new google.maps.MVCObject();


/**
 * Update the radius when the distance has changed.
 */
RadiusWidget.prototype.distance_changed = function() {
  this.set('radius', this.get('distance') * 1000);
};