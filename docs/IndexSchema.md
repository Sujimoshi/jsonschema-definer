# SchemaFactory extends BaseSchema

## Methods
----
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

**@example** { "type": "array" }


---
### λ boolean

**@signature**
```ts
boolean(): BaseSchema
```

**@description** Create BooleanSchema

**@example** { "type": "boolean" }


---
### λ instanceOf

**@signature**
```ts
instanceOf(Class: Class): BaseSchema
```

**@description** Check the instance of of provadied value. Use ajv custom keywords. Notice: It compare using ObjectInstance.constructor.name and Object.name



---
### λ integer

**@signature**
```ts
integer(): NumericSchema
```

**@description** Create NumericSchema(integer)

**@example** { "type": "integer" }


---
### λ list

**@signature**
```ts
list(items: BaseSchema): ArraySchema
```

**@description** Create ArraySchema

**@example** { "type": "array", "items": { ... } }


---
### λ null

**@signature**
```ts
null(): BaseSchema
```

**@description** Create NullSchema

**@example** { "type": "null" }


---
### λ number

**@signature**
```ts
number(): NumericSchema
```

**@description** Create NumericSchema(number)

**@example** { "type": "number" }


---
### λ object

**@signature**
```ts
object(): ObjectSchema
```

**@description** Create ObjectSchema

**@example** { "type": "object" }


---
### λ shape

**@signature**
```ts
shape(props: Record, additional: boolean): ObjectSchema
```

**@description** Create ObjectSchema

**@example** { "type": "object", "properties": { ... }, "additionalProperties": false }


---
### λ string

**@signature**
```ts
string(): StringSchema
```

**@description** Create StringSchema

**@example** { "type": "string" }


---