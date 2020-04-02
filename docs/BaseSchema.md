# BaseSchema 

## Methods

### λ allOf

**@signature**
```ts
allOf(schemas: BaseSchema[]): BaseSchema
```

**@description** It MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.

**@example**
```ts
{ allOf: [ {} ] }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.7.1


---
### λ anyOf

**@signature**
```ts
anyOf(schemas: BaseSchema[]): BaseSchema
```

**@description** It  MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.

**@example**
```ts
{ anyOf: [ {} ] }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.7.3


---
### λ const

**@signature**
```ts
const(value: T): BaseSchema
```

**@description** The value of this keyword MAY be of any type, including null.

**@example**
```ts
{ const: 'some' }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1.3


---
### λ copyWith

**@signature**
```ts
copyWith(modifyObject: Partial): this
```

**@description** Make copy of current schema with modified values



---
### λ custom

**@signature**
```ts
custom(validators: Validator[]): this
```

**@description** Add custom validation functions.
Since custom validators didn't supported by JSON Schema, I used AJV custom keywords to add such functionality



---
### λ default

**@signature**
```ts
default(def: T): this
```

**@description** There are no restrictions placed on the value of this keyword.

**@example**
```ts
{ default: ... }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.2


---
### λ definition

**@signature**
```ts
definition(name: string, definition: BaseSchema): this
```

**@description** The "definitions" keywords provides a standardized location for schema authors to inline re-usable JSON Schemas into a more general schema.
There are no restrictions placed on the values within the array.

**@example**
```ts
{ definitions: { [name]: definition } }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.9


---
### λ description

**@signature**
```ts
description(description: string): this
```

**@description** It can be used to decorate a user interface with information about the data
produced by this user interface. A description provides explanation about
the purpose of the instance described by the schema.

**@example**
```ts
{ description: "string" }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.1


---
### λ enum

**@signature**
```ts
enum(values: T[]): BaseSchema
```

**@description** The value of this keyword MUST be an array. This array SHOULD have at least one element. Elements in the array SHOULD be unique.

**@example**
```ts
{ enum: [ 'string' ] }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1.2


---
### λ examples

**@signature**
```ts
examples(examples: T[]): this
```

**@description** The value of this keyword MUST be an array.
There are no restrictions placed on the values within the array.

**@example**
```ts
{ examples: [ ... ] }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.4


---
### λ id

**@signature**
```ts
id($id: string): this
```

**@description** It defines a URI for the schema, and the base URI that other URI references within the schema are resolved against.

**@example**
```ts
{ $id: "string" }
```

**@reference** https://json-schema.org/latest/json-schema-core.html#id-keyword


---
### λ ifThen

**@signature**
```ts
ifThen(ifClause: BaseSchema, thenClause: BaseSchema): this
```

**@description** This validation outcome of this keyword's subschema has no direct effect on the overall validation result.
Rather, it controls which of the "then" or "else" keywords are evaluated.
When "if" is present, and the instance successfully validates against its subschema, then
validation succeeds against this keyword if the instance also successfully validates against this keyword's subschema.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.6.1

---
### λ ifThenElse

**@signature**
```ts
ifThenElse(ifClause: BaseSchema, thenClause: BaseSchema, elseClause: BaseSchema): this
```

**@description** When "if" is present, and the instance fails to validate against its subschema,
then validation succeeds against this keyword if the instance successfully validates against this keyword's subschema.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.6.1

---
### λ not

**@signature**
```ts
not(not: BaseSchema): this
```

**@description** It MUST be a valid JSON Schema.

**@example**
```ts
{ not: {} }
```



---
### λ oneOf

**@signature**
```ts
oneOf(schemas: BaseSchema[]): BaseSchema
```

**@description** It MUST be a non-empty array. Each item of the array MUST be a valid JSON Schema.

**@example**
```ts
{ oneOf: [ {} ] }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.7.2


---
### λ optional

**@signature**
```ts
optional(): BaseSchema
```

**@description** Should be used only with ObjectSchema. By default all properties in Object Schema are required. This will make them optional



---
### λ raw

**@signature**
```ts
raw(fragment: Record): this
```

**@description** Because the differences between JSON Schemas and Open API (Swagger)
it can be handy to arbitrary modify the schema injecting a fragment

**@example**
```ts
{ somethingCustom: 'value' }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.3


---
### λ ref

**@signature**
```ts
ref($ref: string): this
```

**@description** The value must be a valid id e.g. #properties/foo

**@example**
```ts
{ $ref: "string" }
```



---
### λ schema

**@signature**
```ts
schema($schema: string): this
```

**@description** Set $schema property

**@example**
```ts
{ $schema: "string" }
```



---
### λ title

**@signature**
```ts
title(title: string): this
```

**@description** It can be used to decorate a user interface with information about the data produced by this user interface. A title will preferably be short.

**@example**
```ts
{ title: "string" }
```

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.1


---
### λ validate

**@signature**
```ts
validate(data: InstanceType | T): [boolean | PromiseLike, ErrorObject[] | null | undefined]
```

**@description** Validate provided data with current schema using ajv



---
### λ valueOf

**@signature**
```ts
valueOf(): BaseJsonSchema
```

**@description** It returns all the schema values



---