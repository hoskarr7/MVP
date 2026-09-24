Feature: OVE-57603 - Configuración: Cuenta Deudora llena + Auto Deshabilitado + Desactivar Asientos en Borrador habilitado

  Background:
    Given el usuario se encuentra en la pantalla de inicio de sesión
    When el usuario ingresa sus credenciales válidas
    And el usuario confirma el inicio de sesión
    And el usuario accede correctamente al sistema

  Scenario: Configurar la aplicación con Cuenta Deudora llena, Asiento Automático deshabilitado y Desactivar Asientos en Borrador habilitado
    Given el usuario se encuentra en Imputación Contable
    When selecciona "Socio de Negocios" en Componente Patrimonial
    And edita la categoría "Cliente"
    And selecciona "Circuito Mostrador" en Tipo Apertura
    And selecciona "Banco X" en Cuenta Deudora
    And guarda la imputación contable
    Then la imputación contable se guarda con éxito
    When el usuario se encuentra en Parámetro Empresa
    And busca el parámetro "Asiento"
    Then asegura que el parámetro "Permitir la generación de Asiento Automático" esté deshabilitado
    And asegura que el parámetro "Desactivar Asientos en Borrador" esté habilitado
