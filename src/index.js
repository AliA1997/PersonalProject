import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {HashRouter as HR} from 'react-router-dom';
import Store from './Ducks/Store'

ReactDOM.render(
<Provider store={Store}>
    <HR>
        <App />
    </HR>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
