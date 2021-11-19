import {Entity, model, property, hasOne} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Cliente} from './cliente.model';

@model()
export class Solicitudes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  administradorId?: string;

  @hasOne(() => Administrador)
  administrador: Administrador;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @hasOne(() => Cliente)
  cliente: Cliente;

  constructor(data?: Partial<Solicitudes>) {
    super(data);
  }
}

export interface SolicitudesRelations {
  // describe navigational properties here
}

export type SolicitudesWithRelations = Solicitudes & SolicitudesRelations;
