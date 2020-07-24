import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';

import './styles.css';

/*
    This component is responsible for paginating the data pages. It renders the pagination buttons and layout.
*/
const CustomPagination = ({ currentPage, pageCount, onChangePage }) => {
    const paginate = () => {
        // Define the maximum amount of page blocks depending on the screen size, to prevent overlapping.
        const maxPages = window.screen.width < 510 ? 6 : 10;
        const components = [];

        // If it's the start page, don't show the previous button. Otherwise, show it
        if (currentPage !== 1)
            components.push(
                <Pagination.Prev
                    key="prev-page"
                    onClick={() =>
                        onChangePage(currentPage > 1 ? currentPage - 1 : 1)
                    }
                />,
            );

        // If there are more than 10 pages to show, eventually there will be a need to offset the number of pages based on the current page.
        // In here the component checks where the current page stands in the total page count, and renders the page buttons for those pages
        // around the current page.
        if (pageCount > maxPages) {
            let start;
            let end;
            if (currentPage <= 4) {
                start = 1;
                end = maxPages;
            } else if (currentPage >= pageCount - 4) {
                start = pageCount - maxPages;
                end = pageCount;
            } else {
                start = currentPage - 1;
                end = currentPage + 5;
            }
            if (start !== 1)
                components.push(<Pagination.Ellipsis key="ellipsis-back" />);

            for (let i = start; i <= end; i++) {
                components.push(
                    <Pagination.Item
                        key={`page-${i}`}
                        active={i === currentPage}
                        onClick={() => onChangePage(i)}
                    >
                        {i}
                    </Pagination.Item>,
                );
            }
            if (end !== pageCount)
                components.push(<Pagination.Ellipsis key="ellipsis-front" />);
        } else {
            for (let i = 1; i <= pageCount; i++) {
                components.push(
                    <Pagination.Item
                        key={`page-${i}`}
                        active={i === currentPage}
                        onClick={() => onChangePage(i)}
                    >
                        {i}
                    </Pagination.Item>,
                );
            }
        }

        // If it's the last page, don't show the next button. Otherwise, show it
        if (currentPage !== pageCount)
            components.push(
                <Pagination.Next
                    key="next-page"
                    onClick={() =>
                        onChangePage(
                            currentPage < pageCount
                                ? currentPage + 1
                                : pageCount,
                        )
                    }
                />,
            );

        return components;
    };

    return (
        <Row className="justify-content-center">
            <Pagination>
                <Pagination.First onClick={() => onChangePage(1)} />
                {paginate()}
                <Pagination.Last onClick={() => onChangePage(pageCount)} />
            </Pagination>
        </Row>
    );
};

CustomPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onChangePage: PropTypes.func,
};

CustomPagination.defaultProps = {
    currentPage: 1,
    pageCount: 1,
    onChangePage: () => {},
};

export default CustomPagination;
