import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

// Dictionary
import { orderStatus, orderPaymentType } from '../../utils/Dictionary';

// Reference
import {
    formatDate,
    formatFloat,
    formatTime,
} from '../../utils/generalMethods';

/*
    This component displays the order's data. It shows its basic information, including the product's and customer's basic info.
    There's also a button to send a notification for the buying customer, via whatsapp
*/
const OrderInfo = ({ item: order }) => {
    // Verifies the validity of the buying customer
    if (!order.customer.firstname) order.customer.firstname = 'Sem nome';
    if (!order.customer.lastname) order.customer.lastname = '';

    return (
        <Container>
            <Row>
                <Col>
                    <fieldset>
                        <legend>Informações Básicas</legend>
                        <p>
                            <strong>Pedido Nº {order.number}</strong>
                        </p>
                        <p>
                            <strong>Cliente: </strong>

                            <span>{`${order.customer.firstname} ${order.customer.lastname}`}</span>
                        </p>
                        <p>
                            <strong>Total do Pedido:</strong> R$
                            {formatFloat(order.total)}
                        </p>
                        <p>
                            <strong>Status do Pagamento:</strong>{' '}
                            {orderStatus[order.status]}
                        </p>
                        <p>
                            <strong>Tipo de Pagamento:</strong>{' '}
                            {orderPaymentType[order.payment_type] ||
                                order.payment_type}
                        </p>
                        <p>
                            <strong>Data do Pedido:</strong>{' '}
                            {formatDate(order.ordered_on)}
                        </p>
                        <p>
                            <strong>Hora do Pedido:</strong>{' '}
                            {formatTime(order.ordered_on)}
                        </p>
                        <Table size="sm" hover responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th colSpan="4" className="text-center">
                                        Produtos
                                    </th>
                                </tr>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Valor (R$)</th>
                                    <th>Quantidade</th>
                                </tr>
                            </thead>
                            <tbody className="modal-table-body">
                                {order.contents.map(product => (
                                    <tr key={product.name}>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </fieldset>
                </Col>
            </Row>
        </Container>
    );
};

OrderInfo.propTypes = {
    item: PropTypes.object,
    history: PropTypes.object,
};

export default OrderInfo;
