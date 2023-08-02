import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

export default function LayoutPrincipal({ children }) {
    return (
        <div>
            <ThemeProvider breakpoints={['xxl', 'xl', 'lg', 'md', 'sm']} >
                <NavBar />
                {children}
                <Footer />
            </ThemeProvider>
        </div>
    )
}

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Trimix 2</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">CRUD Persona</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

function Footer() {
    return (

        <footer className='w-100 bg-dark text-center text-white fixed-bottom'>
            <Container className='p-4 pb-0'>
                <section className='mb-4'>
                    <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
                        <Icon path={mdiGithub} title="Github" size={1} />
                    </a>
                </section>
            </Container>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                By Nuñez Cristian.
            </div>
        </footer>

    );
}
