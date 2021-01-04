import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  Model1Repository,
  Model2Repository,
  Model3Repository,
} from '../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class TestDeepIncludeObserver implements LifeCycleObserver {
  constructor(
    @repository('Model1Repository')
    protected mModel1Repository: Model1Repository,
    @repository('Model2Repository')
    protected mModel2Repository: Model2Repository,
    @repository('Model3Repository')
    protected mModel3Repository: Model3Repository,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // Delete all models
    await this.mModel1Repository.deleteAll();
    await this.mModel2Repository.deleteAll();
    await this.mModel3Repository.deleteAll();

    // Create entities
    await this.mModel1Repository.createAll([{id: 'm1_1'}, {id: 'm1_2'}]);

    // Link Model1 entities to Model2 entities
    await this.mModel1Repository.model2s('m1_1').create({id: 'm2_1'});
    await this.mModel1Repository.model2s('m1_1').create({id: 'm2_2'});
    await this.mModel1Repository.model2s('m1_2').create({id: 'm2_3'});
    await this.mModel1Repository.model2s('m1_2').create({id: 'm2_4'});

    // Link Model2 entities to Model3 entities
    await this.mModel2Repository.model3s('m2_1').create({id: 'm3_1'});
    await this.mModel2Repository.model3s('m2_2').create({id: 'm3_2'});
    await this.mModel2Repository.model3s('m2_3').create({id: 'm3_3'});
    await this.mModel2Repository.model3s('m2_4').create({id: 'm3_4'});

    // Fetch data with deep include
    let result = await this.mModel1Repository.find({
      include: [
        {
          relation: 'model2s',
          scope: {
            include: [{relation: 'model3s'}],
          },
        },
      ],
    });

    // log
    console.dir(result);
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
