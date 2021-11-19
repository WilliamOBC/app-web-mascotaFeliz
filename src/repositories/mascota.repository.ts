import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Visitas, Planes, DetallesPlanes} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VisitasRepository} from './visitas.repository';
import {DetallesPlanesRepository} from './detalles-planes.repository';
import {PlanesRepository} from './planes.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Mascota.prototype.id>;

  public readonly visitas: HasManyRepositoryFactory<Visitas, typeof Mascota.prototype.id>;

  public readonly planes: HasManyThroughRepositoryFactory<Planes, typeof Planes.prototype.id,
          DetallesPlanes,
          typeof Mascota.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VisitasRepository') protected visitasRepositoryGetter: Getter<VisitasRepository>, @repository.getter('DetallesPlanesRepository') protected detallesPlanesRepositoryGetter: Getter<DetallesPlanesRepository>, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>,
  ) {
    super(Mascota, dataSource);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planesRepositoryGetter, detallesPlanesRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.visitas = this.createHasManyRepositoryFactoryFor('visitas', visitasRepositoryGetter,);
    this.registerInclusionResolver('visitas', this.visitas.inclusionResolver);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
