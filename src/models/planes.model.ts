import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {DetallesPlanes} from './detalles-planes.model';

@model()
export class Planes extends Entity {
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
  nombrePlan: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @hasMany(() => Mascota, {through: {model: () => DetallesPlanes}})
  mascotas: Mascota[];

  constructor(data?: Partial<Planes>) {
    super(data);
  }
}

export interface PlanesRelations {
  // describe navigational properties here
}

export type PlanesWithRelations = Planes & PlanesRelations;
