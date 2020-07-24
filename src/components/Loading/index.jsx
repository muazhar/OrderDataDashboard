import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// React Loading component
import ReactLoading from 'react-loading';

// React Icons
import { FaFrown } from 'react-icons/fa';

import './styles.css';

// This is the component displayed when something is loading.
const Loading = ({ errorMsg }) => {
    const [displayError, setDisplayError] = useState(false);

    // This effect shows an error message if the loading takes to long. It is possible to customezine the message via props.
    // In case the loading is successful, we must clear the timeout on unmounting to avoid memory leaking
    useEffect(() => {
        const timeout = setTimeout(() => setDisplayError(true), 10000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    if (displayError)
        return (
            <div className="d-flex justify-content-center flex-column text-center align-items-center loading-container">
                <FaFrown size={48} className="mb-2" />
                <span>{errorMsg}</span>
            </div>
        );
    return (
        <div className="d-flex justify-content-center align-items-center loading-container">
            <ReactLoading
                type="spin"
                color="var(--primary-dark)"
                height={32}
                width={32}
            />
        </div>
    );
};

Loading.propTypes = {
    errorMsg: PropTypes.elementType,
};

Loading.defaultProps = {
    errorMsg:
        'Parece que houve um problema... espere um momento ou atualize a página.',
};

export default Loading;
