import {Entity, hasMany, model, property} from '@loopback/repository';
import {Model2} from './model2.model';
import {Through12} from './through12.model';

@model()
export class Model1 extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @hasMany(() => Model2, {through: {model: () => Through12}})
  model2s: Model2[];

  constructor(data?: Partial<Model1>) {
    super(data);
  }
}

export interface Model1Relations {
  // describe navigational properties here
}

export type Model1WithRelations = Model1 & Model1Relations;
