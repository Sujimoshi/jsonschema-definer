import F from 'fluent-schema'
import S from './'

console.log(
  F.const('some').valueOf()
)

const Enum = S.enum('some', 'any')

type en = typeof Enum.type

const s = S.string().anyOf(S.const('some'), S.const('any'))

type T = typeof s.type
