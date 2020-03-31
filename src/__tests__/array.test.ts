import ArraySchema from '../array'
import S from '../'

describe('ArraySchema', () => {
  it('ArraySchema.prototype.optional', () => {
    const schema = new ArraySchema()
    expect(schema.isRequired).toEqual(true)
    expect(schema.optional().isRequired).toEqual(false)
  })

  it('ArraySchema.prototype.additionalItems', () => {
    const schema = new ArraySchema().items([S.string(), S.number()])
    expect(schema.validate(['some', 0, 0])[0]).toEqual(true)
    expect(schema.additionalItems(false).validate(['some', 0, 0])[0]).toEqual(false)
    expect(schema.additionalItems(S.string()).validate(['some', 0, 'any'])[0]).toEqual(true)
  })

  it('ArraySchema.prototype.contains', () => {
    const schema = new ArraySchema().contains(S.const('some'))
    expect(schema.validate(['some', 0, 0])[0]).toEqual(true)
    expect(schema.validate(['any', 0, 0])[0]).toEqual(false)
  })

  it('ArraySchema.prototype.minItems', () => {
    const schema = new ArraySchema().minItems(1)
    expect(schema.validate(['some', 0, 0])[0]).toEqual(true)
    expect(schema.validate([])[0]).toEqual(false)
  })

  it('ArraySchema.prototype.maxItems', () => {
    const schema = new ArraySchema().maxItems(1)
    expect(schema.validate(['some', 0, 0])[0]).toEqual(false)
    expect(schema.validate([])[0]).toEqual(true)
  })

  it('ArraySchema.prototype.unique', () => {
    const schema = new ArraySchema().uniqueItems()
    expect(schema.validate(['some', 0])[0]).toEqual(true)
    expect(schema.validate([1, 1])[0]).toEqual(false)
  })
})
