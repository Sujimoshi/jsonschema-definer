import S from '../'

type Expect<T extends E, E> = T extends E ? true : false;

describe('ObjectSchema', () => {
  it('ObjectSchema.prototype.partial', () => {
    const schema = S.shape({ prop: S.shape({ str: S.string(), obj: S.object() }) }).partial()

    expect(schema.validate({})[0]).toEqual(true)
    expect(schema.validate({ prop: {} })[0]).toEqual(true)
  })

  it('ObjectSchema.prototype.propertyNames', () => {
    const schema = S.object().propertyNames(S.string().pattern(/^some$/))

    type Check = Expect<typeof schema.type, {}>;
    expect(schema.validate({})[0]).toEqual(true)
    expect(schema.validate({ some: 'string' })[0]).toEqual(true)
  })

  it('ObjectSchema.prototype.minProperties', () => {
    const schema = S.object().minProperties(1)

    type Check = Expect<typeof schema.type, {}>;
    expect(schema.validate({})[0]).toEqual(false)
    expect(schema.validate({ some: 'string' })[0]).toEqual(true)
  })

  it('ObjectSchema.prototype.maxProperties', () => {
    const schema = S.object().maxProperties(0)

    type Check = Expect<typeof schema.type, {}>;
    expect(schema.validate({})[0]).toEqual(true)
    expect(schema.validate({ some: 'string' })[0]).toEqual(false)
  })

  it('ObjectSchema.prototype.dependencies', () => {
    const schema = S.shape({
      some: S.string().optional(),
      any: S.string().optional()
    }).dependencies({ some: ['any'] })

    type Check = Expect<typeof schema.type, { some?: string; any?: string }>;
    expect(schema.validate({ some: 'some', any: 'any' })[0]).toEqual(true)
    expect(schema.validate({ some: 'string' })[0]).toEqual(false)
    expect(schema.validate({ any: 'string' })[0]).toEqual(true)
  })

  it('ObjectSchema.prototype.dependencies with ObjectSchema', () => {
    const schema = S.shape({
      some: S.string().optional(),
      any: S.string().optional()
    }).dependencies({
      some: S.shape({ any: S.string() }, true)
    })

    type Check = Expect<typeof schema.type, { some?: string; any?: string }>;
    expect(schema.validate({ some: 'some', any: 'any' })[0]).toEqual(true)
    expect(schema.validate({ some: 'string' })[0]).toEqual(false)
    expect(schema.validate({ any: 'string' })[0]).toEqual(true)
  })

  it('ObjectSchema.prototype.patternProperties', () => {
    const schema = S.object().patternProperties({
      '^str': S.string(),
      '^num': S.number()
    })

    type Check = Expect<typeof schema.type, {}>;
    expect(schema.validate({ strSome: 'some', numAny: 0 })[0]).toEqual(true)
    expect(schema.validate({ numAny: 'string' })[0]).toEqual(false)
    expect(schema.validate({ strSome: 0 })[0]).toEqual(false)
  })

  it('ObjectSchema.prototype.required', () => {
    const schema = S.object().prop('some', S.string().optional()).prop('any', S.string().optional()).required('some')

    type Check = Expect<typeof schema.type, { some?: string; any?: string }>;
    expect(schema.validate({ some: 'some', any: 'any' })[0]).toEqual(true)
    expect(schema.validate({ any: 'any' } as any)[0]).toEqual(false)
  })

  it('ObjectSchema.prototype.optional', () => {
    const schema = S.object().optional()
    expect(schema.isRequired).toEqual(false)
  })

  it('ObjectSchema.prototype.additionalProperties', () => {
    const schema = S.object().additionalProperties(S.string())

    type Check = Expect<typeof schema.type, {}>;
    expect(schema.validate({ strSome: 'some', numAny: 0 })[0]).toEqual(false)
    expect(schema.validate({ numAny: 'string' })[0]).toEqual(true)
    expect(schema.validate({ strSome: 0 })[0]).toEqual(false)
  })
})
