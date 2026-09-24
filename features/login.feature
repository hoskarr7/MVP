Feature: Inicio de sesión
  Como usuario de Oversoft DMS
  Quiero iniciar sesión con mis credenciales
  Para acceder al sistema de gestión

  Scenario: Inicio de sesión exitoso con credenciales válidas
    Given el usuario se encuentra en la pantalla de inicio de sesión
    When el usuario ingresa sus credenciales válidas
    And el usuario confirma el inicio de sesión
    Then el usuario accede correctamente al sistema
