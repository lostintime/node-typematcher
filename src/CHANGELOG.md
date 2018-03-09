Changelog
=========

## `0.7.0`:

Version is backward incompatible with previous releases (latest is `0.6.1`)

  * Fully refactored matching dsl: added exhaustive input value type checks (backward incompatible changes);
  * `isValue` type matcher removed because value check does not fully cover infered type, ex. `isValue("hello")` will pass only `"hello"` values string but infered type is `string`

## `0.6.1`

  * Dev Dependencies updates (typescript `2.7`)

## `0.5.0`, `0.6.0`

  * Adds/Updates `refined(TypeMatcher<A>)((A) => boolean, T)` functon