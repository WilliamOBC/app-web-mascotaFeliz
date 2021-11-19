import {Entity, model, property, hasOne} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Proveedor} from './proveedor.model';
import {Asesor} from './asesor.model';

@model()
export class Producto extends Entity {
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
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
  })
  administradorId?: string;

  @hasOne(() => Administrador)
  administrador: Administrador;

  @property({
    type: 'string',
  })
  proveedorId?: string;

  @hasOne(() => Proveedor)
  proveedor: Proveedor;

  @property({
    type: 'string',
  })
  asesorId?: string;

  @hasOne(() => Asesor)
  asesor: Asesor;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
