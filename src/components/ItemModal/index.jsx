import React, { useState } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/*
    This component renders a large modal. If no item to show is passed, the modal renders nothing, meaning it can be empty whenever the item prop
    becomes false.
*/
const ItemModal = ({ item, title, children, ...others }) => {
    const [belowModal, setBelowModal] = useState(false);
    const [additionalButtons, setAdditionalButtons] = useState(undefined);

    console.log(item);

    if (!item) return <></>;

    return (
        <Modal
            aria-labelledby="item-details-modal"
            size="lg"
            {...others}
            style={belowModal ? { zIndex: 0 } : {}}
        >
            <Modal.Header closeButton>
                <Modal.Title id="itemDetailsLabel">{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {React.cloneElement(children, {
                    id: item._id,
                    openModal: setBelowModal,
                    addButtons: setAdditionalButtons,
                    hideModal: others.onHide,
                })}
            </Modal.Body>

            <Modal.Footer>
                {additionalButtons}
                <Button variant="secondary" onClick={others.onHide}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

ItemModal.propTypes = {
    item: PropTypes.object,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.object,
        PropTypes.array,
    ]),
};

ItemModal.defaultProps = {
    item: null,
    title: 'Item Details',
    children: <></>,
};

export default ItemModal;
