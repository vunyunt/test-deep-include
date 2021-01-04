import {DefaultCrudRepository} from '@loopback/repository';
import {Model3, Model3Relations} from '../models';
import {TestDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class Model3Repository extends DefaultCrudRepository<
  Model3,
  typeof Model3.prototype.id,
  Model3Relations
> {
  constructor(
    @inject('datasources.TestDs') dataSource: TestDsDataSource,
  ) {
    super(Model3, dataSource);
  }
}
