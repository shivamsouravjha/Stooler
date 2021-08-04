import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import SingleFlight from './components/SingleFlight/SingleFlight'

const botName = "Stooler";

const config = {
  // Defines the chatbot name
  botName: botName,
  // Defines an array of initial messages that will be displayed on first render
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}`),
    createChatBotMessage(
      "First things first, which airport are you looking for information from?",
      {
        widget: "airportSelector",
        delay: 500,
      }
    ),
  ],
  // Defines an object that will be injected into the chatbot state, you can use this state in widgets for example
  state: {
    airports: [],
    flightType: "",
    selectedFlightId: "",
    selectedFlight: null,
  },
  // Defines an object of custom components that will replace the stock chatbot components. 
  customComponents: {
     // Replaces the default header
    header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header</div>,
    // Replaces the default bot avatar
    botAvatar: (props) => <FlightBotAvatar {...props} />,
    // Replaces the default bot chat message container
    botChatMessage: (props) => <CustomChatMessage {...props} />,
    // Replaces the default user icon
    userAvatar: (props) => <MyUserAvatar {...props} />,
    // Replaces the default user chat message
    userChatMessage: (props) => <MyUserChatMessage {...props} />
  },
  // Defines an object of custom styles if you want to override styles
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  // Defines an array of widgets that you want to render with a chatbot message
  widgets: [
    {
      // defines the name you will use to reference to this widget in "createChatBotMessage".
      widgetName: "singleFlight",
      // Function that will be called internally to resolve the widget
      widgetFunc: (props) => <SingleFlight {...props} />,
      // Any props you want the widget to receive on render
      props: {},
      // Any piece of state defined in the state object that you want to pass down to this widget
      mapStateToProps: [
        "selectedFlightId",
        "selectedFlight",
      ],
    },
  ],
};

export default config;