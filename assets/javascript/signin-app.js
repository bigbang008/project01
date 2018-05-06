
// var current = null;
// document.querySelector('#email').addEventListener('focus', function(e) {
//   if (current) current.pause();
//   current = anime({
//     targets: 'path',
//     strokeDashoffset: {
//       value: 0,
//       duration: 700,
//       easing: 'easeOutQuart'
//     },
//     strokeDasharray: {
//       value: '240 1386',
//       duration: 700,
//       easing: 'easeOutQuart'
//     }
//   });
// });
// document.querySelector('#password').addEventListener('focus', function(e) {
//   if (current) current.pause();
//   current = anime({
//     targets: 'path',
//     strokeDashoffset: {
//       value: -336,
//       duration: 700,
//       easing: 'easeOutQuart'
//     },
//     strokeDasharray: {
//       value: '240 1386',
//       duration: 700,
//       easing: 'easeOutQuart'
//     }
//   });
// });
// document.querySelector('#submit').addEventListener('focus', function(e) {
//   if (current) current.pause();
//   current = anime({
//     targets: 'path',
//     strokeDashoffset: {
//       value: -730,
//       duration: 700,
//       easing: 'easeOutQuart'
//     },
//     strokeDasharray: {
//       value: '530 1386',
//       duration: 700,
//       easing: 'easeOutQuart'
//     }
//   });
// });

var config = {
    apiKey: "AIzaSyDG0DZ5sc2W0SEhIxCKmYnqDON0-Ockgtc",
    authDomain: "testww-f058a.firebaseapp.com",
    databaseURL: "https://testww-f058a.firebaseio.com",
    projectId: "testww-f058a",
    storageBucket: "testww-f058a.appspot.com",
    messagingSenderId: "825428332993"
  };

  firebase.initializeApp(config);

      // FirebaseUI config.
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            var user = authResult.user;
            var credential = authResult.credential;
            var isNewUser = authResult.additionalUserInfo.isNewUser;
            var providerId = authResult.additionalUserInfo.providerId;
            var operationType = authResult.operationType;
            // Do something with the returned AuthResult.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          signInFailure: function(error) {
            return handleUIError(error);
          },
          uiShown: function() {
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
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // Whether the display name should be displayed in the Sign Up page.
            requireDisplayName: true
          },

        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#signin-display', uiConfig);