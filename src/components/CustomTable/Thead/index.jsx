import React from 'react';
import PropTypes from 'prop-types';

/* This component defines a head element for a table, creating as many columns as the amount of data received */
const Thead = ({ elements, ...props }) => {
    return (
        <thead {...props}>
            <tr>
                {elements.map((el, index) => (
                    <th key={index} scope="col">
                        {el}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

Thead.propTypes = {
    elements: PropTypes.array,
};

export default Thead;
