Feature: OVE-64535 - Configuración de parametrización para Asiento Contable en Pagos

  Background:
    Given el usuario se encuentra en la pantalla de inicio de sesión
    When el usuario ingresa sus credenciales válidas
    And el usuario confirma el inicio de sesión
    And el usuario accede correctamente al sistema

  Scenario: Configurar la aplicación con Cuenta Deudora llena, Asiento Automático habilitado y Desactivar Asientos en Borrador deshabilitado
    Given el usuario se encuentra en Imputación Contable
    When selecciona "Cajas" en Componente Patrimonial
    And busca la categoría "LFE"
    And edita la categoría "Efectivo LFE"
    And selecciona "General" en Tipo Apertura
    And selecciona "Banco X" en Cuenta Deudora
    And selecciona "Banco X" en Cuenta Acreedora
    And guarda la imputación contable
    Then la imputación contable se guarda con éxito
    When el usuario se encuentra en Parámetro Empresa
    And busca el parámetro "Asiento"
    Then asegura que el parámetro "Permitir la generación de Asiento Automático" esté habilitado
    And asegura que el parámetro "Desactivar Asientos en Borrador" esté deshabilitado
