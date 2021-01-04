import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Model3 extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Model3>) {
    super(data);
  }
}

export interface Model3Relations {
  // describe navigational properties here
}

export type Model3WithRelations = Model3 & Model3Relations;
