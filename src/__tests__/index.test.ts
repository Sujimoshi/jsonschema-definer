import S, { BaseSchema } from '../'

type Expect<T extends E, E> = T extends E ? true : false;

describe('root instance', () => {
  it('S.string()', () => {
    const schema = S.string()

    type Check = Expect<typeof schema.type, string>;
    expect(schema.validate('valid')[0]).toEqual(true)
  })

  it('S.number()', () => {
    const schema = S.number()

    type Check = Expect<typeof schema.type, number>;
    expect(schema.validate(0)[0]).toEqual(true)
    expect(schema.validate(0.1)[0]).toEqual(true)
  })

  it('S.integer()', () => {
    const schema = S.integer()

    type Check = Expect<typeof schema.type, number>;
    expect(schema.validate(999)[0]).toEqual(true)
    expect(schema.validate(999.1)[0]).toEqual(false)
  })

  it('S.boolean()', () => {
    const schema = S.boolean()

    type Check = Expect<typeof schema.type, boolean>;
    expect(schema.validate(true)[0]).toEqual(true)
    expect(schema.validate(false)[0]).toEqual(true)
  })

  it('S.null()', () => {
    const schema = S.null()

    type Check = Expect<typeof schema.type, null>;
    expect(schema.validate(null)[0]).toEqual(true)
  })

  it('S.array()', () => {
    const schema = S.array()

    type Check = Expect<typeof schema.type, any[]>;
    expect(schema.validate([])[0]).toEqual(true)
  })

  it('S.list()', () => {
    const schema = S.list(S.string())

    type Check = Expect<typeof schema.type, string[]>;
    expect(schema.validate(['some'])[0]).toEqual(true)
  })

  it('S.object()', () => {
    const schema = S.object()

    type Check = Expect<typeof schema.type, Record<string, any>>;
    expect(schema.validate({ some: 'any' })[0]).toEqual(true)
  })

  it('S.shape()', () => {
    type Type = { str: string, num?: number }
    const schema = S.shape({
      str: S.string(),
      num: S.number().optional()
    })

    type Check = Expect<typeof schema.type, Type>;
    expect(schema.validate({ str: 'any', num: 0 })[0]).toEqual(true)
    expect(schema.validate({ str: 'any', num: undefined })[0]).toEqual(true)
  })

  it('S.enum()', () => {
    enum Type { Some = 'some', Any = 'any' }
    const schema = S.enum(Type.Some, Type.Any)

    type Check = Expect<typeof schema.type, Type>;
    expect(schema.validate(Type.Some)[0]).toEqual(true)
  })

  it('S.const()', () => {
    const schema = S.const('some')

    type Check = Expect<typeof schema.type, 'some'>;
    expect(schema.validate('some')[0]).toEqual(true)
  })

  it('S.anyOf()', () => {
    const schema = S.anyOf(S.string(), S.number())

    type CheckSchema = Expect<typeof schema, BaseSchema<string | number>>;
    type CheckType = Expect<typeof schema.type, string | number>;
    expect(schema.validate('some')[0]).toEqual(true)
    expect(schema.validate(999)[0]).toEqual(true)
  })

  it('S.oneOf()', () => {
    const schema = S.oneOf(S.string(), S.number())

    type CheckSchema = Expect<typeof schema, BaseSchema<string | number>>;
    type CheckType = Expect<typeof schema.type, string | number>;
    expect(schema.validate('some')[0]).toEqual(true)
    expect(schema.validate(999)[0]).toEqual(true)
  })

  it('S.allOf()', () => {
    const schema = S.allOf(S.shape({ some: S.string() }), S.shape({ any: S.number() }))

    type CheckSchema = Expect<typeof schema, BaseSchema<{ some: string } & { any: number }>>;
    type CheckType = Expect<typeof schema.type, { some: string } & { any: number }>;
    expect(schema.validate({ some: 'string', any: 0 })[0]).toEqual(false)
    expect(schema.validate({ some: 'string' } as any)[0]).toEqual(false)
  })

  it('S.not()', () => {
    const schema = S.not(S.string())

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.validate('some')[0]).toEqual(false)
    expect(schema.validate(999)[0]).toEqual(true)
  })

  it('S.any()', () => {
    const schema = S.any()

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.validate('some')[0]).toEqual(true)
    expect(schema.validate(999)[0]).toEqual(true)
    expect(schema.validate(true)[0]).toEqual(true)
    expect(schema.validate(null)[0]).toEqual(true)
    expect(schema.validate(undefined)[0]).toEqual(true)
    expect(schema.validate({})[0]).toEqual(true)
  })

  it('S.raw()', () => {
    const schema = S.raw({ some: 'any' })

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.valueOf().some).toEqual('any')
  })

  it('S.id()', () => {
    const schema = S.id('some')

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.valueOf().$id).toEqual('some')
  })

  it('S.schema()', () => {
    const schema = S.schema('some.com')

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.valueOf().$schema).toEqual('some.com')
  })

  it('S.ref()', () => {
    const schema = S.ref('some')

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.valueOf().$ref).toEqual('some')
  })

  it('S.title()', () => {
    const schema = S.title('some')

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.valueOf().title).toEqual('some')
  })

  it('S.description()', () => {
    const schema = S.description('some')

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.valueOf().description).toEqual('some')
  })

  it('S.examples()', () => {
    const schema = S.examples('some', 'any')

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.valueOf().examples).toEqual(['some', 'any'])
  })

  it('S.default()', () => {
    const schema = S.default('some')

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.valueOf().default).toEqual('some')
  })

  it('S.definition()', () => {
    const schema = S.definition('some', S.string())

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.valueOf().definitions).toEqual({ some: S.string().plain })
  })

  it('S.instanceOf()', () => {
    const schema = S.shape({
      date: S.instanceOf<Date>(Date),
      number: S.instanceOf<Number>(Number),
      buf: S.instanceOf<Buffer>(Buffer),
    })

    type CheckSchema = Expect<typeof schema, BaseSchema<{ date:Date, number: Number }>>;
    type CheckType = Expect<typeof schema.type.date, Date>;
    type CheckType2 = Expect<typeof schema.type.number, Number>;
    const [valid, error] = schema.validate({ date: new Date(), number: new Number(10), buf: new Buffer(123) }) // eslint-disable-line
    console.log(error)
    expect(valid).toEqual(true)
  })

  it('S.ifThen()', () => {
    const schema = S.ifThen(S.string(), S.const('string'))

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.validate('string')[0]).toEqual(true)
  })

  it('S.ifThenElse()', () => {
    const schema = S.ifThenElse(S.string(), S.const('string'), S.const(0))

    type CheckSchema = Expect<typeof schema, BaseSchema<any>>;
    type CheckType = Expect<typeof schema.type, any>;
    expect(schema.validate('string')[0]).toEqual(true)
    expect(schema.validate(0)[0]).toEqual(true)
    expect(schema.validate(999)[0]).toEqual(false)
  })
})
