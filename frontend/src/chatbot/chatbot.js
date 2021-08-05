import React, { useState } from 'react'
import ChatBot from 'react-simple-chatbot'
import Botpic from './Full-HD-Mobile-Minimal-Wallpaper-HD11-1080X1920.jpg'
import BotCallingpic from './kisspng-chatbot-clip-art-computer-icons-internet-bot-openc-clipart-bot-5c72479d22fb55.3012787315509933091433.jpg'
import { ThemeProvider } from 'styled-components'
import '../App.css'
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#0f4d4a',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#0f4d4a',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

// all available config props
const config = {
  width: '300px',
  height: '400px',
  hideUserAvatar: false,
  placeholder: 'Type your response.',
  headerTitle: 'Stooler',
  floating: true,
  botAvatar: Botpic,
  speechSynthesis: false,
  recognitionEnable: false
}

const Chatbot = (props) => {
  let [showChat, setShowChat] = useState(false)

  const startChat = () => {
    setShowChat(true)
  }
  const hideChat = () => {
    setShowChat(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: showChat ? 'none' : '' }}>
        <ChatBot
          speechSynthesis={{ enable: true, lang: 'en-US' }}
          recognitionEnable={true}
          steps={[
            {
              id: 'welcome',
              message: 'Hello! I am Stooler,looking forward to assist you',
              trigger: 'q-firstname',
            },
            /* Paste */
            {
              id: 'q-firstname',
              message: 'What name do you go by?',
              trigger: 'firstname',
            },
            {
              id: 'firstname',
              user: true,
              validator: (value) => {
                if (/^[A-Za-z]+$/.test(value)) {
                  return true
                } else {
                  return 'Please enter you name X Æ A-12'
                }
              },
              trigger: 'stooler',
            },
            {
              id: 'stooler',
              message:
                'Hi,{previousValue} I am RMC Bot! What can I do for you?',
              trigger: 'qtype',
            },
            {
              id: 'qtype',
              options: [
                { value: 1, label: 'What is Stool?', trigger: '1' },
                { value: 2, label: 'Why to join Stool?', trigger: '2' },
                { value: 3, label: 'How to join a group?', trigger: '3' },
                { value: 4, label: 'How to see your expenses?', trigger: '4' },
              ],
            },
            {
              id: '3',
              message:
                'Profession tax is the tax levied and collected by the state governments in India.',
              trigger: 'qtype',
            },
            {
              id: '4',
              message:
                'A property tax or millage rate is an ad valorem tax on the value of a property.',
              trigger: 'qtype',
            },
            {
              id: '1',
              message:
                'An election is a way people can choose their candidate or their preferences in a representative democracy or other form of government',
              trigger: 'qtype',
            },
            {
                id: '2',
                message:
                  'An election is a way people can choose their candidate or their preferences in a representative democracy or other form of government',
                trigger: 'qtype',
            },
            {
              id: 'q-submit',
              message: 'Do you have any other questions !?',
              trigger: 'submit',
            },
            {
              id: 'submit',
              options: [
                { value: 'y', label: 'Yes', trigger: 'no-submit' },
              ],
            },
            {
              id: 'no-submit',
              options: [
                { value: 1, label: 'What is Stool?', trigger: '1' },
                { value: 2, label: 'Why to join Stool?', trigger: '2' },
                { value: 3, label: 'How to join a group?', trigger: '3' },
                { value: 4, label: 'How to see your expenses?', trigger: '4' },
              ],
            },
          ]}
          {...config}
        />
      </div>
      <div>
        {!showChat ? (
          <button className="btn" onClick={() => startChat()}>
            <i className="fa fa-minus"></i>
          </button>
        ) : (
          <button className="btn" onClick={() => hideChat()}>
            <i className="fa fa-plus"></i>
          </button>
        )}
      </div>
    </ThemeProvider>
  )
}

export default Chatbot;
