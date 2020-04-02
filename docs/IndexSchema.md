# SchemaFactory extends BaseSchema

## Methods

### λ any

**@signature**
```ts
any(): BaseSchema
```

**@description** Create an empty schema

**@exmaple** { }


---
### λ array

**@signature**
```ts
array(): ArraySchema
```

**@description** Create ArraySchema

**@example**
```ts
{ "type": "array" }
```



---
### λ boolean

**@signature**
```ts
boolean(): BaseSchema
```

**@description** Create BooleanSchema

**@example**
```ts
{ "type": "boolean" }
```



---
### λ instanceOf

**@signature**
```ts
instanceOf(Type: Class): BaseSchema
```

**@description** Check the type of the provided value. Used custom ajv keyword.



---
### λ integer

**@signature**
```ts
integer(): NumericSchema
```

**@description** Create NumericSchema(integer)

**@example**
```ts
{ "type": "integer" }
```



---
### λ list

**@signature**
```ts
list(items: BaseSchema): ArraySchema
```

**@description** Create ArraySchema

**@example**
```ts
{ "type": "array", "items": { ... } }
```



---
### λ null

**@signature**
```ts
null(): BaseSchema
```

**@description** Create NullSchema

**@example**
```ts
{ "type": "null" }
```



---
### λ number

**@signature**
```ts
number(): NumericSchema
```

**@description** Create NumericSchema(number)

**@example**
```ts
{ "type": "number" }
```



---
### λ object

**@signature**
```ts
object(): ObjectSchema
```

**@description** Create ObjectSchema

**@example**
```ts
{ "type": "object" }
```



---
### λ shape

**@signature**
```ts
shape(props: Record, additional: boolean): ObjectSchema
```

**@description** Create ObjectSchema

**@example**
```ts
{ "type": "object", "properties": { ... }, "additionalProperties": false }
```



---
### λ string

**@signature**
```ts
string(): StringSchema
```

**@description** Create StringSchema

**@example**
```ts
{ "type": "string" }
```



---