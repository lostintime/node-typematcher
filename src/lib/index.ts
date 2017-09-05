/**
 * TypeMatcher is a function returning true if input val matches given type T
 */
export type TypeMatcher<T> = (val: any) => val is T;

/**
 * Object fields type matchers structure
 */
export type FieldsMatcher<T> = { [P in keyof T]: TypeMatcher<T[P]> };

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

export function isTuple1<A>(matcher: [TypeMatcher<A>]): TypeMatcher<[A]> {
  return function value(val: any): val is [A] {
    return isExactArray(matcher, val);
  };
}

export function isTuple2<A, B>(matcher: [TypeMatcher<A>, TypeMatcher<B>]): TypeMatcher<[A, B]> {
  return function value(val: any): val is [A, B] {
    return isExactArray(matcher, val);
  };
}

export function isTuple3<A, B, C>(matcher: [TypeMatcher<A>, TypeMatcher<B>, TypeMatcher<C>]): TypeMatcher<[A, B, C]> {
  return function value(val: any): val is [A, B, C] {
    return isExactArray(matcher, val);
  };
}

export function isTuple4<A, B, C, D>(matcher: [TypeMatcher<A>, TypeMatcher<B>, TypeMatcher<C>, TypeMatcher<D>]): TypeMatcher<[A, B, C, D]> {
  return function value(val: any): val is [A, B, C, D] {
    return isExactArray(matcher, val);
  };
}

export function isTuple5<A, B, C, D, E>(matcher: [TypeMatcher<A>, TypeMatcher<B>, TypeMatcher<C>, TypeMatcher<D>, TypeMatcher<E>]): TypeMatcher<[A, B, C, D, E]> {
  return function value(val: any): val is [A, B, C, D, E] {
    return isExactArray(matcher, val);
  };
}

export function isTuple6<A, B, C, D, E, F>(matcher: [TypeMatcher<A>, TypeMatcher<B>, TypeMatcher<C>, TypeMatcher<D>, TypeMatcher<E>, TypeMatcher<F>]): TypeMatcher<[A, B, C, D, E, F]> {
  return function value(val: any): val is [A, B, C, D, E, F] {
    return isExactArray(matcher, val);
  };
}

export function isTuple7<A, B, C, D, E, F, G>(matcher: [TypeMatcher<A>, TypeMatcher<B>, TypeMatcher<C>, TypeMatcher<D>, TypeMatcher<E>, TypeMatcher<F>]): TypeMatcher<[A, B, C, D, E, F, G]> {
  return function value(val: any): val is [A, B, C, D, E, F, G] {
    return isExactArray(matcher, val);
  };
}

export function isTuple8<A, B, C, D, E, F, G, H>(matcher: [TypeMatcher<A>, TypeMatcher<B>, TypeMatcher<C>, TypeMatcher<D>, TypeMatcher<E>, TypeMatcher<F>, TypeMatcher<G>]): TypeMatcher<[A, B, C, D, E, F, G, H]> {
  return function value(val: any): val is [A, B, C, D, E, F, G, H] {
    return isExactArray(matcher, val);
  };
}

export function isTuple9<A, B, C, D, E, F, G, H, I>(matcher: [TypeMatcher<A>, TypeMatcher<B>, TypeMatcher<C>, TypeMatcher<D>, TypeMatcher<E>, TypeMatcher<F>, TypeMatcher<G>, TypeMatcher<H>]): TypeMatcher<[A, B, C, D, E, F, G, H, I]> {
  return function value(val: any): val is [A, B, C, D, E, F, G, H, I] {
    return isExactArray(matcher, val);
  };
}

export function isTuple10<A, B, C, D, E, F, G, H, I, J>(matcher: [TypeMatcher<A>, TypeMatcher<B>, TypeMatcher<C>, TypeMatcher<D>, TypeMatcher<E>, TypeMatcher<F>, TypeMatcher<G>, TypeMatcher<H>, TypeMatcher<I>]): TypeMatcher<[A, B, C, D, E, F, G, H, I, J]> {
  return function value(val: any): val is [A, B, C, D, E, F, G, H, I, J] {
    return isExactArray(matcher, val);
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
export type MatchCaseResult<T> = CaseMatch<T> | CaseMiss

/**
 * Defines a case to be used with match
 */
export type MatchCase<T> = (val: any) => MatchCaseResult<T>;


/**
 * Match value against all given matchers, return when on first match,
 * Throws error if none matched
 * This method should be used with caseWhen, caseAny, caseDefault methods
 */
export function match(val: any): <R>(...cases: MatchCase<R>[]) => R {
  return function against<R>(...cases: MatchCase<R>[]): R {
    for (const m of cases) {
      const r = m(val);
      if (r !== false) {
        return r.match;
      }
    }

    throw new Error("No match");
  };
}

/**
 * Maps over value if successfully matched by matcher
 */
export function caseWhen<T>(matcher: TypeMatcher<T>): <U>(h: (v: T) => U) => MatchCase<U> {
  return function map<U>(f: (v: T) => U): MatchCase<U> {
    return function value(val: any): MatchCaseResult<U> {
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
 * Just a wrapper to throw given error
 */
export function caseThrow<U>(err: Error): MatchCase<U> {
  throw err;
}
