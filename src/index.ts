import StringSchema from './string'
import NumericSchema from './numeric'
import ArraySchema from './array'
import ObjectSchema from './object'
import BaseSchema, { Enumerable, Class } from './base'
import { O } from 'ts-toolbelt'

export type Optional<T extends object> = O.Optional<T, O.SelectKeys<T, undefined>>

export type Schema =
  BaseSchema
  | StringSchema
  | NumericSchema
  | ArraySchema
  | ObjectSchema

export { BaseSchema, StringSchema, NumericSchema, ArraySchema, ObjectSchema, Enumerable }

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

  boolean: () => {
    return new BaseSchema<boolean>('boolean')
  },

  null: () => {
    return new BaseSchema<null>('null')
  },

  array: (): ArraySchema => {
    return new ArraySchema()
  },

  list: <T extends BaseSchema>(items: T) => {
    return new ArraySchema().items(items)
  },

  object: (): ObjectSchema => {
    return new ObjectSchema()
  },

  shape: <T extends Record<string, BaseSchema<any, boolean>>>(props: T, additional: boolean = false) => {
    let res = new ObjectSchema<Optional<{ [K in keyof T]: T[K]['shape'] }>>().additionalProperties(additional)
    for (const prop in props) res = res.prop(prop, props[prop])
    return res
  },

  enum: <T extends Enumerable>(...args: T[]) => {
    return new BaseSchema<T>().enum(...args)
  },

  const: <T extends Enumerable>(value: T) => {
    return new BaseSchema<T>().const(value)
  },

  anyOf: <T extends BaseSchema[]>(...schemas: T) => {
    return new BaseSchema<T[number]['type']>().anyOf(...schemas)
  },

  allOf: <T extends BaseSchema[]>(...schemas: T) => {
    return new BaseSchema<T[number]['type']>().allOf(...schemas)
  },

  oneOf: <T extends BaseSchema[]>(...schemas: T) => {
    return new BaseSchema<T[number]['type']>().oneOf(...schemas)
  },

  not: <T extends BaseSchema>(schema: T) => {
    return new BaseSchema<any>().not(schema)
  },

  ifThen (ifClause: BaseSchema, thenClause: BaseSchema) {
    return new BaseSchema<any>().ifThen(ifClause, thenClause)
  },

  ifThenElse (ifClause: BaseSchema, thenClause: BaseSchema, elseClause: BaseSchema) {
    return new BaseSchema<any>().ifThenElse(ifClause, thenClause, elseClause)
  },

  any: () => {
    return new BaseSchema()
  },

  raw: (fragment: Record<string, any>) => {
    return new BaseSchema().raw(fragment)
  },

  id: (id: string) => {
    return new BaseSchema().id(id)
  },

  schema: (schema: string) => {
    return new BaseSchema().schema(schema)
  },

  ref: (ref: string) => {
    return new BaseSchema().ref(ref)
  },

  title: (title: string) => {
    return new BaseSchema().title(title)
  },

  description: (description: string) => {
    return new BaseSchema().description(description)
  },

  examples: (...examples: any[]) => {
    return new BaseSchema().examples(...examples)
  },

  default: (def: any) => {
    return new BaseSchema().default(def)
  },

  definition: (name: string, defintion: BaseSchema) => {
    return new BaseSchema().definition(name, defintion)
  },

  instanceOf: <T extends Class> (obj: T): BaseSchema<InstanceType<T>> => {
    return new BaseSchema<T>().instanceOf(obj)
  }
}
