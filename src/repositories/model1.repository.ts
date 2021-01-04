import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {Model1, Model1Relations, Model2, Through12} from '../models';
import {TestDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {Through12Repository} from './through12.repository';
import {Model2Repository} from './model2.repository';

export class Model1Repository extends DefaultCrudRepository<
  Model1,
  typeof Model1.prototype.id,
  Model1Relations
> {

  public readonly model2s: HasManyThroughRepositoryFactory<Model2, typeof Model2.prototype.id,
          Through12,
          typeof Model1.prototype.id
        >;

  constructor(
    @inject('datasources.TestDs') dataSource: TestDsDataSource, @repository.getter('Through12Repository') protected through12RepositoryGetter: Getter<Through12Repository>, @repository.getter('Model2Repository') protected model2RepositoryGetter: Getter<Model2Repository>,
  ) {
    super(Model1, dataSource);
    this.model2s = this.createHasManyThroughRepositoryFactoryFor('model2s', model2RepositoryGetter, through12RepositoryGetter,);
    this.registerInclusionResolver('model2s', this.model2s.inclusionResolver);
  }
}
