import { Given, Then } from '@cucumber/cucumber';
import { ApiCallRecorder } from '../../utils/apiCallRecorder';
import { ejecutarQuery } from '../../utils/db';
import { registrarSiFalla } from '../../utils/softAssert';
import type { ICustomWorld } from '../../support/world';

import { environment } from '../../config/environment';

Given('comienza a registrar el ID del comprobante emitido', function (this: ICustomWorld) {
  this.comprobanteIdRecorder = new ApiCallRecorder(this.page!, 'ValidarEmisionComprobanteElectronico');
});

Then(
  'el asiento contable debe haberse generado en la base de datos con estado {int}',
  async function (this: ICustomWorld, estadoEsperado: number) {
    const comprobanteId = this.comprobanteIdRecorder?.obtenerParametro('id');
    const seCapturoId = Boolean(comprobanteId);
    registrarSiFalla(
      this,
      seCapturoId,
      'No se pudo capturar el ID del comprobante desde el llamado a ValidarEmisionComprobanteElectronico'
    );
    if (!seCapturoId) {
      return;
    }

    await this.page!.waitForTimeout(2000);

    const filas = await ejecutarQuery(
      'SELECT * FROM dbo.AsientosContables WHERE ComprobanteID = @comprobanteId AND EmpresaID = @empresaId',
      { comprobanteId: Number(comprobanteId), empresaId: environment.empresaId }
    );

    registrarSiFalla(
      this,
      filas.length > 0,
      `No se encontró ningún Asiento Contable para el ComprobanteID ${comprobanteId}`
    );

    const conEstadoDistinto = filas.filter((fila) => fila.EstadoAsientoContableID !== estadoEsperado);
    registrarSiFalla(
      this,
      conEstadoDistinto.length === 0,
      `${conEstadoDistinto.length} de ${filas.length} Asientos Contables del ComprobanteID ${comprobanteId} no tienen EstadoAsientoContableID = ${estadoEsperado} (valores encontrados: ${filas.map((f) => f.EstadoAsientoContableID).join(', ')})`
    );
  }
);

Then(
  'no debe haberse generado ningún asiento contable en la base de datos',
  async function (this: ICustomWorld) {
    const comprobanteId = this.comprobanteIdRecorder?.obtenerParametro('id');
    const seCapturoId = Boolean(comprobanteId);
    registrarSiFalla(
      this,
      seCapturoId,
      'No se pudo capturar el ID del comprobante desde el llamado a ValidarEmisionComprobanteElectronico'
    );
    if (!seCapturoId) {
      return;
    }

    await this.page!.waitForTimeout(2000);

    const filas = await ejecutarQuery(
      'SELECT * FROM dbo.AsientosContables WHERE ComprobanteID = @comprobanteId AND EmpresaID = @empresaId',
      { comprobanteId: Number(comprobanteId), empresaId: environment.empresaId }
    );

    registrarSiFalla(
      this,
      filas.length === 0,
      `Se encontraron ${filas.length} Asientos Contables para el ComprobanteID ${comprobanteId}, se esperaba que no se generara ninguno`
    );
  }
);

Then(
  'el asiento contable del recibo emitido debe haberse generado en la base de datos con estado {int}',
  async function (this: ICustomWorld, estadoEsperado: number) {
    const numero = this.numeroComprobanteEmitido;
    registrarSiFalla(this, Boolean(numero), 'No se pudo capturar el número del comprobante de cobro emitido');
    if (!numero) {
      return;
    }

    await this.page!.waitForTimeout(2000);

    const filas = await ejecutarQuery(
      "SELECT * FROM dbo.AsientosContables WHERE Concepto LIKE @patron AND EmpresaID = @empresaId",
      { patron: `%Recibo ${numero}%`, empresaId: environment.empresaId }
    );

    registrarSiFalla(this, filas.length > 0, `No se encontró ningún Asiento Contable para el Recibo ${numero}`);

    const conEstadoDistinto = filas.filter((fila) => fila.EstadoAsientoContableID !== estadoEsperado);
    registrarSiFalla(
      this,
      conEstadoDistinto.length === 0,
      `${conEstadoDistinto.length} de ${filas.length} Asientos Contables del Recibo ${numero} no tienen EstadoAsientoContableID = ${estadoEsperado} (valores encontrados: ${filas.map((f) => f.EstadoAsientoContableID).join(', ')})`
    );
  }
);

Then(
  'no debe haberse generado ningún asiento contable para el recibo emitido en la base de datos',
  async function (this: ICustomWorld) {
    const numero = this.numeroComprobanteEmitido;
    registrarSiFalla(this, Boolean(numero), 'No se pudo capturar el número del comprobante de cobro emitido');
    if (!numero) {
      return;
    }

    await this.page!.waitForTimeout(2000);

    const filas = await ejecutarQuery(
      "SELECT * FROM dbo.AsientosContables WHERE Concepto LIKE @patron AND EmpresaID = @empresaId",
      { patron: `%Recibo ${numero}%`, empresaId: environment.empresaId }
    );

    registrarSiFalla(
      this,
      filas.length === 0,
      `Se encontraron ${filas.length} Asientos Contables para el Recibo ${numero}, se esperaba que no se generara ninguno`
    );
  }
);

Then(
  'el asiento contable de la orden de pago emitida debe haberse generado en la base de datos con estado {int}',
  async function (this: ICustomWorld, estadoEsperado: number) {
    const numero = this.numeroComprobanteEmitido;
    registrarSiFalla(this, Boolean(numero), 'No se pudo capturar el número de la orden de pago emitida');
    if (!numero) {
      return;
    }

    await this.page!.waitForTimeout(2000);

    const filas = await ejecutarQuery(
      "SELECT * FROM dbo.AsientosContables WHERE Concepto LIKE @patron AND EmpresaID = @empresaId",
      { patron: `%Orden de Pago ${numero}%`, empresaId: environment.empresaId }
    );

    registrarSiFalla(this, filas.length > 0, `No se encontró ningún Asiento Contable para la Orden de Pago ${numero}`);

    const conEstadoDistinto = filas.filter((fila) => fila.EstadoAsientoContableID !== estadoEsperado);
    registrarSiFalla(
      this,
      conEstadoDistinto.length === 0,
      `${conEstadoDistinto.length} de ${filas.length} Asientos Contables de la Orden de Pago ${numero} no tienen EstadoAsientoContableID = ${estadoEsperado} (valores encontrados: ${filas.map((f) => f.EstadoAsientoContableID).join(', ')})`
    );
  }
);

Then(
  'no debe haberse generado ningún asiento contable para la orden de pago emitida en la base de datos',
  async function (this: ICustomWorld) {
    const numero = this.numeroComprobanteEmitido;
    registrarSiFalla(this, Boolean(numero), 'No se pudo capturar el número de la orden de pago emitida');
    if (!numero) {
      return;
    }

    await this.page!.waitForTimeout(2000);

    const filas = await ejecutarQuery(
      "SELECT * FROM dbo.AsientosContables WHERE Concepto LIKE @patron AND EmpresaID = @empresaId",
      { patron: `%Orden de Pago ${numero}%`, empresaId: environment.empresaId }
    );

    registrarSiFalla(
      this,
      filas.length === 0,
      `Se encontraron ${filas.length} Asientos Contables para la Orden de Pago ${numero}, se esperaba que no se generara ninguno`
    );
  }
);
