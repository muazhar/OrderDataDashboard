/*
    Dicionaries file.

    This script contains objects that represent dictionaries. A dictionary is an array/object-like structure, where you can retrieve an equivalente
    data based on the entry.
*/

// Months dictionary. Getting months["February"] would return the string "Fevereiro", for instance.
export const months = {
    January: 'Janeiro',
    February: 'Fevereiro',
    March: 'Março',
    April: 'Abril',
    May: 'Maio',
    June: 'Junho',
    July: 'Julho',
    August: 'Agosto',
    September: 'Setembro',
    October: 'Outubro',
    November: 'Novembro',
    December: 'Dezembro',
};

// Table Header dictionary, used to translate the API data names into pt_BR names to be shown.
export const tableHeader = {
    id: 'Id',
    birthday: 'Data de Nascimento',
    cpf: 'CPF',
    email: 'Email',
    firstname: 'Nome',
    lastname: 'Sobrenome',
    phone: 'Telefone',
    order_id: 'Id do Pedido',
    customer_firstname: 'Nome do cliente',
    customer_lastname: 'Sobrenome do cliente',
    delivered_on: 'Data de entrega',
    ordered_on: 'Data do pedido',
    payment_type: 'Tipo de pagamento',
    shipping: 'Frete (R$)',
    status: 'Status',
    total: 'Total (R$)',
    ship_address1: 'Endereço de entrega',
    name: 'Nome',
    excerpt: 'Resumo',
    price: 'Preço (R$)',
    quantity: 'Quantidade',
};

// The order status dictionary, which transforms the api's raw order.status strings into more readable ones.
export const orderStatus = {
    Cancelled: 'Cancelado',
    Delivered: 'Entregue',
    'In Production': 'Em Produção',
    'Not Payed': 'Não Pago',
    Pending: 'Pendente',
    Processing: 'Processando',
    'Setting for Shipping': 'Preparando para o envio',
    Shipped: 'Enviado',
    'Waiting Withdrawn': 'Aguardando retirada',
};

// Payment Type dictionary
export const orderPaymentType = {
    CREDIT_CARD: 'Cartão de Crédito',
    BOLETO: 'Boleto',
    ONLINE_TRANSFER: 'Transferência Online',
    OTHER: 'Outro',
};
