import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {Model2, Model2Relations, Model3, Through23} from '../models';
import {TestDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {Through23Repository} from './through23.repository';
import {Model3Repository} from './model3.repository';

export class Model2Repository extends DefaultCrudRepository<
  Model2,
  typeof Model2.prototype.id,
  Model2Relations
> {

  public readonly model3s: HasManyThroughRepositoryFactory<Model3, typeof Model3.prototype.id,
          Through23,
          typeof Model2.prototype.id
        >;

  constructor(
    @inject('datasources.TestDs') dataSource: TestDsDataSource, @repository.getter('Through23Repository') protected through23RepositoryGetter: Getter<Through23Repository>, @repository.getter('Model3Repository') protected model3RepositoryGetter: Getter<Model3Repository>,
  ) {
    super(Model2, dataSource);
    this.model3s = this.createHasManyThroughRepositoryFactoryFor('model3s', model3RepositoryGetter, through23RepositoryGetter,);
    this.registerInclusionResolver('model3s', this.model3s.inclusionResolver);
  }
}
