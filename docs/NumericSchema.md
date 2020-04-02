# NumericSchema extends BaseSchema

## Methods

### λ maximum

**@signature**
```ts
maximum(maximum: number, exclusive: boolean): this
```

**@description** It represents  an (inclusive | exclusive) upper limit for a numeric instance.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2.2

---
### λ minimum

**@signature**
```ts
minimum(minimum: number, exclusive: boolean): this
```

**@description** It represents  an (inclusive | exclusive) lower limit for a numeric instance.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2.4

---
### λ multipleOf

**@signature**
```ts
multipleOf(multipleOf: number): this
```

**@description** It must be multiple of.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2.1

---
### λ optional

**@signature**
```ts
optional(): NumericSchema
```

**@description** Make schema optional in {ObjectSchema}



---