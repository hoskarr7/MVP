Feature: OVE-64496 - Generación de Asientos Contables a cargo del orquestador en Cobros

  Background:
    Given el usuario se encuentra en la pantalla de inicio de sesión
    When el usuario ingresa sus credenciales válidas
    And el usuario confirma el inicio de sesión
    And el usuario accede correctamente al sistema

  Scenario: Crear un Recibo no debe llamar a la API de Asientos Contables desde el front
    Given el usuario se encuentra en el listado de Comprobantes de Cobro
    When el usuario inicia la creación de un nuevo comprobante de cobro
    And selecciona el tipo de comprobante de cobro "Recibo"
    And selecciona el socio de negocio del cobro "BH Sport"
    And completa el importe bruto "800"
    And accede a la solapa Movimientos Tesorería
    And selecciona el tipo de movimiento tesorería "Cobros"
    And completa la descripción del movimiento "1"
    And abre el modal de Efectivo
    And carga el importe "800" en Efectivo
    And acepta el modal de Efectivo
    And comienza a monitorear los llamados a la API que contengan "GenerarAsientoAutomatico"
    And guarda el comprobante de cobro
    And confirma el guardado del comprobante de cobro
    And registra el número del comprobante de cobro emitido
    And confirma la emisión del comprobante de cobro
    Then el comprobante de cobro se crea correctamente y vuelve al listado
    And no debe haberse llamado a ninguna API que contenga "GenerarAsientoAutomatico"
    And el asiento contable del recibo emitido debe haberse generado en la base de datos con estado 1
    And no deben quedar fallos registrados en el escenario
