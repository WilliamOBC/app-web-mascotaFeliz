import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetallesPlanes, DetallesPlanesRelations} from '../models';

export class DetallesPlanesRepository extends DefaultCrudRepository<
  DetallesPlanes,
  //typeof DetallesPlanes.prototype.id,
  DetallesPlanesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(DetallesPlanes, dataSource);
  }
}
