import StringSchema from '../string'

describe('StringSchema', () => {
  it('StringSchema.prototype.optional', () => {
    const schema = new StringSchema()
    expect(schema.isRequired).toEqual(true)
    expect(schema.optional().isRequired).toEqual(false)
  })

  it('StringSchema.prototype.contentMediaType', () => {
    const schema = new StringSchema().contentMediaType('application/json')
    expect(schema.valueOf().contentMediaType).toEqual('application/json')
  })

  it('StringSchema.prototype.contentEncoding', () => {
    const schema = new StringSchema().contentEncoding('binary')
    expect(schema.valueOf().contentEncoding).toEqual('binary')
  })

  it('StringSchema.prototype.format', () => {
    const schema = new StringSchema().format('date-time')
    expect(schema.validate(new Date().toISOString())[0]).toEqual(true)
    expect(schema.validate('some')[0]).toEqual(false)
  })

  it('StringSchema.prototype.minLength', () => {
    const schema = new StringSchema().minLength(2)
    expect(schema.validate('some')[0]).toEqual(true)
    expect(schema.validate('s')[0]).toEqual(false)
  })

  it('StringSchema.prototype.maxLength', () => {
    const schema = new StringSchema().maxLength(2)
    expect(schema.validate('some')[0]).toEqual(false)
    expect(schema.validate('s')[0]).toEqual(true)
  })

  it('StringSchema.prototype.pattern', () => {
    const schema = new StringSchema().pattern(/some/)
    expect(schema.validate('some')[0]).toEqual(true)
    expect(schema.validate('s')[0]).toEqual(false)
  })
})
