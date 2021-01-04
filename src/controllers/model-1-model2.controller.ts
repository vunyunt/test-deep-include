import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Model1,
Through12,
Model2,
} from '../models';
import {Model1Repository} from '../repositories';

export class Model1Model2Controller {
  constructor(
    @repository(Model1Repository) protected model1Repository: Model1Repository,
  ) { }

  @get('/model1s/{id}/model2s', {
    responses: {
      '200': {
        description: 'Array of Model1 has many Model2 through Through12',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Model2)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Model2>,
  ): Promise<Model2[]> {
    return this.model1Repository.model2s(id).find(filter);
  }

  @post('/model1s/{id}/model2s', {
    responses: {
      '200': {
        description: 'create a Model2 model instance',
        content: {'application/json': {schema: getModelSchemaRef(Model2)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Model1.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model2, {
            title: 'NewModel2InModel1',
            exclude: ['id'],
          }),
        },
      },
    }) model2: Omit<Model2, 'id'>,
  ): Promise<Model2> {
    return this.model1Repository.model2s(id).create(model2);
  }

  @patch('/model1s/{id}/model2s', {
    responses: {
      '200': {
        description: 'Model1.Model2 PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model2, {partial: true}),
        },
      },
    })
    model2: Partial<Model2>,
    @param.query.object('where', getWhereSchemaFor(Model2)) where?: Where<Model2>,
  ): Promise<Count> {
    return this.model1Repository.model2s(id).patch(model2, where);
  }

  @del('/model1s/{id}/model2s', {
    responses: {
      '200': {
        description: 'Model1.Model2 DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Model2)) where?: Where<Model2>,
  ): Promise<Count> {
    return this.model1Repository.model2s(id).delete(where);
  }
}
