import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment'

export default function usePersonas() {
    const [personas, setPersonas] = useState([]);
    const [personasBack, setPersonasBack] = useState([]);
    const [loadPersonas, setLoadPersonas] = useState();
    const [mensaje, setMensaje] = useState();
    const baseUrl = 'http://localhost:8080/';

    const updatePersona = (personas) => {
        setPersonas(personas);
        setPersonasBack(personas);
    }

    useEffect(() => {
        setLoadPersonas(true);
        axios.get(baseUrl + 'personas')
            .then((response) => {
                updatePersona(response.data)
                setLoadPersonas(false);
            })
            .catch(error => {
                setMensaje("Error al obtener los registros de Persona: " + error);
                setLoadPersonas(false);
            })
    }, []);

    const createPersona = (persona) => {
        setLoadPersonas(true);
        axios.post(baseUrl + 'persona', persona)
            .then((response) => {
                var personaNew = response.data;
                personaNew.perFechaNacimiento = moment(personaNew.perFechaNacimiento).format('YYYY-MM-DD');
                updatePersona([...personas, personaNew]);
                setMensaje(`Se ha dado de alta a ${personaNew.perApellido}, ${personaNew.perNombre}`);
                setLoadPersonas(false);
            })
            .catch(() => {
                setMensaje(`Ha ocurrido un error al intentar dar de alta a ${persona.perApellido}, ${persona.perNombre}`);
                setLoadPersonas(false);
            });
    }

    const editPersona = (persona) => {
        setLoadPersonas(true);
        axios.put(baseUrl + `persona/${persona.perId}`, persona)
            .then((response) => {
                updatePersona(personas.map(p => (p.perId === persona.perId ? persona : p)))
                setMensaje(`Se ha editado ${response.data.perApellido}, ${response.data.perNombre}`);
                setLoadPersonas(false);
            })
            .catch(() => {
                setMensaje(`Ha ocurrido un error al intentar dar de alta a ${persona.perApellido}, ${persona.perNombre}`);
                setLoadPersonas(false);
            });
    }

    const filterPersonas = (personaBuscada) => {
        setLoadPersonas(true);
        let personasFiltradas = personasBack;
        personasFiltradas = personaBuscada.nombreBusqueda
            ? personasFiltradas.filter(p => p.perNombre.toLowerCase().includes(personaBuscada.nombreBusqueda.toLowerCase()))
            : personasBack;
        personasFiltradas = personaBuscada.tipoDocumentoBusqueda
            ? personasFiltradas.filter(p => p.perTipoDocumento === personaBuscada.tipoDocumentoBusqueda)
            : personasFiltradas;
        setPersonas(personasFiltradas);
        setLoadPersonas(false);
    }

    const resetPersonas = () => {
        setLoadPersonas(true);
        setPersonas(personasBack);
        setLoadPersonas(false);
    }

    const deletePersona = (persona) => {
        setLoadPersonas(true);
        axios.delete(baseUrl + `persona/${persona.perId}`)
            .then((response) => {
                setPersonas(personas.filter(p => p.perId !== persona.perId));
                setPersonasBack(personasBack.filter(p => p.perId !== persona.perId));
                setMensaje(`Se ha borrado a ${persona.perApellido}, ${persona.perNombre}`);
                setLoadPersonas(false);
            })
            .catch(() => {
                setMensaje(`Ha ocurrido un error al intentar borrar a ${persona.perApellido}, ${persona.perNombre}`);
                setLoadPersonas(false);
            });
    }

    return { personas, loadPersonas, mensaje, createPersona, deletePersona, editPersona, resetPersonas, filterPersonas };

}