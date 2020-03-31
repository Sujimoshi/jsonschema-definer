import BaseSchema, { BaseJsonSchema } from './base'

export interface NumericJsonSchema extends BaseJsonSchema {
  type: 'number' | 'integer'
  minimum?: number
  maximum?: number
  exclusiveMinimum?: number
  exclusiveMaximum?: number
  multipleOf?: number
}

export default class NumericSchema<R extends boolean = true> extends BaseSchema<number, R, Readonly<NumericJsonSchema>> {
  constructor (type: NumericJsonSchema['type']) {
    super(type)
  }

  minimum (minimum: number, exclusive: boolean = false) {
    return this.copyWith({ plain: exclusive ? { exclusiveMinimum: minimum } : { minimum } })
  }

  maximum (maximum: number, exclusive: boolean = false) {
    return this.copyWith({ plain: exclusive ? { exclusiveMaximum: maximum } : { maximum } })
  }

  multipleOf (num: number) {
    return this.copyWith({ plain: { multipleOf: num } })
  }

  optional (): NumericSchema<false> {
    return this.copyWith({ isRequired: false }) as any
  }
}
