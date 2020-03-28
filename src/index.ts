import StringSchema from './string'
import NumericSchema from './numeric'
import BooleanSchema from './boolean'
import NullSchema from './null'
import ArraySchema from './array'
import ObjectSchema from './object'
import EnumSchema, { Enumerable } from './enum'
import ConstSchema, { Constantable } from './const'
import CombiningSchema from './combining'
import AnySchema from './any'
import BaseSchema from './base'

export type Schema =
  StringSchema
  | BaseSchema
  | NumericSchema
  | BooleanSchema
  | NullSchema
  | ArraySchema
  | ObjectSchema
  | EnumSchema
  | ConstSchema
  | CombiningSchema
  | AnySchema

export default {
  string: (): StringSchema => {
    return new StringSchema()
  },

  number: (): NumericSchema => {
    return new NumericSchema('number')
  },

  integer: (): NumericSchema => {
    return new NumericSchema('integer')
  },

  boolean: (): BooleanSchema => {
    return new BooleanSchema()
  },

  null: (): NullSchema => {
    return new NullSchema()
  },

  array: (): ArraySchema => {
    return new ArraySchema()
  },

  list: <T extends Schema>(items: T) => {
    return new ArraySchema().items(items)
  },

  object: (): ObjectSchema => {
    return new ObjectSchema()
  },

  shape: <T extends Record<string, Schema>>(props: T) => {
    return ObjectSchema.shape(props)
  },

  enum: <T extends Enumerable>(...args: T[]) => {
    return new EnumSchema(...args)
  },

  const: <T extends Constantable>(value: T) => {
    return new ConstSchema(value)
  },

  anyOf: <T extends Schema[]>(...schemas: T): CombiningSchema<T[number]['type']> => {
    return new CombiningSchema('anyOf', ...schemas)
  },

  allOf: <T extends Schema[]>(...schemas: T): CombiningSchema<T[number]['type']> => {
    return new CombiningSchema('allOf', ...schemas)
  },

  oneOf: <T extends Schema[]>(...schemas: T): CombiningSchema<T[number]['type']> => {
    return new CombiningSchema('oneOf', ...schemas)
  },

  not: <T extends Schema[]>(...schemas: T): CombiningSchema<any> => {
    return new CombiningSchema('not', ...schemas)
  },

  any: (): AnySchema => {
    return new AnySchema()
  },

  raw: (fragment: object) => {
    return new AnySchema().raw(fragment)
  },

  id: (id: string) => {
    return new AnySchema().id(id)
  },

  ref: (ref: string) => {
    return new AnySchema().ref(ref)
  },

  title: (title: string) => {
    return new AnySchema().title(title)
  },

  description: (description: string) => {
    return new AnySchema().description(description)
  },

  examples: (...examples: any[]) => {
    return new AnySchema().examples(...examples)
  },

  default: (def: any) => {
    return new AnySchema().default(def)
  }
}
