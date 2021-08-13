import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from "react-ga";
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from "./shared/util/serviceWorkerRegistration";
import reportWebVitals from "./shared/util/reportWebVitals";
console.log = console.warn = console.error = () => {};



ReactGA.initialize(process.env.REACT_APP_REACT_GA_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorkerRegistration.register();

function sendToAnalytics({ id, name, value }) {
  ReactGA.event({
    category: "Web Vitals",
    action: name,
    value: Math.round(name === "CLS" ? value * 1000 : value),
    label: id,
    nonInteraction: true,
  });
}

reportWebVitals(sendToAnalytics);
