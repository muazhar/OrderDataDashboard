import React, { useEffect, useState } from 'react';
import TopNavbar from '../../components/TopNavbar';

// Contexts
import { useAuth } from '../../contexts/Authentication';

// Other components
import BarChart from '../../components/Home/BarChart';
import ItemList from '../../components/Home/ItemList';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Services
import api from '../../services/api';

// Utils
import { months } from '../../utils/Dictionary';
import { formatFloat } from '../../utils/generalMethods';

import './styles.css';

/*
  This is the home page of the application.
*/
const Home = () => {
    const { user } = useAuth();
    // Chart
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    // Lists
    const [lastOrders, setLastOrders] = useState([]);
    const [checkedOrders, setCheckedOrders] = useState(false);

    useEffect(() => {
        (async () => {
            // Get chart information
            try {
                const chartResponse = await api.get('/monthlyProfit');

                const { newData, newLabels } = orderMonths(chartResponse.data);
                setData(newData);
                setLabels(newLabels);
            } catch (error) {
                setData([]);
                setLabels([]);
                console.error(error, error.response?.data.message);
            }

            // Get last orders
            try {
                const ordersResponse = await api.get('/lastOrders');

                const lastOrders = ordersResponse.data.map(order => {
                    return {
                        _id: order._id,
                        name: `${order.customer.firstname} ${order.customer.lastname}`,
                        value: `R$ ${formatFloat(order.total)}`,
                        url: 'orders',
                    };
                });
                setLastOrders(lastOrders);
                setCheckedOrders(true);
            } catch (error) {
                setLastOrders([]);
                setCheckedOrders(true);
                console.error(error, error.response?.data.message);
            }
        })();
    }, [user]);

    // This method receives the values and labels from the backend, then reorders them based on the actual month.
    const orderMonths = ({ data, labels }) => {
        const currentMonth = new Date().getMonth();

        if (currentMonth === 11)
            return { data, labels: labels.map(label => months[label]) };

        const newData = data.map(values => [
            ...values.splice(currentMonth + 1),
            ...values,
        ]);
        const newLabels = [...labels.splice(currentMonth + 1), ...labels].map(
            label => months[label],
        );

        return { newData, newLabels };
    };

    return (
        <>
            <TopNavbar activeItem="home" />
            <Container>
                <Row>
                    <Col md={8}>
                        <div className="element-block">
                            <BarChart
                                labels={labels}
                                data={data}
                                setNames={['Faturamento', 'Lucro']}
                                setColors={[
                                    [153, 230, 0],
                                    [170, 119, 0],
                                ]}
                            />
                            <Row
                                noGutters
                                className="justify-content-center section-title"
                            >
                                Faturamento
                            </Row>
                        </div>
                    </Col>
                    <Col
                        md
                        className="element-block d-flex flex-column justify-content-between"
                    >
                        <Row>
                            <ItemList
                                items={lastOrders}
                                checked={checkedOrders}
                                emptyMessage="Não há pedidos ainda"
                            />
                        </Row>
                        <Row
                            noGutters
                            className="justify-content-center section-title"
                        >
                            Últimos Pedidos
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
