import BaseSchema, { BaseJsonSchema } from './base'

export interface AnyJsonSchema extends BaseJsonSchema {
}

export default class AnySchema<R extends boolean = true> extends BaseSchema<any, R, AnyJsonSchema> {
  plain: AnyJsonSchema = {}

  optional (): AnySchema<false> {
    this.isRequired = false
    return this as AnySchema<false>
  }

  required (): AnySchema<true> {
    this.isRequired = true
    return this as AnySchema<true>
  }
}
