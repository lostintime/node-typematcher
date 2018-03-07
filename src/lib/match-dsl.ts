/*
 * Copyright 2018 by TypeMatcher developers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { TypeMatcher, isAny } from "./matchers"

/**
 * Define a match case handler
 */
export interface Case<A, R> {
  map: (val: A) => R

  caseWhen: <B>(matcher: TypeMatcher<B>, fn: (val: B) => R) => Case<A | B, R>

  caseId: <B extends R>(matcher: TypeMatcher<B>) => Case<A, R>

  caseDefault: (fn: (v: any) => R) => Case<any, R>
}

class SwitchCase<A, B, R> implements Case<A | B, R> {
  constructor(private matchA: TypeMatcher<A>,
              private caseA: (val: A) => R,
              private caseB: (val: B) => R) {
  }

  map(val: A | B): R {
    if (this.matchA(val)) {
      return this.caseA(val)
    }

    return this.caseB(val)
  }

  caseWhen<C>(matcher: TypeMatcher<C>, fn: (val: C) => R): Case<A | B | C, R> {
    return new SwitchCase<C, A | B, R>(matcher, fn, this.map)
  }

  caseId<C extends R>(matcher: TypeMatcher<C>): Case<A | B, R> {
    return this.caseWhen(matcher, _ => _)
  }

  caseDefault(fn: (val: any) => R): Case<any, R> {
    return this.caseWhen(isAny, fn)
  }
}

/**
 * Pattern Matching syntax sugar
 *
 * Equivalent to Case<C, R>.map(val)
 * @param val input value to match
 * @param cases match cases
 */
export function match<I extends C, C, R>(val: I, cases: Case<C, R>): R {
  return cases.map(val)
}

/**
 * Case handler for type A
 *
 * @param matcher matcher used to verify input value
 * @param fn handler function
 */
export function caseWhen<A, R>(matcher: TypeMatcher<A>, fn: (val: A) => R): Case<A, R> {
    return new SwitchCase<A, never, R>(matcher, fn, () => { throw new Error("No match") })
}

/**
 * Identity case, passes input value
 *
 * Equivalent to caseWhen(matcher, _ => _)
 * @param matcher input value type matcher
 */
export function caseId<A>(matcher: TypeMatcher<A>): Case<A, A> {
  return caseWhen(matcher, _ => _)
}

/**
 * Create new default case handler - matches any type
 *
 * @param fn handler function
 */
export function caseDefault<R>(fn: (val: any) => R): Case<any, R> {
  return caseWhen(isAny, fn)
}
