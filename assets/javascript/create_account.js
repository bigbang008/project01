$(document).ready(function () {
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDG0DZ5sc2W0SEhIxCKmYnqDON0-Ockgtc",
    authDomain: "testww-f058a.firebaseapp.com",
    databaseURL: "https://testww-f058a.firebaseio.com",
    projectId: "testww-f058a",
    storageBucket: "testww-f058a.appspot.com",
    messagingSenderId: "825428332993"
  };
  firebase.initializeApp(config);

    // Get a reference to the database service
    var accountDataBase = firebase.database();
    var storage = firebase.storage();
    var storageRef = storage.ref();

    //on click function to capture the value in the form 
    $(".profileCreator").on("click", "#submitInfo", function(){
        var firstName = $("#firstName-input").val().trim();
        var lastName = $("#lastName-input").val().trim();
        var profession = $("#profession-input").val().trim();
        var birthMonth = $("#monthInput").val().trim();
        var birthDay = $("#dayInput").val().trim();
        var birthYear = $("#yearInput").val().trim();
        var city =  $("#cityInput").val().trim();
        var favFood = $("#favFood").val().trim();
        var dreamDestination =$("#dreamDestination").val().trim();
        var firstAnnoucement = $("#annoucement1").val().trim();
        var secondAnnoucement = $("#annoucement2").val().trim();
        var thirdAnnoucement = $("#annoucement3").val().trim();
        var member1 = $("#member1").val().trim();
        var member2 = $("#member2").val().trim();
        var member3 = $("#member3").val().trim();

        // Creates local "temporary" object for holding data
        
        var newAccount = {
            firstName: firstName,
            lastName: lastName,
            profession: profession,
            birthMonth: birthMonth,
            birthDay: birthDay,
            birthYear: birthYear,
            city: city,
            favFood: favFood,
            dreamDestination: dreamDestination,
            firstAnnoucement: firstAnnoucement,
            secondAnnoucement: secondAnnoucement,
            thirdAnnoucement: thirdAnnoucement,
            member1: member1,
            member2: member2,
            member3: member3
        };

        //upload newAccount to the database
        accountDataBase.ref('users/' + userId).push(newAccount);

        // Logs everything to console
        console.log("Name:" + newAccount.firstName + " " + newAccount.lastName);
        console.log("Job:" + newAccount.profession);
        console.log("DOB:" +newAccount.birthMonth+ "/"+ newAccount.birthDay+ "/" + newAccount.birthYear);
        console.log("city:" + newAccount.city);
        console.log("favFood:" + newAccount.favFood);
        console.log("annoucement:" + newAccount.firstAnnoucement + "/" +newAccount.secondAnnoucement +"/" + newAccount.thirdAnnoucement);
        console.log("Members:" + newAccount.member1 + "/" + newAccount.member2 + "/" + newAccount.member3);
        return false;
    });


    $("#addMember").on("click", function(){
        var newInput = $("<input>");
        // for (var i = 0, i)
        
    })


});