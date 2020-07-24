import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './styles.css';

const SearchBar = ({ title, BasicSearch, AdvancedSearch, resetForm }) => {
    // Search
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [inverseAdvancedSearch, setInverseAdvancedSearch] = useState(true);

    const toggleAdvancedSearch = () => {
        if (advancedSearch) {
            setTimeout(() => setAdvancedSearch(!advancedSearch), 1200);
            setInverseAdvancedSearch(!inverseAdvancedSearch);
        } else {
            setTimeout(
                () => setInverseAdvancedSearch(!inverseAdvancedSearch),
                1200,
            );
            setAdvancedSearch(!advancedSearch);
        }
        resetForm();
    };

    return (
        <>
            {/* BASIC SEARCH     */}
            <Row
                className={`d-flex p-1 search-bar ${
                    advancedSearch ? 'hidden' : 'shown'
                }`}
            >
                <Col
                    md="auto"
                    className="d-flex flex-fill justify-content-center justify-content-md-start"
                >
                    <h3 className="table-title mb-0">{title}</h3>
                </Col>
                <Col
                    md="auto"
                    className="d-flex flex-fill justify-content-center justify-content-md-end"
                >
                    <BasicSearch />
                </Col>
            </Row>
            <Row
                noGutters
                className={`search-bar ${advancedSearch ? 'hidden' : 'shown'}`}
            >
                <Col className="d-flex justify-content-end">
                    <Button
                        variant="link"
                        className="secondary-option"
                        onClick={toggleAdvancedSearch}
                    >
                        Pesquisa avançada.
                    </Button>
                </Col>
            </Row>
            {/* ADVANCED SEARCH     */}
            <Row
                noGutters
                className={`search-bar ${
                    inverseAdvancedSearch ? 'hidden' : 'shown'
                }`}
            >
                <Col>
                    <AdvancedSearch />
                    <Col className="d-flex justify-content-end">
                        <Button
                            variant="link"
                            className="secondary-option"
                            onClick={toggleAdvancedSearch}
                        >
                            Pesquisa padrão.
                        </Button>
                    </Col>
                </Col>
            </Row>
        </>
    );
};

SearchBar.propTypes = {
    title: PropTypes.string,
    BasicSearch: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
    AdvancedSearch: PropTypes.oneOfType([
        PropTypes.elementType,
        PropTypes.node,
    ]),
    resetForm: PropTypes.func,
};

SearchBar.defaultProps = {
    title: '',
    BasicSearch: <></>,
    AdvancedSearch: <></>,
    resetForm: () => {},
};

export default SearchBar;
