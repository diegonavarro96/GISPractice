var map;
function _rowOnCLick(evt){
  debugger;
  alert("click on row")
}

// function _rowOnCLick(evt) {
//   map.graphics.clear();
//   require([
//     "dojo/_base/Color",
//     "esri/symbols/SimpleLineSymbol",
//     "esri/symbols/SimpleFillSymbol",
//     "esri/graphic",
//   ], function (Color, SimpleLineSymbol, SimpleFillSymbol, Graphic) {
//     var sfs = new SimpleFillSymbol(
//       SimpleFillSymbol.STYLE_SOLID,
//       new SimpleLineSymbol(
//         SimpleLineSymbol.STYLE_SOLID,
//         new Color([0, 100, 100]),
//         2
//       ),
//       new Color([0, 100, 100, 0.7])
//     );
//     for (let i = 0; i <= map.getLayer("STATE").graphics.length; i++) {
//       if (map.getLayer("STATE").graphics[i].attributes["OBJECTID"] === evt) {
//         var graphic = new Graphic(
//           map.getLayer("STATE").graphics[i].geometry,
//           sfs,
//           null,
//           null
//         );
//         map.graphics.add(graphic);
//         map.setExtent(graphic._extent, true);
//         break;
//       }
//     }
//   });

//   //map.getLayer("STATE").graphics[0].attributes["OBJECTID"]
// }

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
  "esri/tasks/QueryTask",
  "esri/tasks/query",
  "esri/graphic",
  "dojo/domReady!"
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
  QueryTask,
  Query,
  Graphic
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
  var statesUrl =
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3";
  var symbol = new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5]));
  var rend = new SimpleRenderer(symbol);
  var states = new FeatureLayer(statesUrl, {
    id: "STATE",
    outFields: ["OBJECTID","STATE_NAME","SUB_REGION", "POP2000", "POP2007"],
  });
  let tableConst = "";
  states.renderer = rend;
  map.addLayer(states);
  map.getLayer("STATE").on("update-end", function (evt) {
    tableConst =
      "<tr><th>ObjectID</th><th>State</th><th>Region</th><th>POP2000</th><th>POP2007</th></tr>";
     
    for (let i = 0; i < map.getLayer("STATE").graphics.length; i++) {

      tableConst =
        tableConst +
        "<tr value='" +
        map.getLayer("STATE").graphics[i].attributes["OBJECTID"] +
        "' onclick='_rowOnCLick(" + "this"+
        ")'>";
        //map.getLayer("STATE").graphics[i].attributes["OBJECTID"] + map.getLayer("STATE") +
      for (let j = 0; j < Object.keys(map.getLayer("STATE").graphics[0].attributes).length; j++) {
        var datavalue = map.getLayer("STATE").graphics[i].attributes[Object.keys(map.getLayer("STATE").graphics[0].attributes)[j]];
        var td = "<td>" + datavalue + "</td>";
        tableConst = tableConst + td;
      }
      tableConst = tableConst + "</tr>";
    }
    document.getElementById("attributeTable").innerHTML = tableConst;

    states.on("click", function (evt) {
      var rows = document.getElementsByTagName("tr");
      rows[evt.graphic.attributes.OBJECTID].classList.toggle("highlighted-row");
    });
  });

});
