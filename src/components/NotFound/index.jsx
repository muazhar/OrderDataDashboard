import React from 'react';
import PropTypes from 'prop-types';

// React Icons
import { FaFrown } from 'react-icons/fa';

// Styles
import './styles.css';

// This is the default Not Found component, showing a sad face and a custom message
const NotFound = ({ message }) => {
    return (
        <div id="not-found-container">
            <div>
                <FaFrown size="lg" />
                <h1>{message}</h1>
            </div>
        </div>
    );
};

NotFound.propTypes = {
    message: PropTypes.string,
};

export default NotFound;
