import React from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

const ConfirmDialog = ({
    title = 'Confirmación de la acción',
    message = '¿Está usted seguro?',
    show,
    onCancel = () => { },
    onAgree = () => { },
    onHide = () => { }
}) => {
    return (
        <Modal show={show}>
            <Modal.Header closeButton onHide={onHide}>
                {title}
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onAgree}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDialog;
