import React, { lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// Pages
const Login = lazy(() => import('../pages/Login'));

/*
    The object controls the application routes when no user is logged in
*/
const StandardRoutes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="*">
            <Redirect to="/" />
        </Route>
    </Switch>
);

export default StandardRoutes;
