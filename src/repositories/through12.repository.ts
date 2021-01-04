import {DefaultCrudRepository} from '@loopback/repository';
import {Through12, Through12Relations} from '../models';
import {TestDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class Through12Repository extends DefaultCrudRepository<
  Through12,
  typeof Through12.prototype.id,
  Through12Relations
> {
  constructor(
    @inject('datasources.TestDs') dataSource: TestDsDataSource,
  ) {
    super(Through12, dataSource);
  }
}
