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

export default class ArraySchema<T = any, R extends boolean = true> extends BaseSchema<T[], R, Readonly<ArrayJsonSchema>> {
  constructor () {
    super('array')
  }

  /**
   * This keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.
   * If "items" is a schema, validation succeeds if all elements in the array successfully validate against that schema.
   * If "items" is an array of schemas, validation succeeds if each element of the instance validates against the schema at the same position, if any.
   * Omitting this keyword has the same behavior as an empty schema.
   *
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.1
   *
   * @param {BaseSchema|BaseSchema[]} items
   *
   * @returns {ArraySchema}
   */
  items <P extends BaseSchema> (items: P | P[]): ArraySchema<P['type'], R> {
    return this.copyWith({ plain: { items: Array.isArray(items) ? items.map(el => el.plain) : items.plain } })
  }

  /**
   * This keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.
   *
   * @param {BaseSchema|boolean} items
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.2
   * @returns {ArraySchema}
   */
  additionalItems <P extends BaseSchema | boolean> (additional: P): P extends BaseSchema ? ArraySchema<T | P['type'], R> : this {
    return this.copyWith({ plain: { additionalItems: typeof additional === 'boolean' ? additional : (additional as Schema).plain } }) as any
  }

  /**
   * An array instance is valid against "contains" if at least one of its elements is valid against the given schema.
   *
   * @param {BaseSchema} value
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.2
   * @returns {ArraySchema}
   */
  contains <P extends BaseSchema> (contains: P): ArraySchema<T | P['type'], R> {
    return this.copyWith({ plain: { contains: contains.plain } })
  }

  /**
   * An array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.
   * Omitting this keyword has the same behavior as a value of 0.
   *
   * @param {number} minItems
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.4
   * @returns {ArraySchema}
   */
  minItems (minItems: number) {
    return this.copyWith({ plain: { minItems } })
  }

  /**
   * An array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.
   * Omitting this keyword has the same behavior as a value of 0.
   *
   * @param {number} maxItems
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.3
   * @returns {this}
   */
  maxItems (maxItems: number) {
    return this.copyWith({ plain: { maxItems } })
  }

  /**
   * If this keyword has boolean value false, the instance validates successfully.
   * If it has boolean value true, the instance validates successfully if all of its elements are unique.
   * Omitting this keyword has the same behavior as a value of false.
   *
   * @param {boolean} boolean
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.5
   * @returns {this}
   */
  uniqueItems (unique: boolean = true) {
    return this.copyWith({ plain: { uniqueItems: unique } })
  }

  /**
   * Make schema optional in {ObjectSchema}
   * @returns {ArraySchema<T, false>}
   */
  optional (): ArraySchema<T, false> {
    return this.copyWith({ isRequired: false }) as any
  }
}
