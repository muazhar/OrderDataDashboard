import React, { useEffect, useState } from 'react';

// Services
import api from '../../services/api';

// Custom components
import Loading from '../Loading';
import NotFound from '../NotFound';

// ProTypes
import PropTypes from 'prop-types';

// Styles
import './styles.css';

/*
    This component is a wrapper to the itemInfo components (customerinfo, productinfo and orderinfo)
    It's main goal is to provide a standard instruction to fetch the single item's data in the API, and then pass it to its children
*/
const ItemContainer = ({ id, apiURL, notFoundMsg, children, openModal }) => {
    const [item, setItem] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [checkedAPI, setCheckedAPI] = useState(false);

    useEffect(() => {
        // Fetch the item's info from the API
        (async () => {
            try {
                const response = await api.get(apiURL, {
                    params: {
                        id,
                    },
                });

                // If there's a corresponding item, sets it. Else, sets the Not Found boolean
                if (response.data) setItem(response.data);
                else setNotFound(true);
            } catch (error) {
                console.error(error, error.response?.data.message);
            }
            setCheckedAPI(true);
        })();
    }, [id, apiURL]);

    // Returns a loading component while connecting with the API. Once it's done, return a not found message, in case the item wasn't found,
    // or the iteminfo's component in a success
    if (!checkedAPI) return <Loading />;
    else if (notFound) return <NotFound message={notFoundMsg} />;
    else return <>{React.cloneElement(children, { item, openModal })}</>;
};

ItemContainer.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    apiURL: PropTypes.string,
    notFoundMsg: PropTypes.string,
    children: PropTypes.node,
    openModal: PropTypes.func,
};

ItemContainer.defaultProps = {
    notFoundMsg: 'Item not found!',
    children: <></>,
    openModal: () => {},
};

export default ItemContainer;
