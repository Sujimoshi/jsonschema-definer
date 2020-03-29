import BaseSchema, { BaseJsonSchema } from './base'

export interface NumericJsonSchema extends BaseJsonSchema {
  type: 'number' | 'integer'
  minimum?: number
  maximum?: number
  exclusiveMinimum?: boolean
  exclusiveMaximum?: boolean
  multipleOf?: number
}

export default class NumericSchema<R extends boolean = true> extends BaseSchema<number, R, Readonly<NumericJsonSchema>> {
  constructor (type: NumericJsonSchema['type']) {
    super(type)
  }

  minimum (num: number, exclusive: boolean = false) {
    return this.copyWith({ plain: { minimum: num, exclusiveMinimum: exclusive } })
  }

  maximum (num: number, exclusive: boolean = false) {
    return this.copyWith({ plain: { maximum: num, exclusiveMaximum: exclusive } })
  }

  multipleOf (num: number) {
    return this.copyWith({ plain: { multipleOf: num } })
  }

  optional (): NumericSchema<false> {
    return this.copyWith({ isRequired: false }) as any
  }
}
