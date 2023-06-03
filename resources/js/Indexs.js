import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Layout from './Layout'
import Login from './User/Login';

export default function Indexs() {
  return (
    <div>
        <Router>
            <Switch>
                <Route path='/dashboard' exact component={Layout}/>
                <Route path='/login' exact component={Login}/>
            </Switch>
        </Router>
    </div>
  )
}

if (document.getElementById('app')) {
    ReactDOM.render(<Indexs />, document.getElementById('app'));
}