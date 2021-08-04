class MessageParser {
  constructor(actionProvider,state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    this.actionProvider.greet_name(message);
    const lowercase = message.toLowerCase();
    console.log(lowercase)
    
    if (lowercase.includes("hello")) {
      this.actionProvider.greet();
    }

    if (lowercase.includes("javascript") || lowercase.includes("js")) {
      this.actionProvider.handleJavascriptQuiz();
    }
  }
}

export default MessageParser;