import React from 'react';
// React Chart
import { Bar } from 'react-chartjs-2';
// PropTypes
import PropTypes from 'prop-types';

/*

    This component renders a chart based on the data received.

*/
const BarChart = ({ labels, data, setNames, setColors }) => {
    const datasets = data.map((singleData, i) => {
        let label, color;

        // Set the data label based on the nametype received. If received a string to name the entire chart, each set will be named
        // after the chart. Otherwise, if an array of names is received, each set will be named after the corresponding name in the array
        if (typeof setNames === 'string') label = `${setNames} ${i + 1}`;
        else label = setNames[i];

        // Set the data colors based on the colors received. If received a single color via props, all the sets will have the same color.
        // If received an array of colors, each set will receive its corresponding color. If no color is received, throw an error.
        if (setColors.length > 0) {
            if (typeof setColors[0] === 'number') {
                color = setColors;
            } else color = setColors[i];
        } else console.error('Empty colors array on bar chart');

        // Arrange the set's info in the array.
        return {
            label,
            backgroundColor: `rgba(${color[0]},${color[1]},${color[2]},0.8)`,
            borderColor: `rgba(${color[0]},${color[1]},${color[2]},1)`,
            borderWidth: 1,
            hoverBackgroundColor: `rgba(${color[0]},${color[1]},${color[2]},0.9)`,
            hoverBorderColor: `rgba(${color[0]},${color[1]},${color[2]},1)`,
            data: singleData,
        };
    });

    const displayData = {
        labels,
        datasets,
    };

    return (
        <div>
            <Bar data={displayData} />
        </div>
    );
};

BarChart.propTypes = {
    labels: PropTypes.array.isRequired,
    data: PropTypes.arrayOf(PropTypes.array).isRequired,
    setNames: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
    ]),
    setColors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.array),
        PropTypes.array,
    ]),
};

BarChart.defaultProps = {
    labels: [],
    data: [[]],
    setNames: 'Data',
    setColors: [255, 255, 132],
};

export default BarChart;
