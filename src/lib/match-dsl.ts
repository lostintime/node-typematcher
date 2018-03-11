/*
 * Copyright 2018 by TypeMatcher developers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { TypeMatcher } from "./matchers"

/**
 * Cases for partial matches
 * @private
 */
export interface PartialMatchCase<A, R> {
  /**
   * partMap - maps value A to R on match, or returns def expression value
   * @private
   * @param val value to map
   * @param def default value expresson, for match miss
   */
  partMap(val: A, def: () => R): R
}

/**
 * MatchCase is basically a function between category A and R
 */
export interface MatchCase<A, R> {
  /**
   * Cases handler no default handler, depends on implementation
   */
  map(val: A): R
}

/**
 * SingleCase - map type A to R or fail with an error
 *
 * ```
 * caseWhen(isOne, id). // <- SingleCase
 * caseWhen(isTwo, id). // <- DisjunctionCase, executes previous case and falls back to itself
 * caseWhen(isThree, id). // <- one more DisjunctionCase
 * caseDefault(() => c) // <- DefaultCase - adds default value expression
 * ```
 */
export class SingleCase<M, A extends M, R> implements MatchCase<A, R>, PartialMatchCase<A, R> {
  constructor(private readonly match: TypeMatcher<M>,
              private readonly handle: (val: A) => R) {}

  partMap(val: A, def: () => R): R {
    if (this.match(val)) {
      return this.handle(val)
    }

    return def()
  }

  map(val: A): R {
    return this.partMap(val, () => {
      throw new Error("No match")
    })
  }

  /**
   * Add a disjunction case
   */
  caseWhen<N, B extends N, R2>(match: TypeMatcher<N>, handle: (val: B) => R2): DisjunctionCase<M, A, R, N, B, R2> {
    return new DisjunctionCase(
      new SingleCase(this.match, this.handle), // head case - handled first
      new SingleCase(match, handle) // tail case - handled last
    )
  }

  caseDefault<R2>(def: () => R2): DefaultCase<R | R2> {
    return new DefaultCase<R | R2>(this, def)
  }
}

/**
 * DisjunctionCase - composes tail and head cases
 *
 * @param tailCases - chain of previous cases, tail executes first
 * @param headCase - head case (referenced), to be executed last in the chain
 */
export class DisjunctionCase<M, A extends M, R, N, B extends N, R2> implements MatchCase<A | B, R | R2>, PartialMatchCase<A | B, R | R2> {
  constructor(
    private readonly tailCases: PartialMatchCase<any, R | R2>,
    private readonly headCase: PartialMatchCase<any, R | R2>) {
  }

  partMap(val: A | B, def: () => R | R2): R | R2 {
    return this.tailCases.partMap(val, (): R | R2 => {
      return this.headCase.partMap(val, def)
    })
  }

  /**
   * When called directly on DisjunctionCase - will throw an error if input value not covered
   */
  map(val: A | B): R | R2 {
    return this.partMap(val, () => {
      throw new Error("No match")
    })
  }

  caseWhen<U, C extends U, R3>(match: TypeMatcher<U>, handle: (val: C) => R3): DisjunctionCase<M | N, A | B, R | R2, U, C, R3> {
    return new DisjunctionCase<M | N, A | B, R | R2, U, C, R3>(
      this.tailCases,
      new SingleCase(match, handle)
    )
  }

  caseDefault<R3>(def: () => R3): DefaultCase<R | R2 | R3> {
    return new DefaultCase<R | R2 | R3>(this, def)
  }
}

/**
 * Last case in a chain of cases (default)
 */
export class DefaultCase<R> implements MatchCase<any, R> {
  constructor(
    private readonly tailCase: PartialMatchCase<any, R>,
    private readonly def: () => R) {
  }

  map(val: any): R {
    return this.tailCase.partMap(val, this.def)
  }
}

/**
 * Case always evaluates to given expression result
 */
export class EvalCase<R> implements MatchCase<any, R> {
  constructor(private readonly val: () => R) {}

  map(val: any): R {
    return this.val()
  }
}

/**
 * Case handler for type A
 *
 * @param match matcher used to verify input value
 * @param map map function
 */
export function caseWhen<M, A extends M, R>(match: TypeMatcher<M>, map: (val: A) => R): SingleCase<M, A, R> {
  return new SingleCase(match, map)
}

/**
 * Create new default case handler - matches any type
 *
 * @param val default value expression
 */
export function caseDefault<R>(val: () => R): EvalCase<R> {
  return new EvalCase(val)
}

/**
 * Pattern Matching syntax sugar
 *
 * Equivalent to Case<C, R>.map(val)
 * @param val input value to match
 * @param cases match cases
 */
export function match<I extends C, C, R>(val: I, cases: MatchCase<C, R>): R {
  return cases.map(val)
}
