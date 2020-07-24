import React from 'react';
import { useParams } from 'react-router-dom';

// Custom components
import TopNavbar from '../../components/TopNavbar';
import OrderInfo from '../../components/OrderInfo';
import ItemContainer from '../../components/ItemContainer';

// This page renders only a single order, got from the params in the url via the match prop
const SingleOrder = () => {
    const { id } = useParams();

    return (
        <>
            <TopNavbar activeItem="orders" />
            <ItemContainer
                id={id}
                containedOn="page"
                apiURL="/order"
                notFoundMsg="Pedido não encontrado."
            >
                <OrderInfo />
            </ItemContainer>
        </>
    );
};

export default SingleOrder;
