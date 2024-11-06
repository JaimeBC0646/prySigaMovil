describe('Flujo para agregar un nuevo expediente', () => {
  before(() => {
    // Navegamos al login
    cy.visit('/Main');
    cy.contains('Iniciar Sesión').should('be.visible').click();

    // Ingresamos usuario y contraseña, y luego hacemos clic en iniciar sesión
    cy.get("input[placeholder='user']").type('Jimmy03');
    cy.get("input[placeholder='pass']").type('12345');
    cy.contains('ACCEDER').click();


    // Navegamos a Expedientes
    cy.contains('EXPEDIENTES').click();
  });


  it('Abre modales, agrega nuevo expediente y verifica el nuevo registro', () => {
    // Hacemos clic en el botón de Acciones para abrir el modal de opciones
    cy.contains('ACCIONES').click();

    // Confirmamos que el modal de opciones se muestra
    cy.contains('SELECCIONE LA ACCION A REALIZAR').should('be.visible');
        
    // Seleccionamos la opción "AGREGAR NUEVO EXPEDIENTE"
    cy.contains('AGREGAR NUEVO EXPEDIENTE').click();


    // Llenamos los campos del formulario del expediente
    cy.get("input[placeholder='Clave']").type('12345');
    cy.get("input[placeholder='Ciclo Escolar']").type('2024-2025');
    cy.get("input[placeholder='Alumno']").type('Carlos');
    cy.get("input[placeholder='Grado']").type('5');
    cy.get("input[placeholder='Grupo']").type('A');
    cy.get("input[placeholder='Resguardo']").type('123');
    cy.get("input[placeholder='Caja']").type('45');
    cy.get("input[placeholder='Expediente']").type('EXP123');
    cy.get("input[placeholder='Archivo']").type('doc123');
    // Confirmamos y agregamos el expediente
    cy.contains('Agregar Expediente').click();
    
  
    // Confirmamos que el expediente se ha agregado (esto dependerá de cómo se muestre en la UI)
    cy.contains('Carlos').should('exist');

  });


  /*
  it('Llenado de los campos del expediente y agregar el expediente', () => {

  });


  it('Recargar expedientes', async () => {
    
  });
  */
});
