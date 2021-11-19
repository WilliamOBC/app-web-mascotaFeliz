import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitudes} from './solicitudes.model';
import {Mascota} from './mascota.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correoElectronico: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  @property({
    type: 'string',
  })
  solicitudesId?: string;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @property({
    type: 'string',
  })
  mascotaId?: string;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
