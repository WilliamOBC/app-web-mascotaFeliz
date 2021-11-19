import {Entity, model, property, hasOne} from '@loopback/repository';
import {Mascota} from './mascota.model';

@model()
export class Visitas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVisita: string;

  @property({
    type: 'string',
    required: true,
  })
  temperatura: string;

  @property({
    type: 'string',
    required: true,
  })
  peso: string;

  @property({
    type: 'string',
    required: true,
  })
  recomendaciones: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreEmpleado: string;

  @property({
    type: 'string',
  })
  mascotaId?: string;

  @hasOne(() => Mascota)
  mascota: Mascota;

  constructor(data?: Partial<Visitas>) {
    super(data);
  }
}

export interface VisitasRelations {
  // describe navigational properties here
}

export type VisitasWithRelations = Visitas & VisitasRelations;
