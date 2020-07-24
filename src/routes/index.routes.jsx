import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Contexts
import { useAuth } from '../contexts/Authentication';

// Routes
import DashboardRoutes from './dashboard.routes';
import StandardRoutes from './standard.routes';

// Components
import Loading from '../components/Loading';

/*
    The components controls the web page's routes, sending the correct page based on the URL entered by the user
*/
const Routes = () => {
    const { logged, loading } = useAuth();

    if (loading) return <Loading />;
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                {logged ? <DashboardRoutes /> : <StandardRoutes />}
            </Suspense>
        </BrowserRouter>
    );
};

export default Routes;
