import React, { useEffect,useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams} from 'react-router-dom';
import { Input } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import './chatroom.css'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));
const ChatRoom = () => {
  // let history = useHistory();
  // const [username, setusername] = useState("");
  const classes = useStyles();

  const username = localStorage.getItem('username');
  // var userId = localStorage.getItem('__react_session__');
  // var username = await JSON.parse(userId)
  const PERSON_IMG = `https://eu.ui-avatars.com/api?name=${username}&&size=80&background=random&rounded=true`;

  //checking jwt tokens
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     history.push("/");
  //   }
  // }, [history]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
        
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   };
  //   fetchUsers();
  // }, []);
  // //logout function
  // const logout = () => {
  //   localStorage.removeItem("userid");
  //   localStorage.removeItem("token");
  //   history.push("/");
  // }

 const sendMessage = () =>{
    const msgInput = document.getElementById("msgInput");
     var msg = msgInput .value;
   if(msg!="")
   {
    appendMessage(username, PERSON_IMG,"left", msg);
    msgInput.value="";
  }
   
 }
 
 document.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    sendMessage();
   }
 });

 const appendMessage = (name, img, side, text) => {  
 const messageBox =  document.getElementById("messageBox");
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  messageBox.insertAdjacentHTML("beforeend", msgHTML);
  messageBox.scrollTop += 500;
}

const formatDate = (date) => {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

  return (
    <div className="Main" >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            &emsp; SLICE Share
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="msger ">
        <div className="main__header">Messages</div>
        <div id="messageBox" className="msger-chat"></div>
     <div><Input placeholder="Type Here ..." inputProps={{ 'aria-label': 'description' }} id="msgInput"  defaultValue="" /> <Button variant="outlined" size="small" color="primary" onClick={sendMessage}> <SendIcon/></Button>
     </div></div>
        </div>
  );
};

export default ChatRoom;



