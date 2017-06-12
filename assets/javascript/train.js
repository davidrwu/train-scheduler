var config = {
  apiKey: "AIzaSyA0nzJ6bvFUM3UyPEpcbwjv-5jg7tcoJKY",
  authDomain: "first-project-c9c34.firebaseapp.com",
  databaseURL: "https://first-project-c9c34.firebaseio.com",
  projectId: "first-project-c9c34",
  storageBucket: "first-project-c9c34.appspot.com",
  messagingSenderId: "395317039984"
};
firebase.initializeApp(config);


function update() {
    $("#timeNow").html(moment().format('MMMM Do YYYY, h:mm:ss a'));
};
setInterval(update, 1000);

var database = firebase.database();

$("#add-train").on("click",function(event){
  event.preventDefault();

  var train = $("#train-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#firstTrain-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var nextArrival = "";
  var minutesAway = "";

  var newTrain = {
    train:train,
    destination:destination,
    firstTrain:firstTrain,
    frequency:frequency
  }

  database.ref().push(newTrain);

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");    
});

database.ref().on("child_added",function(childSnapshot){
  var trainName = childSnapshot.val().train;
  var destinationName = childSnapshot.val().destination;
  var firstTraintime = childSnapshot.val().firstTrain;
  var frequencyTime = childSnapshot.val().frequency;

  var convertTime = moment(firstTraintime,"HH:mm").format("hh:mm A");
  // console.log(firstTraintime);
  // console.log(convertTime);

  var pastTime = moment(firstTraintime,"hh:mm").subtract(24,"hours");
  console.log(pastTime)
  
  // var currentTime = moment();

  var elapsedTime = moment().diff(moment(pastTime),"minutes");
  console.log(elapsedTime);

  var remainder = elapsedTime % frequencyTime;
  console.log(remainder);

  var minutesAway = frequencyTime - remainder;
  console.log(minutesAway);

  var nextArrival = moment(moment().add(minutesAway,"minutes")).format("hh:mm A");

  //Unable to get minutes away to update correctly in real time

  // function countdown() {
  //   var elapsedTime = moment().diff(moment(pastTime),"minutes");
  //   console.log(elapsedTime);
  //   var remainder = elapsedTime % frequencyTime;
  //   console.log(remainder);
  //   var minutesAway = frequencyTime - remainder;
  //   console.log(minutesAway);
  //   $(".countdown").html(minutesAway);
  // };
  // setInterval(countdown, 10000);


  $("#train-table").append(
    "<tr><td>" + trainName + "</td>"
    +"<td>" + destinationName + "</td>"
    +"<td>" + convertTime + "</td>"
    +"<td>" + frequencyTime + "</td>"
    +"<td>" + nextArrival + "</td>"
    +"<td>" + minutesAway + "</td></tr>"
  )
});



