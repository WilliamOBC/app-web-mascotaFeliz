import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DetallesPlanes} from '../models';
import {DetallesPlanesRepository} from '../repositories';

export class DetallesPlanesController {
  constructor(
    @repository(DetallesPlanesRepository)
    public detallesPlanesRepository : DetallesPlanesRepository,
  ) {}

  @post('/detalles-planes')
  @response(200, {
    description: 'DetallesPlanes model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetallesPlanes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPlanes, {
            title: 'NewDetallesPlanes',
            exclude: [/*'id'*/],
          }),
        },
      },
    })
    detallesPlanes: Omit<DetallesPlanes, 'id'>,
  ): Promise<DetallesPlanes> {
    return this.detallesPlanesRepository.create(detallesPlanes);
  }

  @get('/detalles-planes/count')
  @response(200, {
    description: 'DetallesPlanes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetallesPlanes) where?: Where<DetallesPlanes>,
  ): Promise<Count> {
    return this.detallesPlanesRepository.count(where);
  }

  @get('/detalles-planes')
  @response(200, {
    description: 'Array of DetallesPlanes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetallesPlanes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetallesPlanes) filter?: Filter<DetallesPlanes>,
  ): Promise<DetallesPlanes[]> {
    return this.detallesPlanesRepository.find(filter);
  }

  @patch('/detalles-planes')
  @response(200, {
    description: 'DetallesPlanes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPlanes, {partial: true}),
        },
      },
    })
    detallesPlanes: DetallesPlanes,
    @param.where(DetallesPlanes) where?: Where<DetallesPlanes>,
  ): Promise<Count> {
    return this.detallesPlanesRepository.updateAll(detallesPlanes, where);
  }

  @get('/detalles-planes/{id}')
  @response(200, {
    description: 'DetallesPlanes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetallesPlanes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetallesPlanes, {exclude: 'where'}) filter?: FilterExcludingWhere<DetallesPlanes>
  ): Promise<DetallesPlanes> {
    return this.detallesPlanesRepository.findById(id, filter);
  }

  @patch('/detalles-planes/{id}')
  @response(204, {
    description: 'DetallesPlanes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPlanes, {partial: true}),
        },
      },
    })
    detallesPlanes: DetallesPlanes,
  ): Promise<void> {
    await this.detallesPlanesRepository.updateById(id, detallesPlanes);
  }

  @put('/detalles-planes/{id}')
  @response(204, {
    description: 'DetallesPlanes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detallesPlanes: DetallesPlanes,
  ): Promise<void> {
    await this.detallesPlanesRepository.replaceById(id, detallesPlanes);
  }

  @del('/detalles-planes/{id}')
  @response(204, {
    description: 'DetallesPlanes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detallesPlanesRepository.deleteById(id);
  }
}
