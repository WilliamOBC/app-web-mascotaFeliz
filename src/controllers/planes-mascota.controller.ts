import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Planes,
DetallesPlanes,
Mascota,
} from '../models';
import {PlanesRepository} from '../repositories';

export class PlanesMascotaController {
  constructor(
    @repository(PlanesRepository) protected planesRepository: PlanesRepository,
  ) { }

  @get('/planes/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Planes has many Mascota through DetallesPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.planesRepository.mascotas(id).find(filter);
  }

  @post('/planes/{id}/mascotas', {
    responses: {
      '200': {
        description: 'create a Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Planes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInPlanes',
            exclude: ['id'],
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.planesRepository.mascotas(id).create(mascota);
  }

  @patch('/planes/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Planes.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.planesRepository.mascotas(id).patch(mascota, where);
  }

  @del('/planes/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Planes.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.planesRepository.mascotas(id).delete(where);
  }
}
