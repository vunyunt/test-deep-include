import {DefaultCrudRepository} from '@loopback/repository';
import {Through23, Through23Relations} from '../models';
import {TestDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class Through23Repository extends DefaultCrudRepository<
  Through23,
  typeof Through23.prototype.id,
  Through23Relations
> {
  constructor(
    @inject('datasources.TestDs') dataSource: TestDsDataSource,
  ) {
    super(Through23, dataSource);
  }
}
