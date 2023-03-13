var map;
require([
  "esri/map",
  "esri/layers/FeatureLayer",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/TextSymbol",
  "esri/Color",
  "esri/symbols/Font",
  "esri/renderers/SimpleRenderer",
  "dojo/domReady!",
], function (Map, FeatureLayer, SimpleFillSymbol,TextSymbol,Color,Font,SimpleRenderer) {
  map = new Map(
    "map",
    {
      basemap: "topo-vector", //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
      center: [-100, 40], // longitude, latitude
      zoom: 5,
      showLabels: true 
    }
  );
  var featureLayerOptions = {
    mode: FeatureLayer.MODE_AUTO,
    opacity: 0.5,
  };
  var symbol = new SimpleFillSymbol().setColor(new Color([255, 0, 0]));
  var rend = new SimpleRenderer(symbol); 
  //FeatureLayer.setRenderer(renderer);
  var layer = new FeatureLayer(
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2",
    featureLayerOptions,
     { outFields: ["state_name"] }
);

//create instance of LabelClass
  layer.renderer = rend;
  map.addLayer(layer);
});
