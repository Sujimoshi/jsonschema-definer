import { Schema } from '.'
import EnumSchema from './enum'
import ConstSchema from './const'
import CombiningSchema from './combining'

export interface BaseJsonSchema {
  $id?: string
  $ref?: string
  $schema?: string
  title?: string
  description?: string
  examples?: any[]
  default?: any
  definitions?: Record<string, Schema['plain']>
}

export default class BaseSchema<T = any, R extends boolean = boolean, S extends BaseJsonSchema = BaseJsonSchema> {
  type: T
  shape: R extends true ? T : T | undefined
  plain: S = {} as S
  isRequired: boolean = true
  isTyperSchema = true
  $schema = 'http://json-schema.org/draft-07/schema#'
  definitions: Record<string, Schema['plain']>

  id (id: string) {
    this.plain.$id = id
    return this
  }

  ref (ref: string) {
    this.plain.$ref = ref
    return this
  }

  schema (schema: string) {
    this.$schema = schema
  }

  title (title: string) {
    this.plain.title = title
    return this
  }

  description (description: string) {
    this.plain.description = description
    return this
  }

  examples (...examples: any[]) {
    this.plain.examples = examples
    return this
  }

  default (def: T) {
    this.plain.default = def
    return this
  }

  definition (name: string, definition: Schema) {
    this.definitions = { ...this.definitions, [name]: definition.plain }
    return this
  }

  raw (fragment: object) {
    this.plain = { ...this.plain, ...fragment }
    return this
  }

  enum <C extends BaseSchema<T>, P extends T> (this: C, ...values: P[]): C & EnumSchema<P> {
    this.plain = { ...this.plain, ...new EnumSchema(...values).plain }
    return this as any
  }

  const <C extends BaseSchema<T>, P extends T> (this: C, value: P): C & ConstSchema<P> {
    this.plain = { ...this.plain, ...new ConstSchema(value).plain }
    return this as any
  }

  anyOf <C extends BaseSchema<T>, P extends BaseSchema<T>[]> (this: C, ...schemas: P): C & P[number] {
    this.plain = { ...this.plain, ...new CombiningSchema('anyOf', ...schemas).plain }
    return this
  }

  allOf <C extends BaseSchema<T>, P extends BaseSchema<T>[]> (this: C, ...schemas: P) : C & P[number] {
    this.plain = { ...this.plain, ...new CombiningSchema('allOf', ...schemas).plain }
    return this
  }

  oneOf <C extends BaseSchema<T>, P extends BaseSchema<T>[]> (this: C, ...schemas: P) : C & P[number] {
    this.plain = { ...this.plain, ...new CombiningSchema('oneOf', ...schemas).plain }
    return this
  }

  not <P extends Schema[]> (...schemas: P) {
    this.plain = { ...this.plain, ...new CombiningSchema('not', ...schemas).plain }
    return this
  }

  valueOf (): S {
    return {
      ...this.plain,
      ...(this.$schema && { $schema: this.$schema }),
      ...(this.definitions && { definitions: this.definitions })
    }
  }
}
