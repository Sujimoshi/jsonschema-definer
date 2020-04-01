# ObjectSchema extends BaseSchema

## Methods
----
### λ additionalProperties

**@signature**
```ts
additionalProperties(schema: BaseSchema | boolean): ObjectSchema | this
```

**@description** This keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself.
Validation with "additionalProperties" applies only to the child values of instance names that do not match any names in "properties",
and do not match any regular expression in "patternProperties".
For all such properties, validation succeeds if the child instance validates against the "additionalProperties" schema.
Omitting this keyword has the same behavior as an empty schema.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.6


---
### λ dependencies

**@signature**
```ts
dependencies(deps: Record): this
```

**@description** This keyword specifies rules that are evaluated if the instance is an object and contains a certain property.
This keyword's value MUST be an object. Each property specifies a dependency. Each dependency value MUST be an array or a valid JSON Schema.
If the dependency value is a subschema, and the dependency key is a property in the instance, the entire instance must validate against the dependency value.
If the dependency value is an array, each element in the array, if any, MUST be a string, and MUST be unique. If the dependency key is a property in the instance, each of the items in the dependency value must be a property that exists in the instance.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.7


---
### λ maxProperties

**@signature**
```ts
maxProperties(maxProperties: number): this
```

**@description** An object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the value of this keyword.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.1


---
### λ minProperties

**@signature**
```ts
minProperties(minProperties: number): this
```

**@description** An object instance is valid against "minProperties" if its number of properties is greater than, or equal to, the value of this keyword.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.2


---
### λ optional

**@signature**
```ts
optional(): ObjectSchema
```

**@description** Make schema optional in {ObjectSchema}



---
### λ partial

**@signature**
```ts
partial(): ObjectSchema
```

**@description** Return new ObjectSchema with removed required fields (recursively)



---
### λ patternProperties

**@signature**
```ts
patternProperties(props: Record): this
```

**@description** Each property name of this object SHOULD be a valid regular expression, according to the ECMA 262 regular expression dialect.
Each property value of this object MUST be a valid JSON Schema.
This keyword determines how child instances validate for objects, and does not directly validate the immediate instance itself.
Validation of the primitive instance type against this keyword always succeeds.
Validation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword's value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.5


---
### λ prop

**@signature**
```ts
prop(name: string, schema: BaseSchema): this
```

**@description** The value of "properties" MUST be an object. Each value of this object MUST be a valid JSON Schema

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.4


---
### λ propertyNames

**@signature**
```ts
propertyNames(nameSchema: StringSchema): this
```

**@description** If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema.
Note the property name that the schema is testing will always be a string.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.7


---
### λ required

**@signature**
```ts
required(fields: string[]): ObjectSchema
```

**@description** Set required array

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.3


---