var map;

require([
  "esri/map",
  "esri/geometry/Extent",
  "esri/layers/FeatureLayer",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/TextSymbol",
  "esri/renderers/SimpleRenderer",
  "esri/layers/LabelClass",
  "dojo/_base/Color",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
], function (
  Map,
  Extent,
  FeatureLayer,
  SimpleLineSymbol,
  SimpleFillSymbol,
  TextSymbol,
  SimpleRenderer,
  LabelClass,
  Color,
  SimpleMarkerSymbol,
  SimpleLineSymbol
) {
  // load the map centered on the United States
  var bbox = new Extent({
    xmin: -1940058,
    ymin: -814715,
    xmax: 1683105,
    ymax: 1446096,
    spatialReference: { wkid: 102003 },
  });
  map = new Map("map", {
    extent: bbox,
    showLabels: true, //very important that this must be set to true!
  });
  var json = {
    labelExpressionInfo: { value: "{STATE_NAME}" },
  };
  var statesLabel = new TextSymbol().setColor(statesColor);
  statesLabel.font.setSize("14pt");
  statesLabel.font.setFamily("arial");
  //create instance of LabelClass (note: multiple LabelClasses can also be passed in as an array)
  var labelClass = new LabelClass(json);
  labelClass.symbol = statesLabel; // symbol also can be set in LabelClass' json

  // var labelField = "STATE_NAME";

  // create a renderer for the states layer to override default symbology
  var statesColor = new Color("#666");
  // create a feature layer to show country boundaries
  var statesUrl =
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3";
  var countiesUrl =
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2";
  var symbol = new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5]));
  var rend = new SimpleRenderer(symbol);
  var Symbol2 = new SimpleMarkerSymbol(
    new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID,
      new Color([255, 0, 255]),
      2
    ),
    new Color([0, 255, 0, 0.25])
  );
  var rend2 = new SimpleRenderer(Symbol2);
  var states = new FeatureLayer(statesUrl, {
    id: "STATE",
    outFields: ["*"],
  });
  var counties = new FeatureLayer(countiesUrl);
  states.setLabelingInfo([labelClass]);
  states.renderer = rend;
  counties.renderer = rend2;
  map.addLayer(counties);
  map.addLayer(states);
});
