 
 $(document).ready(function(){
// Initialize Firebase
    var config = {
    apiKey: "AIzaSyBI8AZPR15OGyG6GTEU5_U9rQwVksqb3PE",
    authDomain: "noushin-70293.firebaseapp.com",
    databaseURL: "https://noushin-70293.firebaseio.com",
    storageBucket: "noushin-70293.appspot.com",
    messagingSenderId: "107787809394"
  };
  firebase.initializeApp(config);

    var dataRef = firebase.database();


    // Initial Values
    var name = "";
    var destination = "";
    var time = "";
    var frequency = "";

    // Capture Button Click
    $("#add-train").on("click", function(e) {
      e.preventDefault();

      
      name = $("#tname-input").val().trim();
      destination = $("#des-input").val().trim();
      time = $("#time-input").val().trim();
      frequency = $("#Fre-input").val().trim();

      // Code for the push
      dataRef.ref("train").push({

        name: name,
        destination: destination,
        time: time,
       frequency: frequency,
        //when the data is updated
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
       alert("Train successfully added");
       console.log(name)
       console.log(destination)
       console.log(time)
       console.log(frequency)
    return false;
  });
    

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref("train").on("child_added", function(childSnapshot) {
      


      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().frequency);

      //get today date
       var dateToday = moment().format("MM/DD/YY ");
       console.log("dateToday " + dateToday);

       var firstTrainToday = (dateToday)+(childSnapshot.val().time);
       console.log("firstTrainToday "  + firstTrainToday);

       //coverted today in to min
       var convertedDate = moment(new Date(firstTrainToday));
       console.log("converted date " + convertedDate);

       //get the min for the next train
       var sinceFirst = (moment(convertedDate).diff( moment(), "minutes"));
       console.log("sinceFirst :" + sinceFirst);

       //convert into integer
       var sinceFirstParse = parseInt(sinceFirst);
       console.log(sinceFirstParse);

      //convert into integer
      var frequencyParse = parseInt(childSnapshot.val().frequency)
      console.log(frequencyParse);

      if (sinceFirstParse>=0){
      var nextArrival = (childSnapshot.val().time)
      }

      else {
       sinceFirstParse=(sinceFirstParse+frequencyParse)
       console.log(sinceFirstParse)
    
       var nextArrival = moment().add(sinceFirstParse, "minutes").format("HH:mm");
       console.log(nextArrival) 
      }

      // full list of items to the well
      $("#full-train-list").append("<tr><td>"+ childSnapshot.val().name  +
        "</td><td>"+ childSnapshot.val().destination  +
        "</td> <td>"+ childSnapshot.val().frequency +
        "</td><td>"+ childSnapshot.val().time  +
        "</td><td>"+ nextArrival  +
        "</td><td>"+ sinceFirstParse  + "</td></tr>");
       
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

});  

    
