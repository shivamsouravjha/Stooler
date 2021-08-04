import { createChatBotMessage } from "react-chatbot-kit";
import React from "react";
import Options from "./options/Options";
const botName= "Stooler";
const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hi I go by the name ${botName}`),
    createChatBotMessage(
      "What do you want us to talk about?",
      {
        widget: "overview",
      }
    ),
  ],

    customStyles: {
      botMessageBox: {
        backgroundColor: "#FFFFFFF",
      },
      chatButton: {
        backgroundColor: "#000000",
      },
    },
    widgets: [
      {
        widgetName: "overview",
        widgetFunc: (props) => <Options {...props} />,
        mapStateToProps: ["gist"],
      },
    ]
}

export default config