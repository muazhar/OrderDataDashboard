import React, { useState } from 'react';

// Components
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

// Contexts
import { useAuth } from '../../contexts/Authentication';

// Services
import api from '../../services/api';

// Utils
import timeoutError from '../../utils/timeoutError';

import './styles.css';

/*
    This page is the initial page, displayed to any user who hasn't logged in.
    The page consists in a simple form where the user types his username and password, and a button to confirm the login.
*/

const loginErrors = [
    '',
    'Houve um erro no sistema. Por favor, tente mais tarde.',
    'Usuário não encontrado!',
    'Senha incorreta!',
];

const Login = () => {
    // Contexts
    const { signIn } = useAuth();
    // Form states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);

    // Alerting states
    const [loginAlert, setLoginAlert] = useState(null);
    const [loginAlertMsg, setLoginAlertMsg] = useState('');

    const showAlert = message => {
        setLoginAlertMsg(message);
        setLoginAlert(true);
        setTimeout(() => {
            setLoginAlert(null);
            setLoginAlertMsg('');
        }, 5000);
    };

    const handleLogin = async event => {
        event.preventDefault();

        setDisabledButton(true);
        setLoginAlert(false);

        // Try to Log In
        try {
            const { data } = await Promise.race([
                api.post('/login', {
                    username: username.toLowerCase(),
                    password,
                }),
                timeoutError(),
            ]);

            // Properly logs and alerts the error when it happens
            if (!data) {
                showAlert('Houve um problema... Tente novamente mais tarde.');

                setDisabledButton(false);
            } else if (data.error) {
                let loginAlertMsg;

                if (data.error === -1) {
                    console.error(data.message.errmsg);
                    loginAlertMsg =
                        'Houve um problema... Tente novamente mais tarde.';
                } else {
                    const errorMsg = loginErrors[data.error];
                    if (errorMsg) loginAlertMsg = errorMsg;
                    else
                        loginAlertMsg =
                            'Houve um problema... Tente novamente mais tarde.';
                }
                showAlert(loginAlertMsg);

                setDisabledButton(false);
            }

            signIn(data);
        } catch (error) {
            const response = error.response?.data;
            // API returns an error code with a corresponding error message. Let's check if the error is generated from the api or not
            if (response?.error) {
                console.error(response.message);
                showAlert(
                    loginErrors[response.error] ||
                        'Houve um problema... Tente novamente mais tarde.',
                );
            } else {
                console.error(response);
                showAlert(
                    'Ocorreu um erro de conexão. Tente novamente mais tarde',
                );
            }
            setDisabledButton(false);
        }
    };

    return (
        <Container fluid className="login-panel">
            <Col sm="6" md="5">
                <Form onSubmit={handleLogin}>
                    <Form.Row>
                        <h2>Dashboard</h2>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Form.Control
                                placeholder="Digite seu login"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Form.Control
                                placeholder="Digite sua senha"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button type="submit" disabled={disabledButton}>
                            Entrar
                        </Button>
                    </Form.Row>
                    <Container className="d-flex align-items-center justify-content-center">
                        {loginAlert && (
                            <Alert className="fixed-alert" variant="danger">
                                {loginAlertMsg}
                            </Alert>
                        )}
                    </Container>
                </Form>
            </Col>
        </Container>
    );
};

export default Login;
