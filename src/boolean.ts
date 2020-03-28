import BaseSchema, { BaseJsonSchema } from './base'

export interface BooleanJsonSchema extends BaseJsonSchema {
  type: 'boolean'
}

export default class BooleanSchema<R extends boolean = true> extends BaseSchema<number, R, BooleanJsonSchema> {
  plain: BooleanJsonSchema = { type: 'boolean' }

  optional (): BooleanSchema<false> {
    this.isRequired = false
    return this as BooleanSchema<false>
  }

  required (): BooleanSchema<true> {
    this.isRequired = true
    return this as BooleanSchema<true>
  }
}
