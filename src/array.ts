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

export default class ArraySchema<T extends any = any, R extends boolean = true> extends BaseSchema<T[], R, Readonly<ArrayJsonSchema>> {
  constructor () {
    super('array')
  }

  items <P extends Schema> (items: P | P[]): ArraySchema<P['type'], R> {
    return this.copyWith({ plain: { items: Array.isArray(items) ? items.map(el => el.plain) : items.plain } })
  }

  additionalItems (additional: Schema | Schema[] | boolean) {
    return this.copyWith({
      plain: {
        additionalItems: Array.isArray(additional) ? additional.map(el => el.plain)
          : typeof additional === 'boolean' ? additional
            : additional.plain
      }
    })
  }

  contains (contains: Schema) {
    return this.copyWith({ plain: { contains: contains.plain } })
  }

  minItems (num: number) {
    return this.copyWith({ plain: { minItems: num } })
  }

  maxItems (num: number) {
    return this.copyWith({ plain: { maxItems: num } })
  }

  uniqueItems (unique: boolean = true) {
    return this.copyWith({ plain: { uniqueItems: unique } })
  }

  optional (): ArraySchema<T, false> {
    return this.copyWith({ isRequired: false }) as any
  }
}
