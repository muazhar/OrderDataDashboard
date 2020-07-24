import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';

// This context constrols the Authentication flow, storing the user's data (including its token), and handling login and logout.
const AuthorizationContext = createContext();

const Authorization = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('tokenInfo');
        if (!storedUser) setLogged(false);
        else {
            const parsedUser = JSON.parse(storedUser);
            api.defaults.headers.Authorization = 'Bearer ' + parsedUser.token;
            setUser(parsedUser);
            setLogged(true);
        }
        setLoading(false);
    }, []);

    const signIn = user => {
        localStorage.setItem('tokenInfo', JSON.stringify(user));
        api.defaults.headers.Authorization = 'Bearer ' + user.token;
        setUser(user);
        setLogged(true);
    };

    const signOut = () => {
        localStorage.clear();
        setUser(null);
        setLogged(false);
    };

    const updateUser = user => {
        localStorage.setItem('tokenInfo', JSON.stringify(user));
        setUser(user);
    };

    return (
        <AuthorizationContext.Provider
            value={{ user, logged, loading, signIn, signOut, updateUser }}
        >
            {children}
        </AuthorizationContext.Provider>
    );
};

Authorization.propTypes = {
    children: PropTypes.node,
};

export const useAuth = () => {
    const auth = useContext(AuthorizationContext);

    return auth;
};

export default Authorization;
