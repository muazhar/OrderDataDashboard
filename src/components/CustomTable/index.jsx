import React from 'react';
import PropTypes from 'prop-types';
// Bootstrap
import Table from 'react-bootstrap/Table';
// Loader
import SkeletonLoader from 'tiny-skeleton-loader-react';
// Custom components
import Thead from './Thead';
// Dictionary
import { orderStatus, orderPaymentType } from '../../utils/Dictionary';
// General Methods
import { formatDate, formatFloat } from '../../utils/generalMethods';
// Styles
import './styles.css';

/*
    This component defines a customized Bootstrap Table.
    The table receives the data to be displayed, the function to be used when a row is clicked, and the style of
    the table head as props.
*/

const CustomTable = ({
    header,
    data,
    onSelect,
    theadVariant,
    checked,
    ...props
}) => {
    // Method that replaces certain fields of the data object with their expected format
    const organizeData = data => {
        data.forEach((obj, index) => {
            if (obj.element.birthday)
                obj.element.birthday = formatDate(obj.element.birthday);
            if (obj.element.status)
                obj.element.status = orderStatus[obj.element.status];
            if (obj.element.ordered_on)
                obj.element.ordered_on = formatDate(obj.element.ordered_on);
            if (obj.element.payment_type)
                obj.element.payment_type =
                    orderPaymentType[obj.element.payment_type];
            if (obj.element.shipping)
                obj.element.shipping = formatFloat(obj.element.shipping);
            if (obj.element.total)
                obj.element.total = formatFloat(obj.element.total);
            data[index].element = Object.values(obj.element);
        });

        return data;
    };

    return (
        <Table {...props}>
            <Thead
                elements={header}
                className={theadVariant ? 'thead-' + theadVariant : ''}
            />
            <tbody>
                {
                    // Here we render the data fetched from the API. If no data has been fetched yet, renders an skeleton component
                    checked
                        ? organizeData(data).map(row => (
                              <tr
                                  className="clickable"
                                  key={'row-' + row.id}
                                  onClick={() => onSelect(row.id)}
                              >
                                  {row.element.map((element, index) => (
                                      <td key={'td-' + index}>{element}</td>
                                  ))}
                              </tr>
                          ))
                        : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(element => (
                              <tr key={'row-' + element}>
                                  {header.map((_, index) => (
                                      <td key={'td-' + index}>
                                          <SkeletonLoader />
                                      </td>
                                  ))}
                              </tr>
                          ))
                }
            </tbody>
        </Table>
    );
};

CustomTable.propTypes = {
    header: PropTypes.array,
    data: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    theadVariant: PropTypes.string,
};

CustomTable.defaultProps = {
    header: [],
    data: [],
    onSelect: () => {},
    checked: false,
};

export default CustomTable;
