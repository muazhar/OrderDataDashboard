import React, { lazy } from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';

// Pages
const Home = lazy(() => import('../pages/Home'));
const Orders = lazy(() => import('../pages/Orders'));
const SingleOrder = lazy(() => import('../pages/SingleOrder'));
const Config = lazy(() => import('../pages/Config'));

// Components
const NotFound = lazy(() => import('../components/NotFound'));

/*
    The object controls the application routes once the user is logged in
*/
const DashboardRoutes = () => (
    <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/orders/:id" component={SingleOrder} />
        <Route exact path="/config" component={Config} />
        <Route exact path="/">
            <Redirect to="/home" />
        </Route>
        <Route
            exact
            path="*"
            component={() => (
                <NotFound
                    message={
                        <>
                            404: Página não encontrada. <br />
                            Está perdido? Vá para a nossa{' '}
                            <Link to="/home">Página Principal</Link>.
                        </>
                    }
                />
            )}
        />
    </Switch>
);

export default DashboardRoutes;
