import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Administrador, Proveedor, Asesor} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {ProveedorRepository} from './proveedor.repository';
import {AsesorRepository} from './asesor.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly administrador: HasOneRepositoryFactory<Administrador, typeof Producto.prototype.id>;

  public readonly proveedor: HasOneRepositoryFactory<Proveedor, typeof Producto.prototype.id>;

  public readonly asesor: HasOneRepositoryFactory<Asesor, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Producto, dataSource);
    this.asesor = this.createHasOneRepositoryFactoryFor('asesor', asesorRepositoryGetter);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.proveedor = this.createHasOneRepositoryFactoryFor('proveedor', proveedorRepositoryGetter);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.administrador = this.createHasOneRepositoryFactoryFor('administrador', administradorRepositoryGetter);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
