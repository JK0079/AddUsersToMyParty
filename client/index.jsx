import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.js';
require('./styles/main.scss');

// load stylesheet
require("./default.scss");



ReactDOM.render(<App />, document.getElementById('app'));
