Feature: Alta de Comprobante de Venta - Caso 01

  Background:
    Given el usuario se encuentra en la pantalla de inicio de sesión
    When el usuario ingresa sus credenciales válidas
    And el usuario confirma el inicio de sesión
    And el usuario accede correctamente al sistema

  Scenario: Crear un comprobante de venta con un item cargado
    Given el usuario se encuentra en el listado de Comprobantes de Venta
    When el usuario inicia la creación de un nuevo comprobante
    And selecciona el tipo de comprobante "Factura de venta Articulos - Afecta Stock"
    And busca y selecciona el socio de negocio "BH"
    And selecciona el centro de costos
    And accede a la solapa Items
    And agrega un nuevo item
    And selecciona el tercer item disponible
    And completa la cantidad "11"
    And guarda el item
    And guarda el comprobante
    And confirma el guardado y la emisión en los mensajes emergentes
    Then el comprobante se crea correctamente y vuelve al listado
