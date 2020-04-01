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

  /**
   *  The value of this property must be a media type, as defined by RFC 2046 [RFC2046].
   *  This property defines the media type of instances which this schema defines.
   *
   * @param {string} contentMediaType
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.8.3
   * @returns {StringSchema}
   */
  contentMediaType (contentMediaType: string) {
    return this.copyWith({ plain: { contentMediaType } })
  }

  /**
   *  If the instance value is a string, this property defines that the string SHOULD
   *  be interpreted as binary data and decoded using the encoding named by this property.
   *  RFC 2045, Sec 6.1 [RFC2045] lists the possible values for this property.
   *
   * @param {string} contentEncoding
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.8.3
   * @returns {StringSchema}
   */
  contentEncoding (contentEncoding: string) {
    return this.copyWith({ plain: { contentEncoding } })
  }

  /**
   * A string value can be RELATIVE_JSON_POINTER, JSON_POINTER, UUID, REGEX, IPV6, IPV4, HOSTNAME, EMAIL, URL, URI_TEMPLATE, URI_REFERENCE, URI, TIME, DATE,
   *
   * @param {string} format
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.7.3
   * @returns {StringSchema}
   */
  format (format: string) {
    return this.copyWith({ plain: { format } })
  }

  /**
   * A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword.
   * The length of a string instance is defined as the number of its characters as defined by RFC 7159 [RFC7159].
   *
   * @param {number} minLength
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.2
   * @returns {StringSchema}
   */
  minLength (minLength: number) {
    return this.copyWith({ plain: { minLength } })
  }

  /**
   * A string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword.
   * The length of a string instance is defined as the number of its characters as defined by RFC 7159 [RFC7159].
   *
   * @param {number} maxLength
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.2
   * @returns {StringSchema}
   */
  maxLength (maxLength: number) {
    return this.copyWith({ plain: { maxLength } })
  }

  /**
   *  This string SHOULD be a valid regular expression, according to the ECMA 262 regular expression dialect.
   *  A string instance is considered valid if the regular expression matches the instance successfully.
   *
   * @param {string} pattern
   * @reference https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.3
   * @returns {StringSchema}
   */
  pattern (pattern: RegExp) {
    return this.copyWith({ plain: { pattern: pattern.toString().substr(1).replace(`/${pattern.flags}`, '') } })
  }

  /**
   * Make schema optional in {ObjectSchema}
   * @returns {StringSchema}
   */
  optional (): StringSchema<false> {
    return this.copyWith({ isRequired: false }) as any
  }
}
