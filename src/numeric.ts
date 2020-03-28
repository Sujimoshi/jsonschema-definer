import BaseSchema, { BaseJsonSchema } from './base'

export interface NumericJsonSchema extends BaseJsonSchema {
  type: 'number' | 'integer'
  minimum?: number
  maximum?: number
  exclusiveMinimum?: boolean
  exclusiveMaximum?: boolean
  multipleOf?: number
}

export default class NumericSchema<R extends boolean = true> extends BaseSchema<number, R, NumericJsonSchema> {
  constructor (type: 'number' | 'integer') {
    super()
    this.plain.type = type
  }

  minimum (num: number, exclusive?: true) {
    this.plain.minimum = num
    if (exclusive) this.plain.exclusiveMinimum = true
    return this
  }

  maximum (num: number, exclusive?: true) {
    this.plain.maximum = num
    if (exclusive) this.plain.exclusiveMaximum = true
    return this
  }

  multipleOf (num: number) {
    this.plain.multipleOf = num
    return this
  }

  required (): NumericSchema<true> {
    this.isRequired = true
    return this as NumericSchema<true>
  }

  optional (): NumericSchema<false> {
    this.isRequired = false
    return this as NumericSchema<false>
  }
}
