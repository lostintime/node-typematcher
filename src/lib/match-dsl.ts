/*
 * Copyright 2017 by TypeMatcher developers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { TypeMatcher, Throwable, isAny } from "./matchers"

/**
 * Success case match result
 */
export type CaseMatch<T> = { match: T }

/**
 * Failure case match result
 */
export type CaseMiss = false

/**
 * Success or Failure
 */
export type CaseResult<T> = CaseMatch<T> | CaseMiss

/**
 * Defines a case to be used with match
 */
export type MatchCase<T> = (val: any) => CaseResult<T>

/**
 * matchWith is same as match() only with inverse arguments order,
 * this can be used to pre-build matchers and save some CPU cycles
 */
export function matchWith<R>(...cases: MatchCase<R>[]): (val: any) => R {
  return function value(val: any): R {
    for (const m of cases) {
      const r = m(val)
      if (r !== false) {
        return r.match
      }
    }

    throw new Error("No match")
  }
}

/**
 * Match value against all given matchers, return when on first match,
 * Throws error if none matched
 * This method should be used with caseWhen, caseAny, caseDefault methods
 */
export function match(val: any): <R>(...cases: MatchCase<R>[]) => R {
  return function cases<R>(...cases: MatchCase<R>[]): R {
    return matchWith(...cases)(val)
  }
}

/**
 * Maps over value if successfully matched by matcher
 */
export function caseWhen<T>(matcher: TypeMatcher<T>): <U>(h: (v: T) => U) => MatchCase<U> {
  return function map<U>(f: (v: T) => U): MatchCase<U> {
    return function value(val: any): CaseResult<U> {
      if (matcher(val)) {
        return { match: f(val) }
      }

      return false
    }
  }
}

/**
 * Case for any value match (use for default handling)
 */
export function caseAny<U>(h: (val: any) => U): MatchCase<U> {
  return caseWhen(isAny)(h)
}

/**
 * Just an alias for caseAny
 */
export function caseDefault<U>(h: () => U): MatchCase<U> {
  return caseAny(() => h())
}

/**
 * Identity case
 */
export function caseId<T>(matcher: TypeMatcher<T>): MatchCase<T> {
  return caseWhen(matcher)(v => v)
}

/**
 * Just a wrapper to throw given error
 */
export function caseThrow<U>(err: Throwable): MatchCase<U> {
  return (val: any) => {
    throw err
  }
}
