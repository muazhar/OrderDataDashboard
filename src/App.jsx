import React from 'react';
import Routes from './routes/index.routes';

// Contexts
import Authentication from './contexts/Authentication';

// Date Picker locale
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

// Locale initialization. Sets React Datepicker dates to pt_BR.
registerLocale('pt-BR', ptBR);
setDefaultLocale('pt-BR');

const App = () => {
    return (
        <Authentication>
            <Routes />
        </Authentication>
    );
};

export default App;
