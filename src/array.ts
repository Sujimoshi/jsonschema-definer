import BaseSchema, { BaseJsonSchema } from './base'
import { Schema } from '.'

export interface ArrayJsonSchema extends BaseJsonSchema {
  type: 'array'
  uniqueItems?: boolean
  minItems?: number
  maxItems?: number
  additionalItems?: Schema['plain'] | Schema['plain'][] | boolean
  contains?: Schema['plain']
  items?: Schema['plain'] | Schema['plain'][]
}

export default class ArraySchema<T extends any = any, R extends boolean = true> extends BaseSchema<T[], R, ArrayJsonSchema> {
  plain: ArrayJsonSchema = { type: 'array' }

  items <P extends Schema> (items: P | P[]): ArraySchema<P['type'], R> {
    this.plain.items = Array.isArray(items) ? items.map(el => el.plain) : items.plain
    return this
  }

  additionalItems (additional: Schema | Schema[] | boolean) {
    this.plain.additionalItems = Array.isArray(additional) ? additional.map(el => el.plain)
      : typeof additional === 'boolean' ? additional
        : additional.plain
    return this
  }

  contains (contains: Schema) {
    this.plain.contains = contains.plain
    return this
  }

  minItems (num: number) {
    this.plain.minItems = num
    return this
  }

  maxItems (num: number) {
    this.plain.maxItems = num
    return this
  }

  uniqueItems () {
    this.plain.uniqueItems = true
    return this
  }

  optional (): ArraySchema<T, false> {
    this.isRequired = false
    return this as ArraySchema<T, false>
  }

  required (): ArraySchema<T, true> {
    this.isRequired = true
    return this as ArraySchema<T, true>
  }
}
