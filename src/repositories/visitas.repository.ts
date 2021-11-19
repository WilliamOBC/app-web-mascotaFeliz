import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Visitas, VisitasRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class VisitasRepository extends DefaultCrudRepository<
  Visitas,
  typeof Visitas.prototype.id,
  VisitasRelations
> {

  public readonly mascota: HasOneRepositoryFactory<Mascota, typeof Visitas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Visitas, dataSource);
    this.mascota = this.createHasOneRepositoryFactoryFor('mascota', mascotaRepositoryGetter);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
