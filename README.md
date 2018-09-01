TypeMatcher
===========

Type matching library for [TypeScript](http://www.typescriptlang.org/).

[TypeScript](http://www.typescriptlang.org/) is doing great job by bringing type safety 
to JavaScript land, It will save you from writing lots of checks which can be defined
as types and _executed_ at compilation time. But all of this is only true while your code users
are also in safe environment, from Input to Output, so you functions relying on 
_type safe_ inputs will not crack.

This library provides constructions to _cover your input_ with type checks and pattern-match on them.

## Installation

```
npm install --save typematcher
```

## Usage examples

TypeMatcher library contains 2 main components:
 
  * type matchers - functions to check value matches a type
  * matching dsl - constructs to map a type A to B using type matchers to refine

`TypeMatcher` is a type alias for a function returning `true` if its argument type matches:

```typescript
type TypeMatcher<T> = (val: any) => val is T
```

Some type matchers: `isString`, `isNumber`, `isArrayOf`, `isTuple1`.

Matching DSL consists of few functions: `match`, `caseWhen` and `caseDefault`:

Exhaustive match:

```typescript
import { match, caseWhen, isString } from "typematcher"

const x: number = match("1" as string | number,
  caseWhen(isNumber, _ => _).
  caseWhen(isString, _ => parseInt(_, 10))
)
```

Default case handler:

```typescript
import { match, caseWhen, isBoolean } from "typematcher"

const x: 1 | 0 = match("2" as string | number,
  caseWhen(isBoolean, _ => _ ? 1 : 0).
  caseWhen(isNumber, _ => _ > 0 ? 1 : 0).
  // string type not covered, default case required
  caseDefault(() => 0)
)
```

Composing type matchers:

```typescript
import {
  match, caseWhen, caseDefault, isValue, hasFields, isString, isOptional, isNumber,
  isEither, isNull
} from 'typematcher'

enum UserRole {
  Member = 0,
  Moderator = 1,
  Admin = 2
}

type User = {
  name: string,
  role: UserRole,
  age?: number
}

/**
 * UserRole type matcher
 */
function isUserRole(val: any): val is UserRole {
  switch (val) {
    case UserRole.Member:
    case UserRole.Moderator:
    case UserRole.Admin:
      return true
    default:
      return false
  }
}

const isUser: TypeMatcher<User> = hasFields({
  name: isString,
  role: isUserRole,
  age: isOptional(isNumber)
})

const user: any = { name: "John", role: 20 }

const u: User | null = match(user,
  caseWhen(isEither(isUser, isNull), _ => _).
  caseDefault(() => null)
)
```
Sometimes is simpler to use `switch/case` but unfortunately not as an expression.

For more examples - check links in documentation section.

## Limitations

### Case handlers type variance

~~Avoid explicitly setting argument type in `caseWhen()` handler function, let type inferred by compiler.
You may set more specific type, but check will bring you more general one and compiler will not fail.
This is caused by TypeScript [Function Parameter Bivariance](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
_feature_.~~

__UPD__: Typescript v2.6 brings `--strictFunctionTypes` compiler option and if it's on, for this code:

```typescript
match(8, caseWhen(isNumber, (n: 10) => "n is 10"))
```

you will now get this error:

```
error TS2345: Argument of type '8' is not assignable to parameter of type '10'.

  match(8, caseWhen(isNumber, (n: 10) => "n is 10"))
        ~
```

### Use `caseDefault` at the end

~~`match` will execute all cases as provided, so first matching will return,
use `caseDefault`, `caseAny` last.~~

New match DSL introduced in `typematcher@0.8.0` brought compile-time exhaustivity checking, so this code:

```typescript
const x: "ten" | "twenty" = match(8 as any, 
  caseWhen(isString, () => "ten")
)
```

will fail at compile time with:

```
error TS2322: Type 'string' is not assignable to type '"ten" | "twenty"'.

  const x: "ten" | "twenty" = match(8 as any,
        ~
```

But you still have to handle default case when `any` result type is expected (which is highly not recommended), otherwise it may fail with `No match` error at runtime.

```typescript
const x: any = match(8 as any, 
  caseWhen(isString, () => "ten").
  caseDefault(() => "twenty")
)
```

## Contribute

> Perfection is Achieved Not When There Is Nothing More to Add, 
> But When There Is Nothing Left to Take Away

Fork, Contribute, Push, Create pull request, Thanks. 

## Documentation

Check latest sources on github: https://github.com/lostintime/node-typematcher.

[Pattern matching for typescript](https://lostintimedev.com/2017/09/06/typematcher-pattern-matching-library-for-typescript.html) blog post.

Funfix binding: [https://github.com/lostintime/node-typematcher-funfix](https://github.com/lostintime/node-typematcher-funfix).
