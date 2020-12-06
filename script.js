// https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng
//  https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-html
//  https://developers.google.com/maps/documentation/javascript/controls#DisablingDefaults
// https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-animate

// http://apps.headwallphotonics.com/
const resetButton = document.querySelector("#reset");

//const theTimer = document.querySelector(".timer");

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
  // This one take off that human sign, zoom buttons and other features from the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.240182, lng: -118.529322 },
    //center: { lat: 34.240, lng: -118.53 },
    zoom: 16,
    disableDefaultUI: true,
    scrollwheel: false,
    scaleControl: false,
    draggable: false,
    mapTypeControl: false
  });
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
  // https://developers.google.com/maps/documentation/javascript/examples/polygon-draggable
  // Polygon adds the points. First I used rectangle, then when I wanted to draw jacaranda and L shape buidiings
  // I realized it will be easier to use polygon instead of the given circle, rectangle etc shapes
  var sorayaShape = new google.maps.Polygon({
    paths: soraya,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000", // initially making it red, because I am doing more wrong than right
    // in another function, if answer is right, I am overwriting this red to green
    fillOpacity: 0.35
  });

  var oviatt = [
    { lat: 34.240386, lng: -118.53002 },
    { lat: 34.239915, lng: -118.530012 },
    { lat: 34.2398995, lng: -118.52976 },
    { lat: 34.2397716, lng: -118.52974 },
    { lat: 34.2397739, lng: -118.528905 },
    { lat: 34.2399101, lng: -118.528924 },
    { lat: 34.2399124, lng: -118.5286243 },
    { lat: 34.2403917, lng: -118.5286299 }
  ];

  var oviattShape = new google.maps.Polygon({
    paths: oviatt,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000",
    fillOpacity: 0.35
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
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000",
    fillOpacity: 0.35
  });
  // manzanita hall is in the screenshot. It's shape is L pattern. So I wanted to make a different shape
  var manzanitaHall = [
    { lat: 34.237802, lng: -118.530613 },
    { lat: 34.236877, lng: -118.530571 },
    { lat: 34.236877, lng: -118.530313 },
    { lat: 34.237578, lng: -118.53031 },
    { lat: 34.23759, lng: -118.529636 },
    { lat: 34.237829, lng: -118.529654 }
  ];

  var manzanitaHallShape = new google.maps.Polygon({
    paths: manzanitaHall,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000",
    fillOpacity: 0.35
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
    strokeWeight: 2,
    fillColor: "green",
    strokeColor: "#FF0000",
    fillOpacity: 0.35
  });
  // This function is making the green border. I am calling this function when the answer is correct
  function greenBorder(border) {
    border.setOptions({ strokeColor: "green" });
  }

  // using the double click event listener.
  google.maps.event.addListener(map, "dblclick", function(e) {
    question++;

    // Soraya
    if (question == 1) {
      if (
        // this is checking if the double click is inside the shape or not
        google.maps.geometry.poly.containsLocation(e.latLng, sorayaShape) ==
        true
      ) {
        check = true; // if it is inside, then check becomes true
      } else {
        check = false; // if it is not inside the shape the check is false
      }

      if (check == true) {
        // if check is true,
        greenBorder(sorayaShape); // make the green border line, which was red by default.
        document.getElementById("answer-one").style.color = "green"; // change the color to green
        document.getElementById("answer-one").innerHTML =
          "Your answer is correct!!"; // show the anser is correct
        correctAnswer++; // add 1 to the correct answer point
      } else {
        // if check is false
        sorayaShape.setOptions({ fillColor: "red" }); //fill the shape with red color
        document.getElementById("answer-one").style.color = "red"; // make the riting in red
        document.getElementById("answer-one").innerHTML =
          "Sorry, wrong location."; //show that it is wrong
        wrongAnswer++; // add one to the wrong answer
      }

      sorayaShape.setMap(map); // show the shape
      document.getElementById("question-two").innerHTML =
        "Where is the Oviatt Library?"; // ask the next question
    }

    // Oviatt
    // The logic is same as the previous one. Thus the comments are same
    // So, I am not adding the same comments for the rest questions
    else if (question == 2) {
      if (
        google.maps.geometry.poly.containsLocation(e.latLng, oviattShape) ==
        true
      ) {
        check = true;
      } else {
        check = false;
      }

      if (check == true) {
        greenBorder(oviattShape);
        document.getElementById("answer-two").style.color = "green";
        document.getElementById("answer-two").innerHTML =
          "Your answer is correct!!";
        correctAnswer++;
      } else {
        oviattShape.setOptions({ fillColor: "red" });
        document.getElementById("answer-two").style.color = "red";
        document.getElementById("answer-two").innerHTML =
          "Sorry, wrong location.";
        wrongAnswer++;
      }

      oviattShape.setMap(map);
      document.getElementById("question-three").innerHTML =
        "Where is the Sierra Hall?";
    }

    // Sierra
    else if (question === 3) {
      if (
        google.maps.geometry.poly.containsLocation(e.latLng, sierraHallShape) ==
        true
      ) {
        check = true;
      } else {
        check = false;
      }

      if (check == true) {
        greenBorder(sierraHallShape);
        document.getElementById("answer-three").style.color = "green";
        document.getElementById("answer-three").innerHTML =
          "Your answer is correct!!";
        correctAnswer++;
      } else {
        sierraHallShape.setOptions({ fillColor: "red" });
        document.getElementById("answer-three").style.color = "red";
        document.getElementById("answer-three").innerHTML =
          "Sorry, wrong location.";
        wrongAnswer++;
      }

      sierraHallShape.setMap(map);
      document.getElementById("question-four").innerHTML =
        "Where is the Manzanita Hall?";
    }

    // manzanita
    else if (question == 4) {
      if (
        google.maps.geometry.poly.containsLocation(
          e.latLng,
          manzanitaHallShape
        ) == true
      ) {
        check = true;
      } else {
        check = false;
      }

      if (check == true) {
        greenBorder(manzanitaHallShape);
        document.getElementById("answer-four").style.color = "green";
        document.getElementById("answer-four").innerHTML =
          "Your answer is correct!!";
        correctAnswer++;
      } else {
        manzanitaHallShape.setOptions({ fillColor: "red" });
        document.getElementById("answer-four").style.color = "red";
        document.getElementById("answer-four").innerHTML =
          "Sorry, wrong location.";
        wrongAnswer++;
      }

      manzanitaHallShape.setMap(map);
      document.getElementById("question-five").innerHTML =
        "Where is the Jacaranda Hall?"; //Display next question
    }

    // Jacaranda
    else if (question == 5) {
      if (
        google.maps.geometry.poly.containsLocation(
          e.latLng,
          jacarandaHallShape
        ) == true
      ) {
        check = true;
      } else {
        check = false;
      }

      if (check == true) {
        greenBorder(jacarandaHallShape);
        document.getElementById("answer-five").style.color = "green";
        document.getElementById("answer-five").innerHTML =
          "Your answer is correct!!";
        correctAnswer++;
      } else {
        jacarandaHallShape.setOptions({ fillColor: "red" });
        document.getElementById("answer-five").style.color = "red";
        document.getElementById("answer-five").innerHTML =
          "Sorry, wrong location.";
        wrongAnswer++;
      }
      jacarandaHallShape.setMap(map);
    } else {
    }

    document.querySelector("#correct-result").innerHTML = correctAnswer;
    document.querySelector("#wrong-result").innerHTML = wrongAnswer;
  });
}

//reset the program
function reset() {
  // resetting the answers
  document.querySelector("#answer-one").innerHTML = "";
  document.querySelector("#answer-two").innerHTML = "";
  document.querySelector("#answer-three").innerHTML = "";
  document.querySelector("#answer-four").innerHTML = "";
  document.querySelector("#answer-five").innerHTML = "";
  // restting the questions
  document.querySelector("#question-two").innerHTML = "";
  document.querySelector("#question-three").innerHTML = "";
  document.querySelector("#question-four").innerHTML = "";
  document.querySelector("#question-five").innerHTML = "";
  // resetting the correct the wrong results
  document.querySelector("#correct-result").innerHTML = "0";
  document.querySelector("#wrong-result").innerHTML = "0";
  question = 0; // resetting question #
  correctAnswer = 0; // going back to zero
  wrongAnswer = 0; // going back to zero
  initMap(); // calling the function to get the map without any shapes
}

//Reset Button event listener
resetButton.addEventListener("click", reset);
