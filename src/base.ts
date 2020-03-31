import { Schema } from '.'
import Ajv, { ErrorObject } from 'ajv'

export type Enumerable = boolean | null | string | number | Record<string, any> | Array<any>

export interface BaseJsonSchema {
  type?: 'boolean' | 'null' | 'array' | 'object' | 'string' | 'number' | 'integer'
  $id?: string
  $ref?: string
  $schema?: string
  title?: string
  description?: string
  examples?: any[]
  default?: any
  definitions?: Record<string, Schema['plain']>
  enum?: Enumerable
  const?: Enumerable
  oneOf?: Schema['plain'][]
  anyOf?: Schema['plain'][]
  allOf?: Schema['plain'][]
  not?: Schema['plain']
  if?: Schema['plain']
  then?: Schema['plain']
  else?: Schema['plain']
  instanceOf?: string
}

export type Class<T = any> = { new (): T, prototype: T, name: string }

export default class BaseSchema<T = any, R extends boolean = true, S extends BaseJsonSchema = Readonly<BaseJsonSchema>> {
  static ajv = new Ajv().addKeyword('instanceOf', {
    validate: (value: string, data: any) => value === data.constructor.name
  })

  readonly type: T
  readonly shape: R extends true ? T : T | undefined
  readonly plain: S = {} as S
  readonly isRequired: boolean = true
  readonly isFluentSchema = true
  readonly $schema: string = 'http://json-schema.org/draft-07/schema#'
  readonly definitions: Record<string, Schema['plain']>

  constructor (type?: S['type']) {
    if (type) (this.plain as S).type = type
  }

  id ($id: string) {
    return this.copyWith({ plain: { $id } })
  }

  ref ($ref: string) {
    return this.copyWith({ plain: { $ref } })
  }

  schema ($schema: string) {
    return this.copyWith({ $schema })
  }

  title (title: string) {
    return this.copyWith({ plain: { title } })
  }

  description (description: string) {
    return this.copyWith({ plain: { description } })
  }

  examples (...examples: any[]) {
    return this.copyWith({ plain: { examples } })
  }

  default (def: T) {
    return this.copyWith({ plain: { default: def } })
  }

  definition (name: string, definition: BaseSchema) {
    return this.copyWith({ definitions: { ...this.definitions, [name]: definition.plain } })
  }

  raw (fragment: Record<string, any>) {
    return this.copyWith({ plain: { ...fragment } }) as any
  }

  enum <P extends T> (...values: P[]): BaseSchema<P> {
    return this.copyWith({ plain: { enum: values } }) as any
  }

  const <P extends T> (value: P): BaseSchema<P> {
    return this.copyWith({ plain: { const: value } }) as any
  }

  anyOf <P extends BaseSchema<T>[]> (...schemas: P): BaseSchema<P[number]['type']> {
    return this.copyWith({ plain: { anyOf: schemas.map(schema => schema.plain) } }) as any
  }

  allOf <P extends BaseSchema<T>[]> (...schemas: P): BaseSchema<P[number]['type']> {
    return this.copyWith({ plain: { allOf: schemas.map(schema => schema.plain) } }) as any
  }

  oneOf <P extends BaseSchema<T>[]> (...schemas: P): BaseSchema<P[number]['type']> {
    return this.copyWith({ plain: { oneOf: schemas.map(schema => schema.plain) } }) as any
  }

  not <P extends BaseSchema> (not: P): this {
    return this.copyWith({ plain: { not: not.plain } })
  }

  optional (): BaseSchema<T, false> {
    return this.copyWith({ isRequired: false }) as any
  }

  ifThen (ifClause: BaseSchema, thenClause: BaseSchema) {
    return this.copyWith({ plain: { if: ifClause.plain, then: thenClause.plain } })
  }

  ifThenElse (ifClause: BaseSchema, thenClause: BaseSchema, elseClause: BaseSchema) {
    return this.copyWith({ plain: { if: ifClause.plain, then: thenClause.plain, else: elseClause.plain } })
  }

  instanceOf <P extends Class> (Class: P): BaseSchema<InstanceType<P>> {
    return this.copyWith({ plain: { instanceOf: Class.name } }) as any
  }

  validate (data: T extends Class ? InstanceType<T> : T): [boolean | PromiseLike<any>, ErrorObject[] | null | undefined] {
    return [BaseSchema.ajv.validate(this.valueOf(), data), BaseSchema.ajv.errors]
  }

  copyWith (modifyObject: Partial<BaseSchema & { plain: Partial<Schema['plain']> }>): this {
    return Object.assign(Object.create(this.constructor.prototype), { ...this, ...modifyObject, plain: { ...this.plain, ...modifyObject.plain } })
  }

  valueOf (): S {
    return {
      ...this.plain,
      ...(this.$schema && { $schema: this.$schema }),
      ...(this.definitions && { definitions: this.definitions })
    }
  }
}
