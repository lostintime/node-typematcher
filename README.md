TypeMatcher
===========

Type matching library for [TypeScript](http://www.typescriptlang.org/).

[TypeScript](http://www.typescriptlang.org/) is doing great job by bringing type safety 
to JavaScript land, It will save you from writing lots of checks which can be defined
as types and _executed_ at compilation time. But all of this is only true while your code users
are also in safe environment, from Input to Output, so you functions relying on 
_type safe_ inputs will not crack.

This library provides constructions to _cover your Input_ with type checks.

## Installation

```
npm install --save typematcher
```

## Usage examples

TypeMatcher library contains 2 main components:
 
  * type matchers - functions to check values type
  * matching dsl - constructs to match required type for given input

`TypeMatcher` is only an alias for a function returning `true` if its argument type matches:

```typescript
type TypeMatcher<T> = (val: any) => val is T
```

Some type matchers: `isString`, `isNumber`, `isArrayOf`, `isTuple1`.

Matching DSL consists 2 main of functions: `match`, `caseWhen` and few aliases to make
code more readable: `caseAny`, `caseDefault`, `caseId` and `caseThrow`. 

Example:

```typescript
import {match, caseWhen, caseId, caseDefault, isValue, hasFields, isString, isOptional, isNumber} from 'typematcher';


enum UserRole {
  Member = 0,
  Moderator = 1,
  Admin = 2
}

type User = {
  name: string,
  role: UserRole,
  age?: number,
};

function isUserRole(val: any): val is UserRole {
  switch (val) {
    case UserRole.Member:
    case UserRole.Moderator:
    case UserRole.Admin:
      return true;
    default:
      return false;
  }
}


const input = {name: "John", role: 20};

const u: User = match(input)(
  caseId(hasFields({name: isString, role: isUserRole, age: isOptional(isNumber)}))
);

```
Sometimes is simpler to use `switch/case` but unfortunately not as an expression.

For more examples - check links in documentation section.

## Limitations

### Case handlers type variance

Avoid explicitly setting argument type in `caseWhen()` handler function, let type inferred by compiler.
You may set more specific type, but check will bring you more general one and compiler will not fail.
This is caused by TypeScript [Function Parameter Bivariance](https://www.typescriptlang.org/docs/handbook/type-compatibility.html).

```typescript
match(8)(caseWhen(isNumber)((n: 10) => "n is 10");
```

vs

```typescript
match(8)(caseWhen(isNumber)(n => {
  const x: 10 = n; // this will not compile: Type 'number' is not assignable to type '10'
  return "n is 10"
}));
```

### Use `caseDefault` at the end

`match` will execute all cases as provided, so first matching will return, 
use `caseDefault`, `caseAny` last.


## Contribute

> Perfection is Achieved Not When There Is Nothing More to Add, 
> But When There Is Nothing Left to Take Away

Fork, Contribute, Push, Create pull request, Thanks. 

## Documentation

Check latest sources on github: https://github.com/lostintime/node-typematcher
