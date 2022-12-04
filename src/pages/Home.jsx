import LayoutPrincipal from "../layouts/main";
import Container from "react-bootstrap/esm/Container";
import PersonasTable from "../components/PersonasTable";
import usePersonas from '../hook/usePersonas';
import { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import PersonaForm from "../components/PersonaForm";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from '../components/Pagination';

export default function Personas() {

    const {
        personas,
        loadPersonas,
        mensaje,
        createPersona,
        deletePersona,
        editPersona,
        filterPersonas,
        resetPersonas
    } = usePersonas();

    const [showToast, setToast] = useState(false)
    const [showForm, setShowForm] = useState(false);

    const onCancel = () => {
        setShowForm(false);
    }

    const cleanBusqueda = {
        nombreBusqueda: "",
        tipoDocumentoBusqueda: ""
    }

    const [personaBusqueda, setPersonaBusqueda] = useState(cleanBusqueda);

    const {
        nombreBusqueda,
        tipoDocumentoBusqueda,
    } = personaBusqueda;

    const onInputChange = (e) => {
        setPersonaBusqueda({ ...personaBusqueda, [e.target.name]: e.target.value });
    }

    const cleanPersona = {
        perNombre: "",
        perApellido: "",
        perFechaNacimiento: "",
        perTipoDocumento: "",
        perNumeroDocumento: ""
    }
    const onBuscar = () => {
        filterPersonas(personaBusqueda);
    }

    const onReset = () => {
        setPersonaBusqueda(cleanBusqueda);
        resetPersonas();
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPersonas = personas.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <LayoutPrincipal>
            <Container>
                <Row>
                    <Col sm={10}>
                        <Row>
                            <Col>
                                <Form.Group className="mt-2" controlId="formPersonasApellido">
                                    <Form.Control type="text" name="nombreBusqueda" value={nombreBusqueda} placeholder="Nombre" onChange={(e) => onInputChange(e)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mt-2" controlId="formPersonasTipoDocumento">
                                    <Form.Select name="tipoDocumentoBusqueda" value={tipoDocumentoBusqueda} onChange={(e) => onInputChange(e)}>
                                        <option value="">Tipo de documento</option>
                                        <option value="DNI">DNI</option>
                                        <option value="PASAPORTE">Pasaporte</option>
                                        <option value="CEDULA">Cédula</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button className="me-2 mt-2 mb-2" variant="primary" onClick={() => onBuscar()}>
                                    Buscar
                                </Button>
                                <Button className="me-0 mt-2 mb-2" variant="primary" type="reset" onClick={() => onReset()}>
                                    Refrescar
                                </Button>
                            </Col>

                        </Row>
                    </Col>
                    <Col sm={2} className="d-flex flex-row-reverse">
                        <Button className="me-0 mt-2 mb-2" variant="primary" onClick={() => setShowForm(true)}>
                            Nueva Persona
                        </Button>
                    </Col>
                </Row>
                <PersonaForm
                    show={showForm}
                    accion={createPersona}
                    onCancel={onCancel}
                    personaToAction={cleanPersona}
                    setToast={setToast}
                />
                {loadPersonas
                    ? <p>Cargando Personas</p>
                    : <PersonasTable
                        personas={currentPersonas}
                        deletePersona={deletePersona}
                        editPersona={editPersona}
                        setToast={setToast}
                    />
                }
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={personas.length}
                    paginate={paginate}
                />
            </Container>

            <Toast
                onClose={() => setToast(false)}
                autohide
                show={showToast}
                delay={3000}
                className="position-fixed top-0 end-0 p-2 m-2"
            >
                <Toast.Body>{mensaje}</Toast.Body>
            </Toast>
        </LayoutPrincipal>
    );
}