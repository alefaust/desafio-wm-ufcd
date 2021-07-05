import React from 'react';
import { Switch, Route } from 'react-router-dom';
import State from '../pages/State';
import Cities from '../pages/Cities';

const routes : React.FC = () => (
    <Switch>
        <Route path="/" exact component={State}/>
        <Route path="/cities" component={Cities}/>
    </Switch>
);

export default routes;
