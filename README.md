# Setor da Embalagem

Este é o cliente da aplicação de controle de um Dashboard. O objetivo da aplicação é acessar a base de dados, mostrando os dados dos pedidos.

## Páginas

A aplicação é dividida nas seguintes páginas:

- **Login:** Esta página é encarregada de autenticar o usuário. Ele deve entrar com seus dados, e a aplicação se conecta a base de dados para verificar a vericidade das credenciais. Caso haja algum problema, a aplicação mostra um erro.
- **Home:** A página inicial é uma página simples com alguns dados sendo mostrados para o usuário: Um gráfico de faturamento dos últimos 12 meses e uma lista dos últimos 10 pedidos.
- **Config:** A pagina de configuração do usuário permite que ele troque seu nome e redefina sua senha.
- **Orders:** Esta página lista os pedidos e permite filtrá-los. Ao clicar nos dados do pedido e mostra suas informações detalhadas.

## Estrutura de Pastas

Os arquivos da aplicação estão na pasta `src`. Nela, temos os arquivos `index.js`, que renderiza o componente principal `App.jsx` na aplicação, este sendo o componente que configura a aplicação como um todo.
As pastas projeto estão organizadas da seguinte forma:

### Assets

Pasta com recursos extras, como imagens usadas na aplicação.

### Pages

Nesta pasta estão os componentes que representam as páginas da aplicação.

### Components

Nesta pasta estão os diversos componentes utilizados na aplicação. Alguns componentes, por serem únicos de uma certa página, estão localizados dentro de uma pasta com o mesmo nome da página.

### Routes

Pasta com os componentes que renderizam as rotas da aplicação, dependendo do estado de autenticação do usuário.

### Contexts

Pasta que guarda as configurações de contexto da aplicação, usados para definir estados de variáveis e funções globalmente, e passá-los para componentes filhos em ordem hierárquica muito distante.

### Services

Nesta pasta está o arquivo de configuração da API.

### Utils

Nesta pasta estão alguns scripts úteis, com funções diferenciadas usadas na aplicação.

## Bibliotecas Utilizadas

- **Bootstrap:** Framework CSS para agilizar a estilização das páginas através de classes com funções pré-definidas.
- **React Bootstrap:** Biblioteca que recria as funcionalidades javascript do Bootstrap em componentes React, com estilos e comportamentos pré-definidos.
- **Axios:** Biblioteca utilizada para realizar as chamadas HTTP à API.
- **Chart.JS:** Biblioteca que renderiza gráficos, usada no gráfico de faturamento da aplicação.
- **React ChartJs 2**: Biblioteca que encapsula as funcionalidades do **Chart.JS** em componentes React.
- **React Datepicker:** Biblioteca com componentes de escolha de datas, utilizada para as caixas de seleção de datas dos filtros.
- **React Icons:** Biblioteca com componentes React que reúne diversas bibliotecas de ícones conhecidas, como Feather Icons, Font Awesome, Material Icons e etc.
- **React Loading:** Biblioteca que fornece um componente simples que renrediza uma imagem de carregamento de informações.
- **React Multi Carousel:** Esta biblioteca exporta um componente que renderiza um carrosel com múltiplos itens mostrados ao mesmo tempo. Ótima biblioteca, bem customizável e escalável.
- **React Router Dom:** Biblioteca para roteamento de páginas SPA com React.
- **Tiny Skeleton Loader React:** Biblioteca que contém componentes Skeleton Loader, aqueles bloquinhos brilhantes usados em alguns sites (como o Youtube e o Facebook) para mostrar que há dados sendo carregados.

### Dependências de Desenvolvimento

- **ESLint:** Linter usado para garantir o padrão de código da aplicação.
- **Prettier:** Permite adicionar regras novas ao ESLint e habilita a adequação automática do código ao salvar.

## Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente, então tenha certeza de configurá-las antes de desenvolver/colocar a aplicação em produção:

- **REACT_APP_API_URL:** URL da API, para conexão via Axios.
