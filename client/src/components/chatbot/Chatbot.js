import React, { Component } from "react";
/**
 * This component uses Kommunicate to handle the front-end of my chatbot, it is connected to my DialogFlow private key externally on the Kommunicate site.
 *
 * Usage:
 * ```html
 * <Chatbot />
 * ```
 */
export class Chatbot extends Component {
  componentDidMount() {
    (function(d, m) {
      var kommunicateSettings = {
        appId: "10b61fc420b2407cae277a9f3fc971d4e",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://pastebin.com/raw/ZT2jRBWK";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    return <div></div>;
  }
}

export default Chatbot;
