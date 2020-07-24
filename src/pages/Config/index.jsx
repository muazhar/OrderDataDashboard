import React, { lazy, Suspense } from 'react';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

// Custom Components
import Loading from '../../components/Loading';
import TopNavbar from '../../components/TopNavbar';
const AccountForm = lazy(() =>
    import('../../components/ConfigPage/AccountForm'),
);

const Config = () => (
    <>
        <TopNavbar />
        <Tab.Container id="config-tab" defaultActiveKey="account">
            <Row noGutters>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="account">Conta</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Suspense fallback={<Loading />}>
                            <Tab.Pane
                                eventKey="account"
                                className="d-flex justify-content-center"
                                unmountOnExit
                            >
                                <Col md={7}>
                                    <AccountForm />
                                </Col>
                            </Tab.Pane>
                        </Suspense>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </>
);

export default Config;
