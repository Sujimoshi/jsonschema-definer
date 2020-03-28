import BaseSchema, { BaseJsonSchema } from './base'

export interface NullJsonSchema extends BaseJsonSchema {
  type: 'null'
}

export default class NullSchema<R extends boolean = true> extends BaseSchema<null, R, NullJsonSchema> {
  plain: NullJsonSchema = { type: 'null' }

  optional (): NullSchema<false> {
    this.isRequired = false
    return this as NullSchema<false>
  }

  required (): NullSchema<true> {
    this.isRequired = true
    return this as NullSchema<true>
  }
}
