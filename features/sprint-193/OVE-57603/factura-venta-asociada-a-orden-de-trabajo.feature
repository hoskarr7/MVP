Feature: OVE-57603 - Generación de Asientos Contables a cargo del orquestador

  Background:
    Given el usuario se encuentra en la pantalla de inicio de sesión
    When el usuario ingresa sus credenciales válidas
    And el usuario confirma el inicio de sesión
    And el usuario accede correctamente al sistema

  Scenario: Crear una Factura de venta Articulos - Afecta Stock asociada a una Orden de Trabajo no debe llamar a la API de Asientos Contables desde el front
    Given el usuario se encuentra en el listado de Comprobantes de Venta
    When el usuario inicia la creación de un nuevo comprobante
    And selecciona el tipo de comprobante "Factura de venta Articulos - Afecta Stock"
    And busca y selecciona el socio de negocio "TOYOTA ARGENTINA S.A."
    And hace clic en Asociar Ordenes
    And selecciona el cargo "Cliente"
    And busca las órdenes de trabajo
    And selecciona la primera orden de trabajo disponible
    And acepta el modal de selección de órdenes de trabajo
    And selecciona el centro de costos
    And guarda el comprobante
    And comienza a monitorear los llamados a la API que contengan "GenerarAsientoAutomatico"
    And comienza a registrar el ID del comprobante emitido
    And confirma el guardado y la emisión en los mensajes emergentes
    And confirma la emisión exitosa del comprobante
    Then el comprobante se crea correctamente y vuelve al listado
    And no debe haberse llamado a ninguna API que contenga "GenerarAsientoAutomatico"
    And el asiento contable debe haberse generado en la base de datos con estado 1
    And no deben quedar fallos registrados en el escenario
