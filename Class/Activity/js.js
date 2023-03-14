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
  "esri/tasks/QueryTask",
  "esri/tasks/query"
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
  Query
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
    var symbol = new SimpleFillSymbol().setColor(new Color([255, 0, 0,0.5]));
    var rend = new SimpleRenderer(symbol);
  var states = new FeatureLayer(statesUrl, {
    id: "STATE",
    outFields: ["*"],
  });
  var query=new Query();
  query.where="1=1";
  query.outFields=["STATE_NAME","SUB_REGION", "POP2000", "POP2007"];
  query.returnGeometry=false;
  var queryTask=new QueryTask(statesUrl);
  queryTask.execute(query, function(result){
    let tableConst="";
    for (let i=0; i <result.features.length;i++){
         tableConst=tableConst+"<tr>"
        for(let j=0; j<result.fields.length;j++){
            var datavalue=result.features[i].attributes[result.fields[j].name];
            var td="<td>"+datavalue+"</td>";
            tableConst=tableConst+td;
        }
        tableConst=tableConst+"</tr>"
    }
    debugger;
    document.getElementById("attributeTable").innerHTML=tableConst;
  }, function(er){
    console.log("Error: "+er);
  });

//   states.setLabelingInfo([ labelClass ]);
  states.renderer = rend;
  map.addLayer(states);
});
