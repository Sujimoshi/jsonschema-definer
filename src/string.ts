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

export default class StringSchema<R extends boolean = true> extends BaseSchema<string, R, Readonly<StringJsonSchema>> {
  constructor () {
    super('string')
  }

  contentMediaType (contentMediaType: string) {
    return this.copyWith({ plain: { contentMediaType } })
  }

  contentEncoding (contentEncoding: string) {
    return this.copyWith({ plain: { contentEncoding } })
  }

  format (format: string) {
    return this.copyWith({ plain: { format } })
  }

  minLength (minLength: number) {
    return this.copyWith({ plain: { minLength } })
  }

  maxLength (maxLength: number) {
    return this.copyWith({ plain: { maxLength } })
  }

  pattern (pattern: RegExp) {
    return this.copyWith({ plain: { pattern: pattern.toString().substr(1).replace(`/${pattern.flags}`, '') } })
  }

  optional (): StringSchema<false> {
    return this.copyWith({ isRequired: false }) as any
  }
}
