import BaseSchema, { BaseJsonSchema } from './base'

export interface StringJsonSchema extends BaseJsonSchema {
  type: 'string'
  minLength?: number
  maxLength?: number
  pattern?: string
  format?: string
  contentMediaType?: string
  contentEncoding?: string
}

export default class StringSchema<R extends boolean = true> extends BaseSchema<string, R, StringJsonSchema> {
  plain: StringJsonSchema = { type: 'string' }

  contentMediaType (type: string) {
    this.plain.contentMediaType = type
    return this
  }

  contentEncoding (encoding: string) {
    this.plain.contentEncoding = encoding
    return this
  }

  format (str: string) {
    this.plain.format = str
    return this
  }

  minLength (num: number) {
    this.plain.minLength = num
    return this
  }

  maxLength (num: number) {
    this.plain.maxLength = num
    return this
  }

  pattern (regexp: RegExp) {
    this.plain.pattern = regexp.toString()
    return this
  }

  required (): StringSchema<true> {
    this.isRequired = true
    return this as StringSchema<true>
  }

  optional (): StringSchema<false> {
    this.isRequired = false
    return this as StringSchema<false>
  }
}
