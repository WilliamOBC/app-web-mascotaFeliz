import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Producto} from './producto.model';

@model()
export class Asesor extends Entity {
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
    type: 'number',
    required: true,
  })
  comision: number;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
  })
  administradorId?: string;

  @hasOne(() => Administrador)
  administrador: Administrador;

  @hasMany(() => Producto)
  productos: Producto[];

  @property({
    type: 'string',
  })
  productoId?: string;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
