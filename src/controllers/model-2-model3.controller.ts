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
Model2,
Through23,
Model3,
} from '../models';
import {Model2Repository} from '../repositories';

export class Model2Model3Controller {
  constructor(
    @repository(Model2Repository) protected model2Repository: Model2Repository,
  ) { }

  @get('/model2s/{id}/model3s', {
    responses: {
      '200': {
        description: 'Array of Model2 has many Model3 through Through23',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Model3)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Model3>,
  ): Promise<Model3[]> {
    return this.model2Repository.model3s(id).find(filter);
  }

  @post('/model2s/{id}/model3s', {
    responses: {
      '200': {
        description: 'create a Model3 model instance',
        content: {'application/json': {schema: getModelSchemaRef(Model3)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Model2.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model3, {
            title: 'NewModel3InModel2',
            exclude: ['id'],
          }),
        },
      },
    }) model3: Omit<Model3, 'id'>,
  ): Promise<Model3> {
    return this.model2Repository.model3s(id).create(model3);
  }

  @patch('/model2s/{id}/model3s', {
    responses: {
      '200': {
        description: 'Model2.Model3 PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model3, {partial: true}),
        },
      },
    })
    model3: Partial<Model3>,
    @param.query.object('where', getWhereSchemaFor(Model3)) where?: Where<Model3>,
  ): Promise<Count> {
    return this.model2Repository.model3s(id).patch(model3, where);
  }

  @del('/model2s/{id}/model3s', {
    responses: {
      '200': {
        description: 'Model2.Model3 DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Model3)) where?: Where<Model3>,
  ): Promise<Count> {
    return this.model2Repository.model3s(id).delete(where);
  }
}
