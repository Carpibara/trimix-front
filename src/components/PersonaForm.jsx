import React from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";

const PersonaForm = ({ personaToAction, show, accion, onCancel, setToast }) => {

    const [persona, setPersona] = useState(personaToAction)
    const {
        perNombre,
        perApellido,
        perFechaNacimiento,
        perTipoDocumento,
        perNumeroDocumento
    } = persona;

    const onInputChange = (e) => {
        setPersona({ ...persona, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        accion(persona);
        setToast(true);
        onCancelar();
    }

    const onCancelar = () => {
        setPersona(personaToAction);
        onCancel();
    }

    return (
        <Modal show={show}>
            <Form className=" m-3" onSubmit={(e) => onSubmit(e)}>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formPersonasNombre">
                            <Form.Label >Nombre</Form.Label>
                            <Form.Control type="text" name="perNombre" required value={perNombre} onChange={(e) => onInputChange(e)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPersonasApellido">
                            <Form.Label >Apellido</Form.Label>
                            <Form.Control type="text" name="perApellido" required value={perApellido} onChange={(e) => onInputChange(e)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPersonasFechaNacimiento">
                            <Form.Label >Fecha de Nacimiento</Form.Label>
                            <Form.Control type="date" name="perFechaNacimiento" required value={perFechaNacimiento} onChange={(e) => onInputChange(e)} />
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formPersonasTipoDocumento">
                            <Form.Label >Tipo de Documento</Form.Label>
                            <Form.Select name="perTipoDocumento" required value={perTipoDocumento} onChange={(e) => onInputChange(e)} >
                                <option value="">Seleccionar</option>
                                <option value="DNI">DNI</option>
                                <option value="PASAPORTE">Pasaporte</option>
                                <option value="CEDULA">Cédula</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPersonasNumeroDocumento">
                            <Form.Label >Número Documento</Form.Label>
                            <Form.Control type="number" name="perNumeroDocumento" required value={perNumeroDocumento} onChange={(e) => onInputChange(e)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="d-flex justify-content-end">
                        <Button className="me-2" variant="primary" type="submit" >
                            Enviar
                        </Button>

                        <Button variant="secondary" onClick={onCancelar}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>

    );
}

export default PersonaForm;