import BaseSchema, { BaseJsonSchema } from './base'

export type Enumerable = string | number | null | boolean | {} | any[]

export interface EnumJsonSchema extends BaseJsonSchema {
  enum: Enumerable[]
}

export default class EnumSchema<T extends Enumerable = Enumerable, R extends boolean = true> extends BaseSchema<T, R, EnumJsonSchema> {
  plain: EnumJsonSchema

  constructor (...args: T[]) {
    super()
    this.plain.enum = args
  }

  optional (): EnumSchema<T, false> {
    this.isRequired = false
    return this as EnumSchema<T, false>
  }

  required (): EnumSchema<T, true> {
    this.isRequired = true
    return this as EnumSchema<T, true>
  }
}
