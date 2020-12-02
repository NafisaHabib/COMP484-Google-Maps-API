const resetButton = document.querySelector("#reset");

var map, // I could also use let. It is good to make a var outside init so that we can call it anywhere
         //  as professor mentioned in the class
  google,
  styles,
  check = false, //checking the chosen location 
  question = 0, 
  correctAnswer = 0, 
  wrongAnswer = 0; 


// https://stackoverflow.com/questions/58371893/how-can-i-hide-street-names-in-google-maps-js-api
function initMap() {
  //hides the labels of everything from the map
  styles = {
    default: null,
    hide: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  };

  // This one take off that human sign, zoom buttons and other features from the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.240182, lng: -118.529322 },
    zoom: 16,
    disableDefaultUI: true,
    scrollwheel: false,
    scaleControl: false,
    draggable: false,
    mapTypeControl: false
  });
  // Hiding the labels
  map.setOptions({ styles: styles["hide"] });

  // Soraya is the The given location from Professor
  var soraya = [
    { lat: 34.236304, lng: -118.528757 },
    { lat: 34.235787, lng: -118.528765 },
    { lat: 34.235861, lng: -118.527588 },
    { lat: 34.236293, lng: -118.527556 }
  ];
// https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Polygon.html
  // https://www.w3schools.com/graphics/svg_polygon.asp
  // Polygon adds the points. First I used rectangle, then when I wanted to draw jacaranda and L shape buidiings
  // I realized it will be easier to use polygon instead of the given circle, rectangle etc shapes
  var sorayaShape = new google.maps.Polygon({
    paths: soraya,
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "green",
    fillOpacity: 0.25
  });
  
    var oviatt = [
    { lat: 34.240386, lng: -118.530020},
    { lat: 34.239915, lng: -118.530012},
    { lat: 34.2398995,lng: -118.529760},
    { lat: 34.2397716, lng: -118.52974},
    { lat: 34.2397739, lng: -118.528905},
    { lat: 34.2399101, lng: -118.5289240},
    { lat: 34.2399124, lng: -118.5286243},
    { lat: 34.2403917, lng: -118.5286299}
  ];

  var oviattShape = new google.maps.Polygon({
    paths: oviatt,
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "green",
    fillOpacity: 0.25
  });

  //Sierra Hall
  var sierraHall = [
    { lat: 34.238584, lng: -118.531574 },
    { lat: 34.238593, lng: -118.530048 },
    { lat: 34.238016, lng: -118.530003 },
    { lat: 34.238034, lng: -118.531709 }
  ];

  var sierraHallShape = new google.maps.Polygon({
    paths: sierraHall,
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "green",
    fillOpacity: 0.25
  });
  
  var manzanitaHall = [
    { lat: 34.237802, lng: -118.530613 },
    { lat: 34.236877, lng: -118.530571 },
    { lat: 34.236877, lng: -118.530313 },
    { lat: 34.237578, lng: -118.530310 },
    { lat: 34.237590, lng: -118.529636 },
    { lat: 34.237829, lng: -118.529654 }
  ];

  var manzanitaHallShape = new google.maps.Polygon({
    paths: manzanitaHall,
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "green",
    fillOpacity: 0.25
  });
    var jacarandaHall = [
    { lat: 34.241036, lng: -118.529442 },
    { lat: 34.2410401, lng: -118.527852 },
    { lat: 34.2420867, lng: -118.527852 },
    { lat: 34.2420911, lng: -118.528737 },
    { lat: 34.2419581, lng: -118.528742 },
    { lat: 34.2419182, lng: -118.529086 }, 
    { lat: 34.2416566, lng: -118.529407 },
    { lat: 34.2414038, lng: -118.529456 },
    { lat: 34.2412087, lng: -118.529439 }
  ];

  var jacarandaHallShape = new google.maps.Polygon({
    paths: jacarandaHall,
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "green",
    fillOpacity: 0.25
  });

 // using the double click event listener. 
  google.maps.event.addListener(map, "dblclick", function(e) {
    question++;

    // Soraya 
    if (question == 1) {
      if (
        google.maps.geometry.poly.containsLocation(e.latLng, sorayaShape) ==
        true
      ) {
        check = true; //correct answer
      } else {
        check = false; //wrong answer
      }

      if (check == true) {
        //if correct
        document.getElementById("answer-one").style.color = "green";
        document.getElementById("answer-one").innerHTML = "You got it right!";
        correctAnswer++;
      } else {
        //if wrong
        sorayaShape.setOptions({ fillColor: "red" });
        document.getElementById("answer-one").style.color = "red";
        document.getElementById("answer-one").innerHTML = "You got it wrong!";
        wrongAnswer++;
      }

      sorayaShape.setMap(map);
      document.getElementById("question-two").innerHTML =
        "Oviatt Library?"; //Display next question
    }

    // Oviatt
    else if (question == 2) {
      if (
        google.maps.geometry.poly.containsLocation(
          e.latLng,
          oviattShape
        ) == true
      ) {
        check = true; //correct answer
      } else {
        check = false; //wrong answer
      }

      if (check == true) {
        // if correct
        document.getElementById("answer-two").style.color = "green";
        document.getElementById("answer-two").innerHTML = "You got it right!";
        correctAnswer++;
      } else {
        //if wrong
        oviattShape.setOptions({ fillColor: "red" });
        document.getElementById("answer-two").style.color = "red";
        document.getElementById("answer-two").innerHTML = "You got it wrong!";
        wrongAnswer++;
      }

      oviattShape.setMap(map);
      document.getElementById("question-three").innerHTML =
        "Sierra Hall?"; //Display next question
    }

    // Sierra
    else if (question === 3) {
      if (
        google.maps.geometry.poly.containsLocation(e.latLng, sierraHallShape) ==
        true
      ) {
        check = true; //correct answer
      } else {
        check = false; //wrong answer
      }

      if (check == true) {
        //if correct
        document.getElementById("answer-three").style.color = "green";
        document.getElementById("answer-three").innerHTML = "You got it right!";
        correctAnswer++;
      } else {
        // if wrong
        sierraHallShape.setOptions({ fillColor: "red" });
        document.getElementById("answer-three").style.color = "red";
        document.getElementById("answer-three").innerHTML = "You got it wrong!";
        wrongAnswer++;
      }

      sierraHallShape.setMap(map);
      document.getElementById("question-four").innerHTML =
        "Manzanita Hall?"; //Display next question
    }

    // manzanita
    else if (question == 4) {
      if (
        google.maps.geometry.poly.containsLocation(
          e.latLng,
          manzanitaHallShape
        ) == true
      ) {
        check = true; //correct answer
      } else {
        check = false; //wrong answer
      }

      if (check == true) {
        // if correct
        document.getElementById("answer-four").style.color = "green";
        document.getElementById("answer-four").innerHTML = "You got it right!";
        correctAnswer++;
      } else {
        //if wrong
        manzanitaHallShape.setOptions({ fillColor: "red" });
        document.getElementById("answer-four").style.color = "red";
        document.getElementById("answer-four").innerHTML = "You got it wrong!";
        wrongAnswer++;
      }

      manzanitaHallShape.setMap(map);
      document.getElementById("question-five").innerHTML = "Jacaranda Hall?"; //Display next question
    }

    // Jacaranda
    else if (question == 5) {
      if (
        google.maps.geometry.poly.containsLocation(e.latLng, jacarandaHallShape) ==
        true
      ) {
        check = true; //correct answer
      } else {
        check = false; //wrong answer
      }

      if (check == true) {
        //if correct
        document.getElementById("answer-five").style.color = "green";
        document.getElementById("answer-five").innerHTML = "You got it right!";
        correctAnswer++;
      } else {
        //if wrong
        jacarandaHallShape.setOptions({ fillColor: "red" });
        document.getElementById("answer-five").style.color = "red";
        document.getElementById("answer-five").innerHTML = "You got it wrong!";
        wrongAnswer++;
      }
      jacarandaHallShape.setMap(map);
    } else {
      // do nothing
    }

    //displays the current result
    document.querySelector("#correct-result").innerHTML = correctAnswer;
    document.querySelector("#wrong-result").innerHTML = wrongAnswer;
  });
}

//reset the program
function resetProgram() {
  document.querySelector("#answer-one").innerHTML = "";
  document.querySelector("#answer-two").innerHTML = "";
  document.querySelector("#answer-three").innerHTML = "";
  document.querySelector("#answer-four").innerHTML = "";
  document.querySelector("#answer-five").innerHTML = "";
  
  document.querySelector("#question-two").innerHTML = "";
  document.querySelector("#question-three").innerHTML = "";
  document.querySelector("#question-four").innerHTML = "";
  document.querySelector("#question-five").innerHTML = "";
  
  document.querySelector("#correct-result").innerHTML = "0";
  document.querySelector("#wrong-result").innerHTML = "0";
  question = 0; //set question back to 0
  correctAnswer = 0;
  wrongAnswer = 0;
  initMap(); //Gets rid of the shapes
}

//Reset Button event listener
resetButton.addEventListener("click", resetProgram);
