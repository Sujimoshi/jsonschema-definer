# StringSchema extends BaseSchema

## Methods
----
### λ contentEncoding

**@signature**
```ts
contentEncoding(contentEncoding: string): this
```

**@description**  If the instance value is a string, this property defines that the string SHOULD
 be interpreted as binary data and decoded using the encoding named by this property.
 RFC 2045, Sec 6.1 [RFC2045] lists the possible values for this property.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.8.3

---
### λ contentMediaType

**@signature**
```ts
contentMediaType(contentMediaType: string): this
```

**@description**  The value of this property must be a media type, as defined by RFC 2046 [RFC2046].
 This property defines the media type of instances which this schema defines.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.8.3

---
### λ format

**@signature**
```ts
format(format: string): this
```

**@description** A string value can be RELATIVE_JSON_POINTER, JSON_POINTER, UUID, REGEX, IPV6, IPV4, HOSTNAME, EMAIL, URL, URI_TEMPLATE, URI_REFERENCE, URI, TIME, DATE,

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.7.3

---
### λ maxLength

**@signature**
```ts
maxLength(maxLength: number): this
```

**@description** A string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword.
The length of a string instance is defined as the number of its characters as defined by RFC 7159 [RFC7159].

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.2

---
### λ minLength

**@signature**
```ts
minLength(minLength: number): this
```

**@description** A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword.
The length of a string instance is defined as the number of its characters as defined by RFC 7159 [RFC7159].

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.2

---
### λ optional

**@signature**
```ts
optional(): StringSchema
```

**@description** Make schema optional in {ObjectSchema}



---
### λ pattern

**@signature**
```ts
pattern(pattern: RegExp): this
```

**@description**  This string SHOULD be a valid regular expression, according to the ECMA 262 regular expression dialect.
 A string instance is considered valid if the regular expression matches the instance successfully.

**@reference** https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.3

---