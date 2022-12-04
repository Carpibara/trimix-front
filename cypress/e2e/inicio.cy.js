describe('trimix', () => {

  const nombre = 'Juan';
  const apellido = 'Peréz';

  beforeEach(()=>{
    cy.visit('http://localhost:3000/');
  })

  it('La pagina se puede abrir', () => {
    
    cy.contains('Trimix');
  });

  it('Se puede crear persona', () => {
      cy.contains('Nueva Persona').click();
      cy.get('input[name="perNombre"]').type(nombre);
      cy.get('input[name="perApellido"]').type(apellido);
      cy.get('input[name="perFechaNacimiento"]').type('1990-01-01');
      cy.get('select[name="perTipoDocumento"]').select('DNI');
      cy.get('input[name="perNumeroDocumento"]').type('123456789');
      cy.contains('Enviar').click();
      cy.contains(`Se ha dado de alta a ${apellido}, ${nombre}`);
  });

  it('Se puede buscar persona', () => {
    cy.get('input[name="nombreBusqueda"]').type(nombre);
    cy.contains('Buscar').click();
    cy.contains(apellido);
    cy.contains('Refrescar').click();
  });

  it('Se puede editar persona', () => {
    cy.get('input[name="nombreBusqueda"]').type(nombre);
    cy.contains('Buscar').click();
    cy.contains("edit").click();
    cy.get('select[name="perTipoDocumento"]').select('PASAPORTE');
    cy.contains('Enviar').click();
    cy.contains(`Se ha editado ${apellido}, ${nombre}`);
  });

  it('Se puede borrar persona', () => {
    cy.get('input[name="nombreBusqueda"]').type(nombre);
    cy.contains('Buscar').click();
    cy.contains("delete").click();
    cy.contains('Confirmación de borrado');
    cy.contains('Aceptar').click();
    cy.contains(`Se ha borrado a ${apellido}, ${nombre}`);
    cy.contains('Refrescar').click();
  });
})