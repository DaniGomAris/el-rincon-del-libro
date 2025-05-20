Feature: Registro de usuario

  Scenario: Registrar un nuevo usuario exitosamente
    Given que el usuario visita la página de registro
    When completa el formulario con datos válidos
    And hace clic en el botón de crear cuenta
    Then debería redirigirse a la página de inicio de sesión

  Scenario: Intentar registrar sin llenar ningún campo
    Given que el usuario visita la página de registro
    When deja todos los campos vacíos y envía el formulario
    Then debería ver mensajes de error en todos los campos