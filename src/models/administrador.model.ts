import {Entity, model, property, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Solicitudes} from './solicitudes.model';
import {Producto} from './producto.model';

@model()
export class Administrador extends Entity {
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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Asesor)
  asesors: Asesor[];

  @property({
    type: 'string',
  })
  asesorId?: string;

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  @property({
    type: 'string',
  })
  solicitudesId?: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @property({
    type: 'string',
  })
  productoId?: string;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
