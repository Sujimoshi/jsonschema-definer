import BaseSchema, { BaseJsonSchema } from './base'

export type Constantable = string | number | null | boolean | {} | any[]

export interface ConstJsonSchema extends BaseJsonSchema {
  const: Constantable
}

export default class ConstSchema<T extends Constantable = Constantable, R extends boolean = true> extends BaseSchema<T, R, ConstJsonSchema> {
  plain: ConstJsonSchema

  constructor (value: T) {
    super()
    this.plain.const = value
  }

  optional (): ConstSchema<T, false> {
    this.isRequired = false
    return this as ConstSchema<T, false>
  }

  required (): ConstSchema<T, true> {
    this.isRequired = true
    return this as ConstSchema<T, true>
  }
}
