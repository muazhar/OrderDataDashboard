import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// DatePicker
import DatePicker from 'react-datepicker';

// React Icons
import { FaSearch } from 'react-icons/fa';

// Other components
import CustomPagination from '../../components/CustomPagination';
import ItemContainer from '../../components/ItemContainer';
import ItemModal from '../../components/ItemModal';
import OrderInfo from '../../components/OrderInfo';
import SearchBar from '../../components/SearchBar';
import TopNavbar from '../../components/TopNavbar';
import Table from '../../components/CustomTable';

import './styles.css';

// Dictionaries
import { orderStatus, orderPaymentType } from '../../utils/Dictionary';

// Default Orders page
const Orders = () => {
    // Modal items
    const [activeOrder, setActiveOrder] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    // Table
    const [header, setHeader] = useState(['Carregando Dados...']);
    const [tableData, setTableData] = useState([]);
    const [checkedApi, setCheckedApi] = useState(false);
    // Pagination
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // Filtering
    const [searchName, setSearchName] = useState('');
    const [searchProduct, setSearchProduct] = useState('');
    const [searchOrderStatus, setSearchOrderStatus] = useState('');
    const [searchPaymentType, setSearchPaymentType] = useState('');
    const [searchDateBegin, setSearchDateBegin] = useState(null);
    const [searchDateEnd, setSearchDateEnd] = useState(null);

    const loadOrders = useCallback(async (page = 1, filters) => {
        const params = {
            page,
            ...filters,
        };

        try {
            const response = await api.get('orders', {
                params,
            });

            setPageCount(parseInt(response.headers['x-total-count']));

            setHeader(
                response.data.length > 0
                    ? [
                          'Cliente',
                          'Endereço de Entrega',
                          'Data do Pedido',
                          'Total (R$)',
                          'Frete (R$)',
                          'Status',
                          'Tipo de pagamento',
                      ]
                    : ['Sem dados para mostrar'],
            );
            setTableData(
                response.data.map(element => {
                    return {
                        element: {
                            customer: element.name,
                            ship_address: element.ship.address1,
                            ordered_on: element.ordered_on,
                            total: element.total,
                            shipping: element.shipping,
                            status: element.status,
                            payment_type: element.payment_type,
                        },
                        id: element.id,
                    };
                }),
            );
            setCheckedApi(true);
        } catch (error) {
            console.error(error, error.response?.data.message);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const openOrderDetails = item => {
        setModalShow(true);
        setActiveOrder(item);
    };

    const search = async event => {
        event.preventDefault();
        const filters = getFilters();

        setHeader(['Pesquisando...']);
        setTableData([]);
        setCurrentPage(1);

        await loadOrders(1, filters);
    };

    const getFilters = () => {
        const filters = {};

        if (searchName && searchName !== '')
            filters.names = searchName
                .split(' ')
                .map(word => word.toLowerCase());
        if (searchProduct && searchProduct !== '')
            filters.product = searchProduct
                .split(' ')
                .map(word => word.toLowerCase());
        if (searchOrderStatus !== '') filters.orderStatus = searchOrderStatus;
        if (searchPaymentType !== '') filters.paymentType = searchPaymentType;
        if (searchDateBegin) filters.dateBegin = searchDateBegin;
        if (searchDateEnd) filters.dateEnd = searchDateEnd;

        return filters;
    };

    const resetSearchItems = () => {
        setSearchName('');
        setSearchProduct('');
        setSearchOrderStatus('');
        setSearchPaymentType('');
        setSearchDateBegin(null);
        setSearchDateEnd(null);
    };

    return (
        <div>
            <TopNavbar activeItem="orders" />
            <Container className="d-flex justify-content-center">
                <ItemModal
                    title="Detalhes do Pedido"
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setActiveOrder(null);
                    }}
                    item={activeOrder}
                >
                    <ItemContainer
                        apiURL="/order"
                        notFoundMsg="Pedido não encontrado."
                    >
                        <OrderInfo />
                    </ItemContainer>
                </ItemModal>
                <Col className="main-panel">
                    {/*****************************************************************
                     *
                     *  Search Section
                     *
                     ****************************************************************/}
                    <SearchBar
                        title="Pedidos"
                        resetForm={resetSearchItems}
                        BasicSearch={() => (
                            <Form
                                inline
                                className="normal-filter-form"
                                onSubmit={search}
                            >
                                <Form.Group
                                    controlId="name-filter"
                                    className="d-flex flex-row"
                                >
                                    <InputGroup>
                                        <Form.Label className="sr-only">
                                            Pesquisar:{' '}
                                        </Form.Label>
                                        <Form.Control
                                            name="searchName"
                                            size="sm"
                                            type="text"
                                            placeholder="Pesquisar por cliente"
                                            value={searchName}
                                            onChange={e =>
                                                setSearchName(e.target.value)
                                            }
                                        />
                                    </InputGroup>
                                    <Button type="submit" variant="primary">
                                        <FaSearch />
                                    </Button>
                                </Form.Group>
                            </Form>
                        )}
                        AdvancedSearch={() => (
                            <Form onSubmit={search}>
                                <fieldset>
                                    <legend>Pesquisa Avançada</legend>
                                    <Form.Row className="justify-content-md-center">
                                        <Col md>
                                            <Form.Group
                                                className="ph-3"
                                                controlId="customer-name"
                                            >
                                                <Form.Label className="d-none d-md-block">
                                                    Nome do Cliente:
                                                </Form.Label>
                                                <Form.Control
                                                    name="searchName"
                                                    type="text"
                                                    placeholder="Nome do cliente"
                                                    value={searchName}
                                                    onChange={e =>
                                                        setSearchName(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="ph-3"
                                                controlId="product-name"
                                            >
                                                <Form.Label className="d-none d-md-block">
                                                    Nome do Produto:
                                                </Form.Label>
                                                <Form.Control
                                                    name="searchProduct"
                                                    type="text"
                                                    placeholder="Nome do produto"
                                                    value={searchProduct}
                                                    onChange={e =>
                                                        setSearchProduct(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md>
                                            <Form.Group
                                                className="ph-3"
                                                controlId="payment-status"
                                            >
                                                <Form.Label>
                                                    Status do Pedido:
                                                </Form.Label>
                                                <Form.Control
                                                    name="searchOrderStatus"
                                                    value={searchOrderStatus}
                                                    onChange={e =>
                                                        setSearchOrderStatus(
                                                            e.target.value,
                                                        )
                                                    }
                                                    as="select"
                                                >
                                                    <option value="">
                                                        Selecione...
                                                    </option>
                                                    {Object.keys(
                                                        orderStatus,
                                                    ).map(status => {
                                                        return (
                                                            <option
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {
                                                                    orderStatus[
                                                                        status
                                                                    ]
                                                                }
                                                            </option>
                                                        );
                                                    })}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group
                                                className="ph-3"
                                                controlId="payment-type"
                                            >
                                                <Form.Label>
                                                    Tipo de Pagamento:
                                                </Form.Label>
                                                <Form.Control
                                                    name="searchPaymentType"
                                                    value={searchPaymentType}
                                                    onChange={e =>
                                                        setSearchPaymentType(
                                                            e.target.value,
                                                        )
                                                    }
                                                    as="select"
                                                >
                                                    <option value="">
                                                        Selecione...
                                                    </option>
                                                    {Object.keys(
                                                        orderPaymentType,
                                                    ).map(type => {
                                                        return (
                                                            <option
                                                                key={type}
                                                                value={type}
                                                            >
                                                                {
                                                                    orderPaymentType[
                                                                        type
                                                                    ]
                                                                }
                                                            </option>
                                                        );
                                                    })}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className="order-date-container">
                                                <Form.Label>
                                                    Data do Pedido:
                                                </Form.Label>
                                                <div>
                                                    <DatePicker
                                                        className="mb-1"
                                                        selected={
                                                            searchDateBegin
                                                        }
                                                        onChange={
                                                            setSearchDateBegin
                                                        }
                                                        selectsStart
                                                        dateFormat="dd/MM/yyyy"
                                                        isClearable
                                                        maxDate={new Date()}
                                                        placeholderText="Data inicial"
                                                        startDate={
                                                            searchDateBegin
                                                        }
                                                        endDate={searchDateEnd}
                                                        customInput={
                                                            <Form.Control />
                                                        }
                                                    />
                                                    <DatePicker
                                                        className="mb-1"
                                                        selected={searchDateEnd}
                                                        onChange={
                                                            setSearchDateEnd
                                                        }
                                                        selectsEnd
                                                        dateFormat="dd/MM/yyyy"
                                                        isClearable
                                                        maxDate={new Date()}
                                                        placeholderText="Data final"
                                                        endDate={searchDateEnd}
                                                        minDate={
                                                            searchDateBegin
                                                        }
                                                        customInput={
                                                            <Form.Control />
                                                        }
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="justify-content-center justify-content-md-end">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="m-1"
                                            style={{ minWidth: 80 }}
                                        >
                                            <span className="d-none d-md-inline">
                                                Pesquisar{' '}
                                            </span>
                                            <FaSearch />
                                        </Button>
                                    </Form.Row>
                                </fieldset>
                            </Form>
                        )}
                    />

                    {/*****************************************************************
                     *
                     *  Table Section
                     *
                     ****************************************************************/}

                    <Table
                        onSelect={openOrderDetails}
                        header={header}
                        data={tableData}
                        checked={checkedApi}
                        theadVariant="dark"
                        size="sm"
                        striped
                        hover
                        responsive
                    />

                    {/*****************************************************************
                     *
                     *  Pagination Section
                     *
                     ****************************************************************/}

                    <CustomPagination
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onChangePage={nextPage => {
                            const filters = getFilters();
                            setCurrentPage(nextPage);
                            setHeader(['Carregando dados...']);
                            setTableData([]);
                            setCheckedApi(false);
                            loadOrders(nextPage, filters);
                        }}
                    />
                </Col>
            </Container>
        </div>
    );
};

export default Orders;
