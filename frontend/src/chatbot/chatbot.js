import React, { useState } from 'react'
import ChatBot from 'react-simple-chatbot'
import Botpic from './logochat.png'
import { ThemeProvider } from 'styled-components'
import '../App.css'

const theme = {
  background: '#fff',
  fontFamily: 'montserrat',
  headerBgColor: '#5e17eb',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#a6a6a6',
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
  speechSynthesis: true,
  recognitionEnable: true
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
                'Hi,{previousValue} I am Stooler! What can I do for you?',
              trigger: 'qtype',
            },
            {
              id: 'qtype',
              options: [
                { value: 1, label: 'What is Stool?', trigger: '1' },
                { value: 2, label: 'Why to join Stool?', trigger: '2' },
                { value: 3, label: 'How to join a group?', trigger: '3' },
                { value: 4, label: 'How to see your expenses?', trigger: '4' },
                { value: 5, label: 'Have some other doubts?', trigger: 'q-submit' },
              ],
            },
            {
              id: '3',
              message:
                'You can join a group by paying above the minimum amount set by the group leader.',
              trigger: 'qtype',
            },
            {
              id: '4',
              message:
                'From portfolio you can access all your groups.',
              trigger: 'qtype',
            },
            {
              id: '1',
              message:
                'Stool is a platform where you can join a group and invest in Stocks, Gold/Silver, Cryptocurrency, Currency Exchange.',
              trigger: 'qtype',
            },
            {
                id: '2',
                message:
                  'Invest with lowest amount with less stress of managing the resources',
                trigger: 'qtype',
            },
            {
              id: 'q-submit',
              message: 'Mail to    stool@googlegroups.com    to clear your doubts',
              trigger: 'submit',
            },
            {
              id: 'submit',
              options: [
                { value: 'y', label: 'Ok', trigger: 'no-submit' },
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

    </ThemeProvider>
  )
}

export default Chatbot;
