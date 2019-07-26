import React from "react";
import logo from "./logo.svg";
import "./App.css";

export default class App extends React.Component {
  state = {
    userId: null
  };

  componentDidMount() {
    this.loadFbLoginApi();
  }

  loadFbLoginApi = () => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "417098572236299",
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v3.3"
      });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  loginFB = () => {
    window.FB.login(function(response) {
      if (response.authResponse) {
        window.FB.api("/me", function(response) {
          window.FB.api(`/${response.id}/groups`, function(groupRes) {
            if (groupRes && !groupRes.error) {
              /* handle the result */
              console.log("groupRes", groupRes);
            }
          });
        });
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.loginFB}>login FB</button>
        </header>
      </div>
    );
  }
}
