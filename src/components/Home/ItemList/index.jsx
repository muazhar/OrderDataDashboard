import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// React Icons
import { FaExternalLinkAlt } from 'react-icons/fa';

// Loaders
import SkeletonLoader from 'tiny-skeleton-loader-react';

import './styles.css';

/*
    This component renders a box with an item's information. It shows:
        - its id, with a link to its page if available;
        - Its name
        - Its value, colored as in its color attribute
    If the checked prop is false, instead the component renders an skeleton loader meaning the component is loading
*/
const ItemList = ({ items, emptyMessage, checked }) => {
    if (!checked)
        return (
            <>
                <Col className="d-flex align-items-center flex-column">
                    {[0, 1, 2].map(element => (
                        <Row
                            key={element}
                            className="item-list-row align-items-center"
                        >
                            <Col xs="3">
                                <SkeletonLoader />
                            </Col>
                            <Col xs="5">
                                <SkeletonLoader />
                            </Col>
                            <Col xs="4">
                                <SkeletonLoader />
                            </Col>
                        </Row>
                    ))}
                </Col>
            </>
        );
    else
        return (
            <>
                <Col className="d-flex align-items-center flex-column">
                    {items.length > 0 ? (
                        items.map(item => (
                            <Row
                                key={item._id}
                                className="item-list-row item-list-has-content align-items-center"
                            >
                                <Col xs="3">
                                    {item.url ? (
                                        <>
                                            <Link
                                                className="navigation-link"
                                                to={`/${item.url}/${item._id}`}
                                                target="_blank"
                                            >
                                                Visualizar
                                            </Link>{' '}
                                            <FaExternalLinkAlt
                                                color="gray"
                                                title="Link externo"
                                            />
                                        </>
                                    ) : (
                                        <span />
                                    )}
                                </Col>
                                <Col xs="6">{item.name}</Col>
                                <Col xs="3">
                                    {item.color ? (
                                        <span
                                            style={{
                                                backgroundColor: item.color,
                                                color: 'white',
                                                borderRadius: '5px',
                                                padding: '2px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {item.value}
                                        </span>
                                    ) : (
                                        <span>{item.value}</span>
                                    )}
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <span className="item-list-empty-message">
                            {emptyMessage}
                        </span>
                    )}
                </Col>
            </>
        );
};

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    emptyMessage: PropTypes.string,
    checked: PropTypes.bool,
};

ItemList.defaultProps = {
    items: [],
    emptyMessage: 'No items yet',
    checked: true,
};

export default ItemList;
