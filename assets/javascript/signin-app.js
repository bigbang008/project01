$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyDG0DZ5sc2W0SEhIxCKmYnqDON0-Ockgtc",
    authDomain: "testww-f058a.firebaseapp.com",
    databaseURL: "https://testww-f058a.firebaseio.com",
    projectId: "testww-f058a",
    storageBucket: "testww-f058a.appspot.com",
    messagingSenderId: "825428332993"
  };

  firebase.initializeApp(config);

  //initial variable
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // FirebaseUI config.
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType;

        console.log(user);
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      signInFailure: function (error) {
        return handleUIError(error);
      },


      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }

    },
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    // Query parameter name for mode.
    queryParameterForWidgetMode: 'mode',
    // Query parameter name for sign in success url.
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Whether the display name should be displayed in the Sign Up page.
        requireDisplayName: true

      },

    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'


  };

  // The start method will wait until the DOM is loaded. 
  ui.start('#signin-display', uiConfig);
  //end sign-in 

  // Get the modal --- register
  var modal = document.getElementById("myModal");

  // When the user clicks the button, open the modal 
  $("#registerButton").on("click", function () {
    modal.style.display = "block";
    $(".cautionMsg").empty();
    $("#emailInput").val("");
    $("#passwordInput").val("");
    $("#confirmPasswordInput").val("");
  });

  // When the user clicks on <span> (x), close the modal
  $(".modal-header").on("click", ".close", function () {
    modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } // end modal

  //on click submit register page
  $(".btn-submit").on("click", function () {

    var email = $("#emailInput").val().trim();
    var password = $("#passwordInput").val().trim();
    var confirmPassword = $("#confirmPasswordInput").val().trim();

    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    if (!email || !password) {
      $(".cautionMsg").empty();
      var cautiontext = $("<p>").text("Email and password required");
      cautiontext.css({ "color": "red", "font-size": "20px" })
      $(".cautionMsg").append(cautiontext);
    }

    if (password !== confirmPassword) {
      $(".cautionMsg").empty();
      var cautiontext = $("<p>").text("The password doesn't match, please re-enter again !");
      cautiontext.css({ "color": "red", "font-size": "20px" })
      $(".cautionMsg").append(cautiontext);
    }

    //register user
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var text = "This Email has been taken.";

        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/email-already-in-use') {
          $(".cautionMsg").empty();
          $(".cautionMsg").append(text).css({ "color": "red", "font-size": "20px" });
        } else {
          $(".cautionMsg").empty();
          $(".cautionMsg").append(errorMessage).css({ "color": "red", "font-size": "20px" });
        }


        console.log(error);
      });

    // document.location.href='create_account.html';

  });

  // link to index html
  $("#profileInfo").on("click", function () {
    document.location.href = 'index.html';
  });

  $("#profileUpdate").on("click", function () {
    document.location.href = 'create_account.html';
  });


  //sign out
  $("#loggingout").on("click", function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      window.location.replace("signin.html");
    }).catch(function (error) {
      // An error happened.
    });
  });


  //Adds an observer for changes to the user's sign-in state.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      if (user != null) {
        var email_id = user.email;
        var success = "You have been successfully registered";
        $(".cautionMsg").append(success).css({ "color": "green", "font-size": "20px" });
        $(".currentEmail").text(email_id);
        $(".noUser").css("display", "none");
        $(".haveUser").css("display", "block");

      }
    }
  });


});