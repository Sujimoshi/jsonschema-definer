import BaseSchema from '../base'

describe('BaseSchema', () => {
  it('BaseSchema.prototype.optional', () => {
    const schema = new BaseSchema()
    expect(schema.isRequired).toEqual(true)
    expect(schema.optional().isRequired).toEqual(false)
  })
})
