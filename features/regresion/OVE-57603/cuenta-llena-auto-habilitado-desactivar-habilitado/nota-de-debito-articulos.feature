Feature: OVE-57603 - Generación de Asientos Contables a cargo del orquestador

  Background:
    Given el usuario se encuentra en la pantalla de inicio de sesión
    When el usuario ingresa sus credenciales válidas
    And el usuario confirma el inicio de sesión
    And el usuario accede correctamente al sistema

  Scenario: Crear una Nota de Debito Articulos no debe llamar a la API de Asientos Contables desde el front
    Given el usuario se encuentra en el listado de Comprobantes de Venta
    When el usuario inicia la creación de un nuevo comprobante
    And selecciona el tipo de comprobante "Nota de Debito Articulos"
    And completa el número "9978"
    And busca y selecciona el socio de negocio "BH"
    And selecciona la segunda opción de centro de costos
    And accede a la solapa Items
    And agrega un nuevo item
    And selecciona el tercer item disponible
    And completa la cantidad "1"
    And guarda el item
    And guarda el comprobante
    And comienza a monitorear los llamados a la API que contengan "GenerarAsientoAutomatico"
    And comienza a registrar el ID del comprobante emitido
    And confirma el guardado y la emisión en los mensajes emergentes
    And confirma la emisión exitosa del comprobante
    Then el comprobante se crea correctamente y vuelve al listado
    And no debe haberse llamado a ninguna API que contenga "GenerarAsientoAutomatico"
    And el asiento contable debe haberse generado en la base de datos con estado 3
    And no deben quedar fallos registrados en el escenario
