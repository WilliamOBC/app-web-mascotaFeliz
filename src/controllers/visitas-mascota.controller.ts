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
  Visitas,
  Mascota,
} from '../models';
import {VisitasRepository} from '../repositories';

export class VisitasMascotaController {
  constructor(
    @repository(VisitasRepository) protected visitasRepository: VisitasRepository,
  ) { }

  @get('/visitas/{id}/mascota', {
    responses: {
      '200': {
        description: 'Visitas has one Mascota',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mascota),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota> {
    return this.visitasRepository.mascota(id).get(filter);
  }

  @post('/visitas/{id}/mascota', {
    responses: {
      '200': {
        description: 'Visitas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Visitas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInVisitas',
            exclude: ['id'],
            optional: ['visitasId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.visitasRepository.mascota(id).create(mascota);
  }

  @patch('/visitas/{id}/mascota', {
    responses: {
      '200': {
        description: 'Visitas.Mascota PATCH success count',
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
    return this.visitasRepository.mascota(id).patch(mascota, where);
  }

  @del('/visitas/{id}/mascota', {
    responses: {
      '200': {
        description: 'Visitas.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.visitasRepository.mascota(id).delete(where);
  }
}
