import React, { useState } from 'react';

// Boostrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Contexts
import { useAuth } from '../../../contexts/Authentication';

// Services
import api from '../../../services/api';

/*
    This components renders the user's data update component. It has a form to fill the new data and connects to the API
    for data altering
*/
const AccountForm = () => {
    const { user, updateUser } = useAuth();
    // Form validation
    const [validated, setValidated] = useState(false);
    // Form fields
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [currentPass, setCurrentPass] = useState({ value: '', error: false });
    const [newPass, setNewPass] = useState({ value: '', error: false });
    const [confirmNewPass, setConfirmNewPass] = useState({
        value: '',
        error: false,
    });

    const handleSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        // Check the equality of new passwords
        if (
            (newPass.value !== '' || confirmNewPass.value !== '') &&
            newPass.value !== confirmNewPass.value
        ) {
            setNewPass({ value: newPass.value, error: true });
            setConfirmNewPass({ value: confirmNewPass.value, error: true });
            setValidated(false);
        } else if (form.checkValidity() === false) {
            setValidated(false);
        } else {
            setCurrentPass({ value: currentPass.value, error: false });
            setNewPass({ value: newPass.value, error: false });
            setConfirmNewPass({ value: confirmNewPass.value, error: false });

            // Builds the update object based on the filled fields in the form
            const userData = {};
            if (username && username !== '') userData.username = username;
            if (name && name !== '') userData.name = name;
            if (newPass.value !== '' && confirmNewPass.value !== '') {
                userData.currentPass = currentPass.value;
                userData.newPass = newPass.value;
            }

            try {
                await api.put('/user', userData);

                setValidated(true);
                updateUser({
                    ...user,
                    username: userData.username || user.username,
                    name: userData.name || user.name,
                    password: userData.newPass || user.password,
                });
            } catch (error) {
                const response = error.data?.response;
                if (response.error) {
                    switch (response.error) {
                        case 0:
                            console.error(
                                'Error updating user',
                                response.message,
                            );
                            break;
                        case 1:
                            setCurrentPass({
                                value: currentPass.value,
                                error: true,
                            });
                            setValidated(false);
                            break;
                        case 2:
                            console.error('Password error', response.message);
                            break;
                        default:
                            console.error(
                                'An unknown error has ocurred. Please, try again later',
                            );
                    }
                }
            }
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h3>Dados Básicos</h3>
            <Form.Group controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="O seu nome"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="username">
                <Form.Label>Nome de Usuário</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Seu nome de usuário"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
            </Form.Group>
            <hr />
            <h3>Alteração de senha</h3>
            <Form.Group controlId="currentPassword">
                <Form.Label>Senha Atual</Form.Label>
                <Form.Control
                    isInvalid={currentPass.error}
                    type="password"
                    placeholder="Senha atual"
                    value={currentPass.value}
                    onChange={event =>
                        setCurrentPass({
                            value: event.target.value,
                            error: currentPass.error,
                        })
                    }
                />
                <Form.Control.Feedback type="invalid">
                    Senha incorreta.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newPassword">
                <Form.Label>Nova Senha</Form.Label>
                <Form.Control
                    isInvalid={newPass.error}
                    type="password"
                    placeholder="Nova senha"
                    value={newPass.value}
                    onChange={event =>
                        setNewPass({
                            value: event.target.value,
                            error: newPass.error,
                        })
                    }
                />
                <Form.Control.Feedback type="invalid">
                    As senhas não coincidem.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="confirmNewPassword">
                <Form.Label>Confirme a Senha</Form.Label>
                <Form.Control
                    isInvalid={confirmNewPass.error}
                    type="password"
                    placeholder="Confirme a senha"
                    value={confirmNewPass.value}
                    onChange={event =>
                        setConfirmNewPass({
                            value: event.target.value,
                            error: confirmNewPass.error,
                        })
                    }
                />
                <Form.Control.Feedback type="invalid">
                    As senhas não coincidem.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Salvar</Button>
        </Form>
    );
};

export default AccountForm;
