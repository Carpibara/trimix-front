import { useState } from "react";
import ConfirmDialog from '../components/ComfirmDialog';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import moment from 'moment'
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import { mdiAccountEditOutline } from '@mdi/js';
import PersonaForm from '../components/PersonaForm';

export default function PersonasTable({ personas, deletePersona, editPersona, setToast }) {

    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [personaToEdit, setPersonaToEdit] = useState({});
    const [message, setMessage] = useState("");
    const [personaToDelete, setPersonaToDelete] = useState({});
    const handleCancelEdit = () => setShowForm(false);
    const handleCancel = () => setShow(false);

    const handleClickDelete = (persona) => {
        setShow(true);
        setMessage(`Está seguro que desea borrar a ${persona.perApellido}, ${persona.perNombre}?`);
        setPersonaToDelete(persona);
    }

    const handleClickEdit = (persona) => {
        setPersonaToEdit(persona);
        setShowForm(true);
    }

    const onConfirmDelete = (persona) => {
        deletePersona(persona);
        setToast(true);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Tipo Documento</th>
                    <th>Número Documento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {personas.map((persona, index) =>
                    <tr key={persona.perId}>
                        <td>{persona.perNombre}</td>
                        <td>{persona.perApellido}</td>
                        <td>{moment(persona.perFechaNacimiento).format('DD-MM-YYYY')}</td>
                        <td>{persona.perTipoDocumento}</td>
                        <td>{persona.perNumeroDocumento}</td>
                        <td>
                            <Button className="me-2" type="icon" variant="danger" size="sm" onClick={() => handleClickDelete(persona)}>
                                <Icon path={mdiTrashCanOutline} title="delete" size={1} />
                            </Button>
                            <ConfirmDialog
                                show={show}
                                title="Confirmación de borrado"
                                message={message}
                                onAgree={() => onConfirmDelete(personaToDelete)}
                                onCancel={handleCancel}
                                onHide={handleCancel}
                            />

                            <Button type="icon" variant="success" size="sm" onClick={() => handleClickEdit(persona)}>
                                <Icon path={mdiAccountEditOutline} title="edit" size={1} />
                            </Button>
                            {
                                showForm
                                    ? <PersonaForm
                                        personaToAction={personaToEdit}
                                        show={showForm}
                                        accion={editPersona}
                                        onCancel={handleCancelEdit}
                                        setToast={setToast}
                                    />
                                    : ""
                            }
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}