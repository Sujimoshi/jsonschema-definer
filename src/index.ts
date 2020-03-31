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
  /**
   * Create StringSchema
   *
   * @returns {StringSchema}
   */
  string: (): StringSchema => {
    return new StringSchema()
  },

  /**
   * Create NumericSchema(number)
   *
   * @returns {NumericSchema}
   */
  number: (): NumericSchema => {
    return new NumericSchema('number')
  },

  /**
   * Create NumericSchema(integer)
   *
   * @returns {NumericSchema}
   */
  integer: (): NumericSchema => {
    return new NumericSchema('integer')
  },

  /**
   * Create BooleanSchema
   *
   * @returns {BaseSchema<boolean>}
   */
  boolean: () => {
    return new BaseSchema<boolean>('boolean')
  },

  /**
   * Create NullSchema
   *
   * @returns {BaseSchema<null>}
   */
  null: () => {
    return new BaseSchema<null>('null')
  },

  /**
   * Create ArraySchema
   *
   * @returns {ArraySchema}
   */
  array: (): ArraySchema => {
    return new ArraySchema()
  },

  /**
   * Create ArraySchema
   *
   * @returns {ArraySchema}
   */
  list: <T extends BaseSchema>(items: T) => {
    return new ArraySchema().items(items)
  },

  /**
   * Create ObjectSchema
   *
   * @returns {ObjectSchema}
   */
  object: (): ObjectSchema => {
    return new ObjectSchema()
  },

  /**
   * Create ObjectSchema
   *
   * @returns {ObjectSchema}
   */
  shape: <T extends Record<string, BaseSchema<any, boolean>>>(props: T, additional: boolean = false) => {
    let res = new ObjectSchema<Optional<{ [K in keyof T]: T[K]['shape'] }>>().additionalProperties(additional)
    for (const prop in props) res = res.prop(prop, props[prop])
    return res
  },

  /**
   * Create EnumSchema
   *
   * @returns {BaseSchema}
   */
  enum: <T extends Enumerable>(...args: T[]) => {
    return new BaseSchema<T>().enum(...args)
  },

  /**
   * Create ConstSchema
   *
   * @returns {BaseSchema}
   */
  const: <T extends Enumerable>(value: T) => {
    return new BaseSchema<T>().const(value)
  },

  /**
   * Create AnyOfSchema
   *
   * @returns {BaseSchema}
   */
  anyOf: <T extends BaseSchema[]>(...schemas: T) => {
    return new BaseSchema<T[number]['type']>().anyOf(...schemas)
  },

  /**
   * Create AllOfSchema
   *
   * @returns {BaseSchema}
   */
  allOf: <T extends BaseSchema[]>(...schemas: T) => {
    return new BaseSchema<T[number]['type']>().allOf(...schemas)
  },

  /**
   * Create OneOfSchema
   *
   * @returns {BaseSchema}
   */
  oneOf: <T extends BaseSchema[]>(...schemas: T) => {
    return new BaseSchema<T[number]['type']>().oneOf(...schemas)
  },

  /**
   * Create NotSchema
   *
   * @returns {BaseSchema}
   */
  not: <T extends BaseSchema>(schema: T) => {
    return new BaseSchema<any>().not(schema)
  },

  /**
   * Create { if: {}, then: {} } schema
   *
   * @returns {BaseSchema}
   */
  ifThen (ifClause: BaseSchema, thenClause: BaseSchema) {
    return new BaseSchema<any>().ifThen(ifClause, thenClause)
  },

  /**
   * Create { if: {}, then: {}, else: {} } schema
   *
   * @returns {BaseSchema}
   */
  ifThenElse (ifClause: BaseSchema, thenClause: BaseSchema, elseClause: BaseSchema) {
    return new BaseSchema<any>().ifThenElse(ifClause, thenClause, elseClause)
  },

  /**
   * Create empty schema
   *
   * @returns {BaseSchema<any>}
   */
  any: () => {
    return new BaseSchema()
  },

  /**
   * Create schema with given fragment
   *
   * @returns {BaseSchema}
   */
  raw: (fragment: Record<string, any>) => {
    return new BaseSchema().raw(fragment)
  },

  /**
   * Create schema with given $id
   *
   * @returns {BaseSchema}
   */
  id: (id: string) => {
    return new BaseSchema().id(id)
  },

  /**
   * Create schema with given $schema field
   *
   * @returns {BaseSchema}
   */
  schema: (schema: string) => {
    return new BaseSchema().schema(schema)
  },

  /**
   * Create schema with given $ref field
   *
   * @returns {BaseSchema}
   */
  ref: (ref: string) => {
    return new BaseSchema().ref(ref)
  },

  /**
   * Create schema with given title field
   *
   * @returns {BaseSchema}
   */
  title: (title: string) => {
    return new BaseSchema().title(title)
  },

  /**
   * Create schema with given description field
   *
   * @returns {BaseSchema}
   */
  description: (description: string) => {
    return new BaseSchema().description(description)
  },

  /**
   * Create schema with given examples field
   *
   * @returns {BaseSchema}
   */
  examples: (...examples: any[]) => {
    return new BaseSchema().examples(...examples)
  },

  /**
   * Create schema with given default field
   *
   * @returns {BaseSchema}
   */
  default: (def: any) => {
    return new BaseSchema().default(def)
  },

  /**
   * Create schema with given definitions[name] = definition field
   *
   * @returns {BaseSchema}
   */
  definition: (name: string, defintion: BaseSchema) => {
    return new BaseSchema().definition(name, defintion)
  },

  /**
   * Create schema for validating instanceOf data
   *
   * @returns {BaseSchema}
   */
  instanceOf: <T extends Class> (obj: T): BaseSchema<InstanceType<T>> => {
    return new BaseSchema<T>().instanceOf(obj)
  }
}
