// @ts-check
/* eslint-disable */
import docs from './docs.json'
import path from 'path'
import { mkdirSync, rmdirSync, createWriteStream, writeFileSync } from 'fs'

mkdirSync('./docs')

class Entity {
  docs: any

  constructor(docs) {
    this.docs = docs
  }

  extends () {
    if(!this.docs.extendedTypes) return ''
    return 'extends ' + this.docs.extendedTypes.map(el => el.name)
  }

  name() {
    if (!this.docs.name) return ''
    const name = this.docs.name.replace(/^"(.*)"$/, '$1')
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  typeName(typeObj) {
    const map = {
      intrinsic: () => typeObj.name,
      reference: () => typeObj.name,
      tuple: () => '[' + typeObj.elements.map(t => this.typeName(t)).join(', ') + ']', //?
      union: () => typeObj.types.map(t => this.typeName(t)).join(' | '),
      conditional: () => `${this.typeName(typeObj.trueType)} | ${this.typeName(typeObj.falseType)}`,
      typeParameter: () => typeObj.constraint ? this.typeName(typeObj.constraint) : typeObj.name,
      array: () => `${this.typeName(typeObj.elementType)}[]`,
      unknown: () => typeObj.name,
      intersection: () => typeObj.types.map(t => this.typeName(t)).join(' & ')
    }
    return map[typeObj.type]()
  }

  parameters(params = []) {
    return params.map(el => `${el.name}: ${this.typeName(el.type)}`).join(', ')
  }

  signature(method) {
    return `${method.name}(${this.parameters(method.parameters)}): ${this.typeName(method.type)}`
  }

  tags(tags = []) {
    return tags.map(el => `**@${el.tag}** ${el.text}`).join('\n')
  }

  methods() {
    return this.group('Method')
      .filter(el => !el.docs.inheritedFrom)
      .map(method => {
        const signature = method.docs.signatures[0]
        return [
          `### λ ${method.docs.name}`,
          '',
          `**@signature**`,
          '```ts',
          `${this.signature(signature)}`,
          '```',
          '',
          `**@description** ${signature.comment.shortText}`,
          '',
          this.tags(signature.comment.tags),
          '',
          '---'
        ].join('\n')
      })
  }

  group(name) {
    return this.docs.children.filter(el => el.kindString === name).map(el => new Entity(el))
  }
}

const write = (module, f = 'a') => (...lines) => writeFileSync(path.resolve(__dirname, 'docs', module.name() + 'Schema.md'), lines.join('\n'), { flag: f });
const docu = new Entity(docs)

function main() {
  docu.group('Module').map(module => {
    write(module, 'w')()

    module.group('Class').map(cls => {
      write(module)(
        `# ${cls.docs.name} ${cls.extends()}`,
        '',
        '## Methods',
        '----',
        ...cls.methods()
      )
    })
  })
}

main()
