import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Visitas} from './visitas.model';
import {Planes} from './planes.model';
import {DetallesPlanes} from './detalles-planes.model';

@model()
export class Mascota extends Entity {
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
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
    required: true,
  })
  edad: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @hasOne(() => Cliente)
  cliente: Cliente;

  @hasMany(() => Visitas)
  visitas: Visitas[];

  @property({
    type: 'string',
  })
  visitasId?: string;

  @hasMany(() => Planes, {through: {model: () => DetallesPlanes}})
  planes: Planes[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
