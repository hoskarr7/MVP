Feature: OVE-64535 - Generación de Asientos Contables a cargo del orquestador en Pagos

  Background:
    Given el usuario se encuentra en la pantalla de inicio de sesión
    When el usuario ingresa sus credenciales válidas
    And el usuario confirma el inicio de sesión
    And el usuario accede correctamente al sistema

  Scenario: Crear una Orden de Pago no debe llamar a la API de Asientos Contables desde el front
    Given el usuario se encuentra en el listado de Comprobantes de Pago
    When el usuario inicia la creación de un nuevo comprobante de pago
    And selecciona el tipo de comprobante de pago "Orden de Pago"
    And selecciona el socio de negocio del pago "BH Sport"
    And selecciona el punto de venta "1"
    And completa el importe bruto del pago "800"
    And accede a la solapa Movimientos Tesorería del pago
    And selecciona el tipo de movimiento tesorería del pago "Pagos"
    And completa la descripción del movimiento de pago "1"
    And abre el modal de Efectivo del pago
    And carga el importe "800" en Efectivo del pago
    And acepta el modal de Efectivo del pago
    And comienza a monitorear los llamados a la API que contengan "GenerarAsientoAutomatico"
    And guarda el comprobante de pago
    And confirma el guardado del comprobante de pago
    And registra el número del comprobante de pago emitido
    And confirma la emisión del comprobante de pago
    Then el comprobante de pago se crea correctamente y vuelve al listado
    And no debe haberse llamado a ninguna API que contenga "GenerarAsientoAutomatico"
    And no debe haberse generado ningún asiento contable para la orden de pago emitida en la base de datos
    And no deben quedar fallos registrados en el escenario
