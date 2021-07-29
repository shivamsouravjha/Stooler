import React, { useState, useContext } from 'react';
import ReactSession from '../../Reactsession';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
   
  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    
    setIsLoading(true);

    if (isLoginMode) {
      try {
        const response = await fetch("http://stool-back.herokuapp.com/api/users/account/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value
          })
        });
        const responseData = await response.json();
        console.log(responseData)
        if(responseData['error']) {
          console.log(responseData.error)
          throw new Error(responseData.error);
        }
        setIsLoading(false);
        auth.login();
        ReactSession.set("username", formState.inputs.username.value);
        ReactSession.set("userid",responseData['data']['userid'] );
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
      }
    } else {
      try {
        const response = await fetch('http://stool-back.herokuapp.com/api/users/account/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            username: formState.inputs.username.value,
            number: formState.inputs.number.value,
            panNumber: formState.inputs.panNumber.value,
            aadhar: formState.inputs.aadhar.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });
        const responseData = await response.json();
        console.log(responseData)
        if(responseData['error']) {
          console.log(responseData.error)
          throw new Error(responseData.error);
        }
        setIsLoading(false);
        auth.login();
        ReactSession.set("username", formState.inputs.username.value);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />)
          }
          
          {!isLoginMode && (
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail address"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />)
          }
          {!isLoginMode && (
              <Input
                element="input"
                id="number"
                type="text"
                label="Your Mobile Number"
                validators={[VALIDATOR_MINLENGTH(10)]}
                errorText="Please enter a Mobile number."
                onInput={inputHandler}
              />)
          }  
          {!isLoginMode && (
            <Input
              element="input"
              id="panNumber"
              type="text"
              label="Your pancard Number"
              validators={[VALIDATOR_MINLENGTH(10)]}
              errorText="Please enter Pancard number."
              onInput={inputHandler}
            />)
          }
          {!isLoginMode && (
            <Input
              element="input"
              id="aadhar"
              type="text"
              label="Your aadhar Number"
              validators={[VALIDATOR_MINLENGTH(12)]}
              errorText="Please enter valid aadhar number."
              onInput={inputHandler}
            />)
          }
          <Input
            element="input"
            id="username"
            type="text"
            label="Your User Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter user Name."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
