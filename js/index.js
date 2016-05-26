// specify the path to the leaflet images folder
//L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';


//Base Maps
osm = new L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png');

streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmVydHJhbmRtZCIsImEiOiJUVlBoQy0wIn0.B1aoyioXCv1_3hzB6EBkkg', 			{
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
});
grayscale = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmVydHJhbmRtZCIsImEiOiJUVlBoQy0wIn0.B1aoyioXCv1_3hzB6EBkkg', 			{
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.light'
});


//Map
map = L.map('map', {
  //center: [43.58238046828168,3.900146484375],
  //zoom: 5
  layers : [grayscale],
  editable: true
});
var center = [43.667871610117494,3.2684326171875]
map.setView(center, 8);
//map.addLayer(markers);
baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets,
    "OSM": osm
};
baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets,
    "OSM": osm
};

var adherents = L.geoJson.ajax("https://raw.githubusercontent.com/bertrandmd/map-template/master/data/adherents_lr.geojson",{
///data/adherents_lr.geojson",{
  //onEachFeature:onEachFeature,
  //style:myStyle


    pointToLayer: function (feature, latlng) {
      //console.log(feature.properties.type);
      var icone = feature.properties.type == 'carrier'?'cog':
        feature.properties.type == 'Etat'?'flag':
        feature.properties.type == 'Collectivité'?'institution':
        feature.properties.type == 'Industriel'?'industry':
        feature.properties.type == 'Association'?'group':
        feature.properties.type == 'Particulier'?'male':'cog';

      var option = {
        //draggable : true,
        icon: L.AwesomeMarkers.icon({
          icon: icone,
          markerColor: 'blue',
          prefix: 'fa',
          //extraClasses: 'fa-fw',//'fa-rotate-90',
          //spin : true,
          iconColor: 'white',
          popupAnchor: [2, -42]
          })
        };
        //var table = createPopupEditable(feature)
          //layer.bindPopup(table);
      //points.push(feature.properties["fa-icon"]);
      return  new L.marker(latlng,option)
      .bindPopup(feature.properties['nom'])
      //.bindPopup(feature.properties.name,{});
      //.bindPopup(popupMaj(feature.properties));
      }
      //,
    //onEachFeature: onEachFeature
    //}


}
).on('data:loaded',function() {
    //markers.addLayer(adherents);
    this.addTo(map);
}
);

var overlayMaps = {
          //"communes" : communes,
          //"comcom" : comcom,
          //'WFSline' : WFSline,
          //"Région" : region
          //"points" : points
};

//utilisation normale du controle layer
var lc=	L.control.layers(baseMaps, overlayMaps,{
  //collapsed:false
  });
lc.addTo(map);
