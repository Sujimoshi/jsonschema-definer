import BaseSchema, { BaseJsonSchema } from './base'
import { Schema } from '.'
import StringSchema from './string'

export interface ObjectJsonSchema extends BaseJsonSchema {
  type: 'object'
  properties?: Record<string, Schema['plain']>
  required?: string[]
  additionalProperties?: Schema['plain'] | boolean
  propertyNames?: StringSchema['plain']
  minProperties?: number
  maxProperties?: number
  dependencies?: Record<string, string[] | Schema['plain']>
  patternProperties?: Record<string, Schema['plain']>
  instanceof?: string
}

export default class ObjectSchema<T extends Record<string, any> = {}, R extends boolean = true> extends BaseSchema<T, R, Readonly<ObjectJsonSchema>> {
  constructor () {
    super('object')
  }

  prop <K extends string, S extends BaseSchema<any, boolean>> (name: K, schema: S) {
    return this.copyWith({
      plain: {
        properties: { ...this.plain.properties, [name]: schema.plain },
        ...(schema.isRequired && { required: [...this.plain.required || [], name] })
      }
    })
  }

  additionalProperties (schema: BaseSchema | boolean) {
    return this.copyWith({ plain: { additionalProperties: typeof schema === 'boolean' ? schema : schema.plain } })
  }

  propertyNames (nameSchema: StringSchema) {
    return this.copyWith({ plain: { propertyNames: nameSchema.plain } })
  }

  minProperties (number: number) {
    return this.copyWith({ plain: { minProperties: number } })
  }

  maxProperties (number: number) {
    return this.copyWith({ plain: { maxProperties: number } })
  }

  dependencies (deps: Record<string, string[] | BaseSchema>) {
    const dependencies: ObjectJsonSchema['dependencies'] = {}
    for (const dep in deps) {
      dependencies[dep] = Array.isArray(deps[dep]) ? (deps[dep] as string[]) : (deps[dep] as BaseSchema).plain
    }
    return this.copyWith({ plain: { dependencies } })
  }

  patternProperties (props: Record<string, BaseSchema>) {
    const patternProperties: ObjectJsonSchema['patternProperties'] = {}
    for (const prop in props) patternProperties[prop] = props[prop].plain
    return this.copyWith({ plain: { patternProperties } })
  }

  required <S extends string[]> (...fields: S): ObjectSchema<O.Required<T, S[number]>, R> {
    return this.copyWith({ plain: { required: fields } }) as any
  }

  optional (): ObjectSchema<T, false> {
    return this.copyWith({ isRequired: false }) as any
  }

  partial (): ObjectSchema<{}, R> {
    const plain = (function partial (schema: any) {
      for (const key in schema.properties || {}) {
        if (schema.properties[key].type === 'object') {
          schema = { ...schema, properties: { ...schema.properties, [key]: partial({ ...schema.properties[key] }) } }
        }
      }
      const { required, ...partialSchema } = schema // eslint-disable-line @typescript-eslint/no-unused-vars
      return partialSchema
    })(this.valueOf())
    return Object.assign(Object.create(this.constructor.prototype), { ...this, plain })
  }
}
