/**
 * TypeMatcher is a function returning true if input val matches given type T
 */
export type TypeMatcher<T> = (val: any) => val is T;

/**
 * Object fields type matchers structure
 */
export type FieldsMatcher<T> = { [P in keyof T]: TypeMatcher<T[P]> };

/**
 * Type alias for errors
 */
export type Throwable = Error | Object

/**
 * Match any of input values
 */
export function isAny(val: any): val is any {
  return true;
}

/**
 * Match none of input values
 */
export function isNever(val: any): val is any {
  return false;
}

/**
 * Match string values
 */
export function isString(val: any): val is string {
  // Honestly stolen from https://github.com/lodash/lodash/blob/master/isString.js
  const type = typeof val;
  return type == 'string' || (type == 'object' && val != null && !Array.isArray(val) && Object.prototype.toString.call(val) == '[object String]')
}

/**
 * Match number values
 */
export function isNumber(value: any): value is number {
  // Honestly stolen from https://github.com/lodash/lodash/blob/master/isNumber.js
  return typeof value == 'number' ||
    (typeof value == 'object' && value !== null && Object.prototype.toString.call(value) == '[object Number]');
}

/**
 * Match number values but not NaN or Infinite
 */
export function isFiniteNumber(value: any): value is number {
  return isNumber(value) && !isNaN(value) && isFinite(value);
}

/**
 * Match boolean values
 */
export function isBoolean(value: any): value is boolean {
  // Honestly stolen from https://github.com/lodash/lodash/blob/master/isBoolean.js
  return value === true || value === false ||
    (typeof value == 'object' && value !== null && Object.prototype.toString.call(value) == '[object Boolean]');
}

/**
 * Match object values
 */
export function isObject(value: any): value is object {
  // Honestly stolen from https://github.com/lodash/lodash/blob/master/isObject.js
  const type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}


/**
 * Check value built with given constructor function
 */
export function isInstanceOf<T>(fnCtor: new (...args: any[]) => T): TypeMatcher<T> {
  return function value(val: any): val is T {
    return val instanceof fnCtor;
  }
}


/**
 * Match input value is array of T using given matcher
 * isArrayOf(isString)([1]) => false
 * isArrayOf(isNumber)([1]) => true
 * isArrayOf(isString)(["one", 1]) => false
 */
export function isArrayOf<T>(matcher: TypeMatcher<T>): TypeMatcher<Array<T>> {
  return function value(val: any): val is Array<T> {
    if (Array.isArray(val)) {
      for (const item of val) {
        if (!matcher(item)) {
          // one of items doesn't match, fail fast
          return false;
        }
      }

      return true;
    }

    return false;
  };
}


/**
 * Match exact value
 */
export function isValue<T>(v: T): TypeMatcher<T> {
  return function value(val: any): val is T {
    return v === val;
  }
}

const isNullF = isValue(null);

/**
 * Match null
 */
export function isNull(val: any): val is null {
  return isNullF(val);
}

const isUndefinedF = isValue(undefined);

/**
 * Match undefined
 */
export function isUndefined(val: any): val is undefined {
  return isUndefinedF(val);
}

const isMissingF = isEither(isNull, isUndefined);

/**
 * Match null | undefined
 */
export function isMissing(val: any): val is null | undefined {
  return isMissingF(val);
}

/**
 * Match object fields by given matchers
 * hasFields({id: isNumber})({id: "aloha"}) => false
 */
export function hasFields<T>(matcher: FieldsMatcher<T>): TypeMatcher<T> {
  return function value(val: any): val is T {
    if (isObject(val)) {
      for (const pKey in matcher) {
        const v = val.hasOwnProperty(pKey) ? (<any>val)[pKey] : undefined;

        if (!matcher[pKey](v)) {
          // one of required fields doesn't match, fail fast
          return false;
        }
      }

      return true;
    }

    return false;
  };
}


/**
 * Given array of matchers, and array - match every value using matcher from same position
 * this is internally used for tuples
 */
function isExactArray(matcher: Array<TypeMatcher<any>>, val: any): val is Array<any> {
  if (Array.isArray(val) && val.length == matcher.length) {
    for (const k in matcher) {
      if (!matcher[k](val[k])) {
        return false;
      }
    }
    return true;
  }

  return false;

}

export function isTuple1<A>(a: TypeMatcher<A>): TypeMatcher<[A]> {
  return function value(val: any): val is [A] {
    return isExactArray([a], val);
  };
}

export function isTuple2<A, B>(a: TypeMatcher<A>, b: TypeMatcher<B>): TypeMatcher<[A, B]> {
  return function value(val: any): val is [A, B] {
    return isExactArray([a, b], val);
  };
}

export function isTuple3<A, B, C>(a: TypeMatcher<A>, b: TypeMatcher<B>, c: TypeMatcher<C>): TypeMatcher<[A, B, C]> {
  return function value(val: any): val is [A, B, C] {
    return isExactArray([a, b, c], val);
  };
}

export function isTuple4<A, B, C, D>(a: TypeMatcher<A>, b: TypeMatcher<B>, c: TypeMatcher<C>, d: TypeMatcher<D>): TypeMatcher<[A, B, C, D]> {
  return function value(val: any): val is [A, B, C, D] {
    return isExactArray([a, b, c, d], val);
  };
}

export function isTuple5<A, B, C, D, E>(a: TypeMatcher<A>, b: TypeMatcher<B>, c: TypeMatcher<C>, d: TypeMatcher<D>, e: TypeMatcher<E>): TypeMatcher<[A, B, C, D, E]> {
  return function value(val: any): val is [A, B, C, D, E] {
    return isExactArray([a, b, c, d, e], val);
  };
}

export function isTuple6<A, B, C, D, E, F>(a: TypeMatcher<A>, b: TypeMatcher<B>, c: TypeMatcher<C>, d: TypeMatcher<D>, e: TypeMatcher<E>, f: TypeMatcher<F>): TypeMatcher<[A, B, C, D, E, F]> {
  return function value(val: any): val is [A, B, C, D, E, F] {
    return isExactArray([a, b, c, d, e, f], val);
  };
}

export function isTuple7<A, B, C, D, E, F, G>(a: TypeMatcher<A>, b: TypeMatcher<B>, c: TypeMatcher<C>, d: TypeMatcher<D>, e: TypeMatcher<E>, f: TypeMatcher<F>, g: TypeMatcher<G>): TypeMatcher<[A, B, C, D, E, F, G]> {
  return function value(val: any): val is [A, B, C, D, E, F, G] {
    return isExactArray([a, b, c, d, e, f, g], val);
  };
}

export function isTuple8<A, B, C, D, E, F, G, H>(a: TypeMatcher<A>, b: TypeMatcher<B>, c: TypeMatcher<C>, d: TypeMatcher<D>, e: TypeMatcher<E>, f: TypeMatcher<F>, g: TypeMatcher<G>, h: TypeMatcher<H>): TypeMatcher<[A, B, C, D, E, F, G, H]> {
  return function value(val: any): val is [A, B, C, D, E, F, G, H] {
    return isExactArray([a, b, c, d, e, f, g, h], val);
  };
}

export function isTuple9<A, B, C, D, E, F, G, H, I>(a: TypeMatcher<A>, b: TypeMatcher<B>, c: TypeMatcher<C>, d: TypeMatcher<D>, e: TypeMatcher<E>, f: TypeMatcher<F>, g: TypeMatcher<G>, h: TypeMatcher<H>, i: TypeMatcher<I>): TypeMatcher<[A, B, C, D, E, F, G, H, I]> {
  return function value(val: any): val is [A, B, C, D, E, F, G, H, I] {
    return isExactArray([a, b, c, d, e, f, g, h, i], val);
  };
}

export function isTuple10<A, B, C, D, E, F, G, H, I, J>(a: TypeMatcher<A>, b: TypeMatcher<B>, c: TypeMatcher<C>, d: TypeMatcher<D>, e: TypeMatcher<E>, f: TypeMatcher<F>, g: TypeMatcher<G>, h: TypeMatcher<H>, i: TypeMatcher<I>, j: TypeMatcher<J>): TypeMatcher<[A, B, C, D, E, F, G, H, I, J]> {
  return function value(val: any): val is [A, B, C, D, E, F, G, H, I, J] {
    return isExactArray([a, b, c, d, e, f, g, h, i, j], val);
  };
}

/**
 * Builds new matcher for types matching both: matcher1 and matcher2
 */
export function isBoth<A, B>(matcher1: TypeMatcher<A>, matcher2: TypeMatcher<B>): TypeMatcher<A & B> {
  return function value(val: any): val is A & B {
    return matcher1(val) && matcher2(val);
  }
}

/**
 * Builds new matcher for types matching any of matcher1 or matcher2
 */
export function isEither<A, B>(matcher1: TypeMatcher<A>, matcher2: TypeMatcher<B>): TypeMatcher<A | B> {
  return function value(val: any): val is A | B {
    return matcher1(val) || matcher2(val);
  };
}

/**
 * Builds new matcher for value which may be undefined
 */
export function isOptional<T>(matcher: TypeMatcher<T>): TypeMatcher<T | undefined> {
  return isEither(isUndefined, matcher);
}

/**
 * Builds new matcher for value which may be null
 */
export function isNullable<T>(matcher: TypeMatcher<T>): TypeMatcher<T | null> {
  return isEither(isNull, matcher);
}

/**
 * Builds new matcher which throws an error on miss
 * Can be used to provide more useful errors in combination with hasFields() and match()/matchWith()
 *
 * ```
 * const result = matchWith(
 *   caseId(
 *     hasFields({
 *       title: failWith(new Error("Invalid title: string expected"))(isString),
 *       description: failWith(new Error('Invalid description: string or undefined expected'))(isOptional(isString)),
 *     })
 *   )
 * )
 * ```
 */
export function failWith(err: Throwable): <T>(matcher: TypeMatcher<T>) => TypeMatcher<T> {
  return function on<T>(matcher: TypeMatcher<T>): TypeMatcher<T> {
    return function value(val: any): val is T {
      if (matcher(val)) {
        return true;
      }

      throw err;
    }
  }
}

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
export type MatchCase<T> = (val: any) => CaseResult<T>;

/**
 * matchWith is same as match() only with inverse arguments order,
 * this can be used to pre-build matchers and save some CPU cycles
 */
export function matchWith<R>(...cases: MatchCase<R>[]): (val: any) => R {
  return function value(val: any): R {
    for (const m of cases) {
      const r = m(val);
      if (r !== false) {
        return r.match;
      }
    }

    throw new Error("No match");
  }
}

/**
 * Match value against all given matchers, return when on first match,
 * Throws error if none matched
 * This method should be used with caseWhen, caseAny, caseDefault methods
 */
export function match(val: any): <R>(...cases: MatchCase<R>[]) => R {
  return function cases<R>(...cases: MatchCase<R>[]): R {
    return matchWith(...cases)(val);
  };
}

/**
 * Maps over value if successfully matched by matcher
 */
export function caseWhen<T>(matcher: TypeMatcher<T>): <U>(h: (v: T) => U) => MatchCase<U> {
  return function map<U>(f: (v: T) => U): MatchCase<U> {
    return function value(val: any): CaseResult<U> {
      if (matcher(val)) {
        return {match: f(val)};
      }

      return false;
    }
  };
}

/**
 * Case for any value match (use for default handling)
 */
export function caseAny<U>(h: (val: any) => U): MatchCase<U> {
  return caseWhen(isAny)(h);
}

/**
 * Just an alias for caseAny
 */
export function caseDefault<U>(h: () => U): MatchCase<U> {
  return caseAny(() => h());
}

/**
 * Identity case
 */
export function caseId<T>(matcher: TypeMatcher<T>): MatchCase<T> {
  return caseWhen(matcher)(v => v);
}

/**
 * Just a wrapper to throw given error
 */
export function caseThrow<U>(err: Throwable): MatchCase<U> {
  return (val: any) => {
    throw err;
  };
}
