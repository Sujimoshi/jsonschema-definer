import F from 'fluent-schema'
import S from './'

console.log(
  F.const('some').valueOf()
)

const Enum = S.string().enum('some', 'any')

type en = typeof Enum.type

const s = S.anyOf(S.const('some'), S.const('any'))

type T = typeof s.type

const $const = S.const('some')

type $Const = typeof $const.type

const $any = S.any()

type $Any = typeof $any.type

const object = S.object()
  .prop('some', S.shape({
    foo: S.null()
  }))
  .prop('any', S.number().optional())

type Obj = typeof object.type

const shape = S.shape({
  some: S.null(),
  any: S.number().optional()
})

type Shape = typeof shape.type
