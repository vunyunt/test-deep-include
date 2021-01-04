import {Entity, model, property} from '@loopback/repository';

@model()
export class Through23 extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  model2Id?: string;

  @property({
    type: 'string',
  })
  model3Id?: string;

  constructor(data?: Partial<Through23>) {
    super(data);
  }
}

export interface Through23Relations {
  // describe navigational properties here
}

export type Through23WithRelations = Through23 & Through23Relations;
