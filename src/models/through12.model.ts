import {Entity, model, property} from '@loopback/repository';

@model()
export class Through12 extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  model1Id?: string;

  @property({
    type: 'string',
  })
  model2Id?: string;

  constructor(data?: Partial<Through12>) {
    super(data);
  }
}

export interface Through12Relations {
  // describe navigational properties here
}

export type Through12WithRelations = Through12 & Through12Relations;
