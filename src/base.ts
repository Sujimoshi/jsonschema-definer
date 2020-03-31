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

  /**
   * It defines a URI for the schema, and the base URI that other URI references within the schema are resolved against.
   *
   * {@link https://json-schema.org/latest/json-schema-core.html#id-keyword|reference}
   * @param {string} $id - an #id
   * @returns {this}
   */
  id ($id: string) {
    return this.copyWith({ plain: { $id } })
  }

  /**
   * The value must be a valid id e.g. #properties/foo
   *
   * @param {string} ref
   * @returns {this}
   */
  ref ($ref: string) {
    return this.copyWith({ plain: { $ref } })
  }

  /**
   * Set $schema property
   *
   * @param {string} $schema
   */
  schema ($schema: string) {
    return this.copyWith({ $schema })
  }

  /**
   * It can be used to decorate a user interface with information about the data produced by this user interface. A title will preferably be short.
   *
   * {@link https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.1|reference}
   * @param {string} title
   * @returns {this}
   */
  title (title: string) {
    return this.copyWith({ plain: { title } })
  }

  /**
   * It can be used to decorate a user interface with information about the data
   * produced by this user interface. A description provides explanation about
   * the purpose of the instance described by the schema.
   *
   * {@link https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.1|reference}
   * @param {string} description
   * @returns {this}
   */
  description (description: string) {
    return this.copyWith({ plain: { description } })
  }

  /**
   * The value of this keyword MUST be an array.
   * There are no restrictions placed on the values within the array.
   *
   * {@link https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.4|reference}
   * @param {any[]} examples
   * @returns {this}
   */
  examples (...examples: T[]) {
    return this.copyWith({ plain: { examples } })
  }

  /**
   * There are no restrictions placed on the value of this keyword.
   *
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.2}
   * @param {T} def
   * @returns {this}
   */
  default (def: T) {
    return this.copyWith({ plain: { default: def } })
  }

  /**
   * The "definitions" keywords provides a standardized location for schema authors to inline re-usable JSON Schemas into a more general schema.
   * There are no restrictions placed on the values within the array.
   *
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.9}
   * @param {string} name
   * @param {BaseSchema} props
   * @returns {this}
   */
  definition (name: string, definition: BaseSchema) {
    return this.copyWith({ definitions: { ...this.definitions, [name]: definition.plain } })
  }

  /**
   * Because the differences between JSON Schemas and Open API (Swagger)
   * it can be handy to arbitrary modify the schema injecting a fragment
   *
   * * Examples:
   * - S.number().raw({ nullable:true })
   * - S.string().format('date').raw({ formatMaximum: '2020-01-01' })
   *
   * @param {string} fragment an arbitrary JSON Schema to inject
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.3}
   * @returns {this}
   */
  raw (fragment: Record<string, any>) {
    return this.copyWith({ plain: { ...fragment } }) as any
  }

  /**
   * The value of this keyword MUST be an array. This array SHOULD have at least one element. Elements in the array SHOULD be unique.
   *
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1.2}
   * @param values
   * @returns {this}
   */
  enum <P extends T> (...values: P[]): BaseSchema<P> {
    return this.copyWith({ plain: { enum: values } }) as any
  }

  /**
   * The value of this keyword MAY be of any type, including null.
   *
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1.3}
   * @param value
   * @returns {this}
   */
  const <P extends T> (value: P): BaseSchema<P> {
    return this.copyWith({ plain: { const: value } }) as any
  }

  /**
   * It  MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.
   *
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.7.3}
   * @param {array} schemas
   * @returns {this}
   */
  anyOf <P extends BaseSchema<T>[]> (...schemas: P): BaseSchema<P[number]['type']> {
    return this.copyWith({ plain: { anyOf: schemas.map(schema => schema.plain) } }) as any
  }

  /**
   * It MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.
   *
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.7.1}
   * @param {array} schemas
   * @returns {this}
   */
  allOf <P extends BaseSchema<T>[]> (...schemas: P): BaseSchema<P[number]['type']> {
    return this.copyWith({ plain: { allOf: schemas.map(schema => schema.plain) } }) as any
  }

  /**
   * It MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.
   *
   * @param {array} schemas
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.7.2}
   * @returns {this}
   */
  oneOf <P extends BaseSchema<T>[]> (...schemas: P): BaseSchema<P[number]['type']> {
    return this.copyWith({ plain: { oneOf: schemas.map(schema => schema.plain) } }) as any
  }

  /**
   * It MUST be a valid JSON Schema.
   *
   * @param {BaseSchema} not
   * @returns {this}
   */
  not <P extends BaseSchema> (not: P): this {
    return this.copyWith({ plain: { not: not.plain } })
  }

  /**
   * Should be used only with ObjectSchema. By default all properties in Object Schema are required. This will make them optional
   */
  optional (): BaseSchema<T, false> {
    return this.copyWith({ isRequired: false }) as any
  }

  /**
   * This validation outcome of this keyword's subschema has no direct effect on the overall validation result.
   * Rather, it controls which of the "then" or "else" keywords are evaluated.
   * When "if" is present, and the instance successfully validates against its subschema, then
   * validation succeeds against this keyword if the instance also successfully validates against this keyword's subschema.
   *
   * @param {BaseSchema} ifClause
   * @param {BaseSchema} thenClause
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.6.1}
   * @returns {this}
   */
  ifThen (ifClause: BaseSchema, thenClause: BaseSchema) {
    return this.copyWith({ plain: { if: ifClause.plain, then: thenClause.plain } })
  }

  /**
   * When "if" is present, and the instance fails to validate against its subschema,
   * then validation succeeds against this keyword if the instance successfully validates against this keyword's subschema.
   *
   * @param {BaseSchema} ifClause
   * @param {BaseSchema} thenClause
   * @param {BaseSchema} elseClause
   * {@link reference|https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.6.1}
   * @returns {this}
   */
  ifThenElse (ifClause: BaseSchema, thenClause: BaseSchema, elseClause: BaseSchema) {
    return this.copyWith({ plain: { if: ifClause.plain, then: thenClause.plain, else: elseClause.plain } })
  }

  /**
   * Check the instance of of provadied value. Use ajv custom keywords. Notice: It compare using ObjectInstance.constructor.name and Object.name
   *
   * @param {Class} Class
   */
  instanceOf <P extends Class> (Class: P): BaseSchema<InstanceType<P>> {
    return this.copyWith({ plain: { instanceOf: Class.name } }) as any
  }

  /**
   * Validate provided data with current schema using ajv
   *
   * @param {T extends Class ? InstanceType<T> : T} data
   */
  validate (data: T extends Class ? InstanceType<T> : T): [boolean | PromiseLike<any>, ErrorObject[] | null | undefined] {
    return [BaseSchema.ajv.validate(this.valueOf(), data), BaseSchema.ajv.errors]
  }

  /**
   * Make copy of current schema with modified values
   *
   * @param modifyObject
   */
  copyWith (modifyObject: Partial<BaseSchema & { plain: Partial<Schema['plain']> }>): this {
    return Object.assign(Object.create(this.constructor.prototype), { ...this, ...modifyObject, plain: { ...this.plain, ...modifyObject.plain } })
  }

  /**
   * It returns all the schema values
   *
   * @returns {S}
   */
  valueOf (): S {
    return {
      ...this.plain,
      ...(this.$schema && { $schema: this.$schema }),
      ...(this.definitions && { definitions: this.definitions })
    }
  }
}
