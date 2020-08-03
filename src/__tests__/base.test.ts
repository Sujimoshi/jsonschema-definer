import BaseSchema from '../base'

describe('BaseSchema', () => {
  it('BaseSchema.prototype.optional', () => {
    const schema = new BaseSchema()
    expect(schema.isRequired).toEqual(true)
    expect(schema.optional().isRequired).toEqual(false)
  })

  it('BaseSchema.prototype.ensure', () => {
    const schema = new BaseSchema().enum('some', 'any')
    expect(() => schema.ensure('fail' as any)).toThrowError()
    expect(() => schema.ensure('some' as any)).not.toThrowError()
  })
})
