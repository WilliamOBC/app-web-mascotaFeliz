import {Entity, model, property} from '@loopback/repository';

@model()
export class DetallesPlanes extends Entity {

  @property({
    type: 'string',
  })
  mascotaId?: string;

  @property({
    type: 'string',
  })
  planesId?: string;

  constructor(data?: Partial<DetallesPlanes>) {
    super(data);
  }
}

export interface DetallesPlanesRelations {
  // describe navigational properties here
}

export type DetallesPlanesWithRelations = DetallesPlanes & DetallesPlanesRelations;
