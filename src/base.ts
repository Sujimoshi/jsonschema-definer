import { Schema } from '.'

export type Enumerable = string | number | null | boolean | {} | any[]

export type Types = [
  ['boolean', boolean],
  ['null', null],
  ['array', any[]],
  ['object', {}],
  ['string', string],
  ['number', number],
  ['integer', number]
][number]

export interface BaseJsonSchema {
  type?: Types[0]
  $id?: string
  $ref?: string
  $schema?: string
  title?: string
  description?: string
  examples?: any[]
  default?: any
  definitions?: Record<string, Schema['plain']>
  enum?: Enumerable[]
  const?: Enumerable
  oneOf?: Schema['plain'][]
  anyOf?: Schema['plain'][]
  allOf?: Schema['plain'][]
  not?: Schema['plain'][]
}

export default class BaseSchema<T = any, R extends boolean = true, S extends BaseJsonSchema = BaseJsonSchema> {
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

  definition (name: string, definition: BaseSchema) {
    this.definitions = { ...this.definitions, [name]: definition.plain }
    return this
  }

  raw (fragment: object) {
    this.plain = { ...this.plain, ...fragment }
    return this
  }

  enum <C extends BaseSchema<T>, P extends T> (this: C, ...values: P[]): C & BaseSchema<P> {
    this.plain = { ...this.plain, enum: values }
    return this as any
  }

  const <C extends BaseSchema<T>, P extends T> (this: C, value: P): C & BaseSchema<P> {
    this.plain = { ...this.plain, const: value }
    return this as any
  }

  anyOf <C extends BaseSchema<T>, P extends BaseSchema<T>[]> (this: C, ...schemas: P): C & P[number] {
    this.plain = { ...this.plain, anyOf: schemas.map(schema => schema.plain) }
    return this
  }

  allOf <C extends BaseSchema<T>, P extends BaseSchema<T>[]> (this: C, ...schemas: P) : C & P[number] {
    this.plain = { ...this.plain, allOf: schemas.map(schema => schema.plain) }
    return this
  }

  oneOf <C extends BaseSchema<T>, P extends BaseSchema<T>[]> (this: C, ...schemas: P) : C & P[number] {
    this.plain = { ...this.plain, oneOf: schemas.map(schema => schema.plain) }
    return this
  }

  not <P extends BaseSchema[]> (...schemas: P) {
    this.plain = { ...this.plain, not: schemas.map(schema => schema.plain) }
    return this
  }

  optional (): BaseSchema<T, false> {
    this.isRequired = false
    return this as any
  }

  required (): BaseSchema<T, true> {
    this.isRequired = true
    return this as any
  }

  as <T extends Types[0]> (type?: T): BaseSchema<Extract<Types, [T, any]>[1]> {
    this.plain.type = type
    return this as any
  }

  valueOf (): S {
    return {
      ...this.plain,
      ...(this.$schema && { $schema: this.$schema }),
      ...(this.definitions && { definitions: this.definitions })
    }
  }
}
