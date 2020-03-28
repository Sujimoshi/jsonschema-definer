import BaseSchema, { BaseJsonSchema } from './base'
import { Schema } from '.'
import StringSchema from './string'

export interface ObjectJsonSchema extends BaseJsonSchema {
  type: 'object'
  properties?: Record<string, Schema['plain']>
  required?: string[]
  additionalProperties?: Schema['plain'] | boolean
  propertyNames?: StringSchema
  minProperties?: number
  maxProperties?: number
  dependencies?: Record<string, string[] | Schema['plain']>
  patternProperties?: Record<string, Schema['plain']>
}

export default class ObjectSchema<T extends {} = {}, R extends boolean = true> extends BaseSchema<T, R, ObjectJsonSchema> {
  plain: ObjectJsonSchema = { type: 'object' }

  prop <K extends string, S extends BaseSchema<any, boolean>> (name: K, schema: S): ObjectSchema<this['shape'] & { [P in K]: S['shape'] }> {
    this.plain.properties = { ...this.plain.properties, [name]: schema.plain }
    if (schema.isRequired) this.plain.required = [...this.plain.required || [], name]
    return this as any
  }

  additionalProperties (schema: BaseSchema | boolean) {
    this.plain.additionalProperties = typeof schema === 'boolean' ? schema : schema.plain
    return this
  }

  propertyNames (nameSchema: StringSchema) {
    this.plain.propertyNames = nameSchema
    return this
  }

  minProperties (number: number) {
    this.plain.minProperties = number
    return this
  }

  maxProperties (number: number) {
    this.plain.maxProperties = number
    return this
  }

  dependencies (deps: Record<string, string[] | BaseSchema>) {
    this.plain.dependencies = {}
    for (const dep in deps) {
      this.plain.dependencies[dep] = (deps[dep] as BaseSchema).isTyperSchema ? (deps[dep] as BaseSchema).plain : (deps[dep] as string[])
    }
    return this
  }

  patternProperties (props: Record<string, BaseSchema>) {
    this.plain.patternProperties = {}
    for (const prop in props) this.plain.patternProperties[prop] = props[prop].plain
    return this
  }

  optional (): ObjectSchema<T, false> {
    this.isRequired = false
    return this as ObjectSchema<T, false>
  }

  required (): ObjectSchema<T, true> {
    this.isRequired = true
    return this as ObjectSchema<T, true>
  }
}
