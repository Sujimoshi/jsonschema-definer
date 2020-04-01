<h1 align="center">Welcome to jsonschema-definer 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/jsonschema-definer" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/jsonschema-definer.svg">
  </a>
  <a href="https://www.isc.org/licenses/" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <img alt="Release" src="https://github.com/Sujimoshi/jsonschema-definer/workflows/Release/badge.svg" />
  <a href="https://codecov.io/gh/Sujimoshi/jsonschema-definer" target="_blank">
    <img alt="License: ISC" src="https://codecov.io/gh/Sujimoshi/jsonschema-definer/branch/master/graph/badge.svg" />
  </a>
</p>

This package provides simple, well typed API for creating and validating JSON Schemas

## Install

```sh
npm install jsonschema-definer
```

## Usage
This package was inspired by `fluent-schema` and `prop-types`, and is used to create and validate JSON Schema. It was written in typescript and provide a lot of usefull info from typings, such as infering interface types from schema. Here is an example:

```ts
import S from 'jsonschema-definer'

// Lets define a simple object schema
const UserSchema = S.shape({
  name: S.string(),
  email: S.string().format('email').optional(),
  password: S.string().minLength(8),
  role: S.enum('client', 'suplier'),
  birthday: S.instanceOf(Date)
})

// Now lets get interface of User from schema
type User = typeof UserSchema.type
/*
  type User = {
    name: string,
    email?: string | undefined,
    password: string,
    role: 'client' | 'suplier',
    birthday: Date
  }
*/

// We can validate user using .validate(data) function (ajv used)
const [valid, errors] = UserSchema.validate({
  name: 'Igor',
  email: 'fumo.sujimoshi@gmail.com',
  password: '12345678',
  role: 'client',
  birthday: new Date()
})

console.log(valid, errors) // [boolean, Error[]]

// Or get plain JSON Schema using .valueOf()
console.log(UserSchema.valueOf())

```

## Show your support

Give a ⭐️ if this project helped you!

## Documentation

### S: SchemaFactory extends <a href="docs/BaseSchema.md">BaseSchema</a>

<table>
    <tr>
        <th>Method</th>
        <th>Return</th>
        <th>Description</th>
        <th>JSON Schema</th>
    </tr>
    <tr>
        <td>S.any()</td>
        <td><a href="docs/BaseSchema.md">BaseSchema</a>&lt;any&gt;</td>
        <td>Correspond to any type</td>
        <td>{ }</td>
    </tr>
    <tr>
        <td>S.string()</td>
        <td><a href="docs/StringSchema.md">StringSchema</a>&lt;string&gt;</td>
        <td>For strings validation</td>
        <td>{ "type": "string" }</td>
    </tr>
    <tr>
        <td>S.number()</td>
        <td><a href="docs/NumericSchema.md">NumericSchema</a>&lt;number&gt;</td>
        <td>For float/integer validation</td>
        <td>{ "type": "number" }</td>
    </tr>
    <tr>
        <td>S.integer()</td>
        <td><a href="docs/NumericSchema.md">NumericSchema</a>&lt;number&gt;</td>
        <td>For integer values validation</td>
        <td>{ "type": "integer" }</td>
    </tr>
    <tr>
        <td>S.boolean()</td>
        <td><a href="docs/BaseSchema.md">BaseSchema</a>&lt;boolean&gt;</td>
        <td>For boolean values</td>
        <td>{ "type": "boolean" }</td>
    </tr>
    <tr>
        <td>S.null()</td>
        <td><a href="docs/BaseSchema.md">BaseSchema</a>&lt;null&gt;</td>
        <td>For null value validation</td>
        <td>{ "type": "null" }</td>
    </tr>
    <tr>
        <td>S.array()</td>
        <td><a href="docs/ArraySchema.md">ArraySchema</a>&lt;any[]&gt;</td>
        <td>For arrays</td>
        <td>{ "type": "array" }</td>
    </tr>
    <tr>
        <td>S.list(itemType: T)</td>
        <td><a href="docs/ArraySchema.md">ArraySchema</a>&lt;T[]&gt;</td>
        <td>Validation of lists. Example: S.list(S.string()): ArraySchema&lt;string[]&gt;&gt;</td>
        <td>{ "type": "array", "items": { ... } }</td>
    </tr>
    <tr>
        <td>S.object()</td>
        <td><a href="docs/ObjectSchema.md">ObjectSchema</a>&lt;{}&gt;</td>
        <td>Validation of object</td>
        <td>{ "type": "object" }</td>
    </tr>
    <tr>
        <td>S.shape({ key: Schema }: T)</td>
        <td><a href="docs/ObjectSchema.md">ObjectSchema</a>&lt;T&gt;</td>
        <td>Validation of objects</td>
        <td>{ "type": "object", properties: T, additionalProperties: false } }</td>
    </tr>
    <tr>
        <td>S.instanceOf(type: T)</td>
        <td><a href="docs/BaseSchema.md">BaseSchema</a>&lt;T&gt;</td>
        <td>For validating instanceOf data. (Custom keyword used) </td>
        <td>{ instanceOf: T.name } </td>
    </tr>
    <tr>
        <td>S.enum(...constants: T[])</td>
        <td><a href="docs/BaseSchema.md">BaseSchema</a>&lt;T[0] | T[1] | ...&gt;</td>
        <td>Enumerable schema</td>
        <td>{ enum: [ T[0], T[1] ] }</td>
    </tr>
    <tr>
        <td>S.const(constant: T)</td>
        <td><a href="docs/BaseSchema.md">BaseSchema</a>&lt;T&gt;</td>
        <td>Constant value</td>
        <td>{ const: T }</td>
    </tr>
    <tr>
        <td>S.anyOf(...schemas: BaseSchema&lt;T&gt;[])</td>
        <td><a href="docs/BaseSchema.md">BaseSchema</a>&lt;T[0] | T[1] | ...&gt;</td>
        <td>Any (one or more) of given types</td>
        <td>{ anyOf: [ T[0], T[1], ... ] }</td>
    </tr>
    <tr>
        <td>S.oneOf(...schemas: BaseSchema&lt;T&gt;[])</td>
        <td><a href="docs/BaseSchema.md">BaseSchema</a>&lt;T[0] | T[1] | ...&gt;</td>
        <td>Value shoud correspond to ONE of given types</td>
        <td>{ oneOf: [ T[0], T[1], ... ] }</td>
    </tr>
    <tr>
        <td>S.allOf(...schemas: BaseSchema&lt;T&gt;[])</td>
        <td><a href="docs/BaseSchema.md">BaseSchema</a>&lt;T[0] &amp; T[1] &amp; ...&gt;</td>
        <td>Value should correspond to ALL of given type</td>
        <td>{ allOf: [ T[0], T[1], ... ] }</td>
    </tr>
    <tr>
        <td>S.raw(custom: any)</td>
        <td>
            <a href="docs/BaseSchema.md">BaseSchema</a>&lt;any&gt;
        </td>
        <td>Custom schema</td>
        <td>{ ...custom }</td>
    </tr>
</table>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Sujimoshi/jsonschema-definer/issues).

### Run tests

```sh
npm run test
``` 

## Author

👤 **Igor Solomakha <fumo.sujimoshi@gmail.com>**

* Github: [@Sujimoshi](https://github.com/Sujimoshi)

## 📝 License

Copyright © 2020 [Igor Solomakha <fumo.sujimoshi@gmail.com>](https://github.com/Sujimoshi).<br />
This project is [ISC](https://www.isc.org/licenses/) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_