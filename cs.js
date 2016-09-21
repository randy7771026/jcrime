var acc = document.getElementsByClassName("accordion");
var i;
var coords = [29.801902, -95.365821];
var ocoords = [29.801902, -95.365821];
var ncoords = [29.801902, -95.365821];
var scoords = [29.801902, -95.365821];
var events = [];
var mintime = 0;
var maxtime = 0;


var mymap = L.map('mapid').setView(coords, 17);




var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

}).addTo(mymap);


/*
L.CRS.EPSG3857.unproject = function (point){ // Point -> LatLng
  var earthRadius = 6378137;
      projectionPoint = L.point(point).divideBy(earthRadius);

  return this.projection.unproject(projectionPoint);
};
*/

var events = datab; //   JSON.parse(data)

mintime = events[0].attributes.Time_Begun;
maxtime = events[0].attributes.Time_Begun;

 for(i = 0; i < events.length; i++){
 	if ( events[i].attributes.Time_Begun < mintime ){
      mintime = events[i].attributes.Time_Begun; 	
 	};
 	
 	if ( events[i].attributes.Time_Begun > maxtime ){
      maxtime = events[i].attributes.Time_Begun; 	
 	};
 	var time = moment(events[i].attributes.Time_Begun).format("MMM Do YY h:mm:ss a");
    console.log("unix", events[i].attributes.Time_Begun, "time", time);
 	if ( events[i].attributes.Premise_Type !== "Residence or House" ||
 	     events[i].attributes.Premise_Type !== "Driveway" ||
        events[i].attributes.Premise_Type !== "Road, Street, or Sidewalk" 	
 	 ) {
 	if ( events[i].attributes.SNB_No == 51 ||
 	     events[i].attributes.SNB_No == 45 ||
 	     events[i].attributes.SNB_No == 13 ||
 	     events[i].attributes.SNB_No == 15 ||
 	     events[i].attributes.SNB_No == 48 ||
 	     events[i].attributes.SNB_No == 51 ||
 	     events[i].attributes.SNB_No == 12 ||
 	     events[i].attributes.SNB_No == 46 
 	 )
    	 
 	{
   // console.log("events[", i,"] ", events[i],"x", events[i].geometry.x); 
     ocoords[0] = events[i].geometry.x;
     ocoords[1] = events[i].geometry.y;
   //  console.log("ocoords",ocoords);
     
     var point = new L.Point(events[i].geometry.x, events[i].geometry.y);
   //  console.log("point",point);
     
   //  var earthRadius = 6378137;
     var latlng = L.Projection.SphericalMercator.unproject(
               point);  //.divideBy(earthRadius));
     console.log("latlng",latlng); //returns latlon
     new L.Marker([latlng.lat, latlng.lng],{bounceOnAdd: true}).addTo(mymap);
     
    }
    } 
    
    };

    console.log("mintime", mintime, "maxtime", maxtime);
    var ntime = moment(mintime).format("MMM Do YY h:mm:ss a");
    var xtime = moment(maxtime).format("MMM Do YY h:mm:ss a");
    console.log("ntime", ntime, "xtime", xtime);
    

/*	var events = JSON.parse(raw); 
	alert(events[0].Offense);
	alert(events[1].Offense);


for (i = 0; i < acc.length; i++){
    acc[i].onclick = function(){
    	  
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}
test = new Date()
month = test.getMonth()
month = (month * 1) + 1
day = test.getDate()
year = test.getFullYear()
document.write(" ",month,"/",day,"/",year," ")
*/
