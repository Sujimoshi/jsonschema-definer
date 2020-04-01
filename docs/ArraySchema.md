# ArraySchema extends BaseSchema

## Methods
----
### λ additionalItems

**@signature**
```ts
additionalItems(additional: BaseSchema | boolean): ArraySchema | this
```

**@description** This keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.2

---
### λ contains

**@signature**
```ts
contains(contains: BaseSchema): ArraySchema
```

**@description** An array instance is valid against "contains" if at least one of its elements is valid against the given schema.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.2

---
### λ items

**@signature**
```ts
items(items: BaseSchema | BaseSchema[]): ArraySchema
```

**@description** This keyword determines how child instances validate for arrays, and does not directly validate the immediate instance itself.
If "items" is a schema, validation succeeds if all elements in the array successfully validate against that schema.
If "items" is an array of schemas, validation succeeds if each element of the instance validates against the schema at the same position, if any.
Omitting this keyword has the same behavior as an empty schema.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.1


---
### λ maxItems

**@signature**
```ts
maxItems(maxItems: number): this
```

**@description** An array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.
Omitting this keyword has the same behavior as a value of 0.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.3

---
### λ minItems

**@signature**
```ts
minItems(minItems: number): this
```

**@description** An array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.
Omitting this keyword has the same behavior as a value of 0.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.4

---
### λ optional

**@signature**
```ts
optional(): ArraySchema
```

**@description** Make schema optional in {ObjectSchema}



---
### λ uniqueItems

**@signature**
```ts
uniqueItems(unique: boolean): this
```

**@description** If this keyword has boolean value false, the instance validates successfully.
If it has boolean value true, the instance validates successfully if all of its elements are unique.
Omitting this keyword has the same behavior as a value of false.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.5

---