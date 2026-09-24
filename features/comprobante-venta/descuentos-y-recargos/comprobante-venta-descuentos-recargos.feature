Feature: Alta de Comprobante de Venta - Combinaciones de Descuento y Recargo

  Background:
    Given el usuario se encuentra en la pantalla de inicio de sesión
    When el usuario ingresa sus credenciales válidas
    And el usuario confirma el inicio de sesión
    And el usuario accede correctamente al sistema

  Scenario Outline: Crear un comprobante variando el Descuento/Recargo General y de Item
    Given el usuario se encuentra en el listado de Comprobantes de Venta
    When el usuario inicia la creación de un nuevo comprobante
    And selecciona el tipo de comprobante "Factura de venta Articulos - Afecta Stock"
    And busca y selecciona el socio de negocio "BH"
    And selecciona el centro de costos
    And aplica el descuento o recargo general "<descuentoGeneral>"
    And accede a la solapa Items
    And agrega un nuevo item
    And selecciona el tercer item disponible
    And completa la cantidad "1"
    And aplica el descuento o recargo del item "<descuentoItem>"
    And guarda el item
    And guarda el comprobante
    And confirma el guardado y la emisión en los mensajes emergentes
    Then el comprobante se crea correctamente y vuelve al listado

    @con-ninguno
    Examples:
      | descuentoGeneral     | descuentoItem      |
      | Ninguno              | Ninguno             |
      | Ninguno              | Descuento Item 10%  |
      | Ninguno              | Recargo item 10     |
      | Descuento 10%        | Ninguno             |
      | Recargo General 250% | Ninguno             |

    @combinacion-completa
    Examples:
      | descuentoGeneral     | descuentoItem      |
      | Descuento 10%        | Recargo item 10     |
      | Recargo General 250% | Descuento Item 10%  |
      | Recargo General 250% | Recargo item 10     |

    @combinacion-completa @descuento-general-descuento-item
    Examples:
      | descuentoGeneral | descuentoItem      |
      | Descuento 10%    | Descuento Item 10%  |
