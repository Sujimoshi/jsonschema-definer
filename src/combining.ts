import BaseSchema, { BaseJsonSchema } from './base'
import { Schema } from '.'

export interface OneOfJsonSchema extends BaseJsonSchema {
  oneOf: Schema['plain'][]
}

export interface AnyOfJsonSchema extends BaseJsonSchema {
  anyOf: Schema['plain'][]
}

export interface AllOfJsonSchema extends BaseJsonSchema {
  allOf: Schema['plain'][]
}

export interface NotJsonSchema extends BaseJsonSchema {
  not: Schema['plain'][]
}

type CombiningJsonSchema = OneOfJsonSchema | AnyOfJsonSchema | AllOfJsonSchema | NotJsonSchema

export default class CombiningSchema<T = any, R extends boolean = true> extends BaseSchema<T, R, CombiningJsonSchema> {
  plain: CombiningJsonSchema

  constructor (type: 'oneOf' | 'allOf' | 'anyOf' | 'not', ...schemas: BaseSchema<any>[]) {
    super();
    (this.plain as any)[type] = schemas.map(schema => schema.plain)
  }

  optional (): CombiningSchema<T, false> {
    this.isRequired = false
    return this as CombiningSchema<T, false>
  }

  required (): CombiningSchema<T, true> {
    this.isRequired = true
    return this as CombiningSchema<T, true>
  }
}
