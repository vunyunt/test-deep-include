import {Entity, hasMany, model, property} from '@loopback/repository';
import {Model3} from './model3.model';
import {Through23} from './through23.model';

@model()
export class Model2 extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @hasMany(() => Model3, {through: {model: () => Through23}})
  model3s: Model3[];

  constructor(data?: Partial<Model2>) {
    super(data);
  }
}

export interface Model2Relations {
  // describe navigational properties here
}

export type Model2WithRelations = Model2 & Model2Relations;
