---
title: "The difference between type and interface in TypeScript"
excerpt: "Type and interface in TypeScript often confuse people because they look similar on the surface. The situation gets worse with outdated articles, biased comparisons, and style guides from some frameworks."
date: "2020-02-02"
---

Type and interface in TypeScript often confuse people because they look similar on the surface. The situation gets worse with outdated articles, biased comparisons, and style guides from some frameworks. For example, Angular has the tslint rule interface-over-type-literal enabled by default, which forces you to use interfaces instead of types wherever possible. In this article, we'll look at the difference between type and interface in TypeScript and figure out what you should actually use.

## Similarities

Interfaces and types can be used to describe data structures:

```typescript
type Employee = {
  salary: number;
}

// Or
interface Employee {
  salary: number;
}
```

Can be used for typing functions:

```typescript
interface CalculateSalary {
  (employee: Employee): number;
}

// Or

type CalculateSalary = (employee: Employee) => number;
```

Interfaces and types can be implemented by classes:

```typescript
type Employee = {
  giveEstimate(task: Task): number;
}

// Or

interface Employee {
  giveEstimate(task: Task): number;
}

class YoungDeveloper implements Employee {
  giveEstimate(task: Task): number {
    return task.complexity * 0.01;
  }
}

class MatureDeveloper implements Employee {
  giveEstimate(task: Task): number {
    return task.complexity * random(10, 1000) * Math.PI;
  }
}
```

Interfaces and types allow expressing type intersections:

```typescript
type TwitterProfile = Photographer & Musician & Entrepreneur & CoffeeDrinker;

// Or

interface TwitterProfile extends Photographer, Musician, Entrepreneur, CoffeeDrinker {};
```

## Difference 1 - Mapped Types

Interfaces cannot be combined with mapped types (Required, Pick, Readonly, Partial, and others):

```typescript
// Works with type
type RealProfile = Pick<TwitterProfile, 'drinkCoffee'>;

// Doesn't work with interface
interface RealProfile extends Pick<TwitterProfile, 'drinkCoffee'> {};
```

An interface can only extend interfaces, classes, or other types, so the code needs to be rewritten like this:

```typescript
type OnlyDrinksCoffee = Pick<TwitterProfile, 'drinkCoffee'>;

interface RealProfile extends OnlyDrinksCoffee {}
```

For the same reason, only with a type can you require that all properties be mandatory or conversely optional:

```typescript
type TraineeDeveloper = Partial<{
  salary: number;
  sleep: boolean;
  eat: boolean;
}>

// Can exist without salary, food, and sleep
const trainee: TraineeDeveloper = {}
```

## Difference 2 - Union

Interfaces allow expressing type intersections, but don't allow expressing unions. Example of a constraint with types that's unrealizable with interfaces:

```typescript
type Wish =
  | { fast: true, quality: true, cheap: false } // Expensive
  | { fast: true, quality: false, cheap: true } // Poor quality
  | { fast: false, quality: true, cheap: true } // Slow

// Won't compile
const wish: Wish = { fast: true, quality: true, cheap: true }
```

## Difference 3 - Declaration merging

Interfaces support declaration merging - merging interfaces with the same names:

```typescript
interface Employee {
  salary: number;
}

interface Employee {
  age: number;
}

// Compilation error, as salary wasn't provided
const employee: Employee = { age: 23 };
```

This feature can be used if third-party library typings are outdated and you need to extend the interface with missing properties and methods. If you're making your own library, then it's up to you whether to provide such extension points. If the library is in TypeScript - then you shouldn't, as the type declarations in the output will always be up-to-date and users won't need to fix discrepancies between types and runtime. Nowadays, more and more libraries are written directly in TypeScript or come with typings, so the need to use declaration merging arises less frequently. Additionally, not everything can be fixed in an outdated interface - you can't remove a property or change the type of an existing one:

```typescript
interface Employee {
  salary: number;
}

interface Employee {
  salary?: number;
}

// Error, an employee still demands salary
const employee: Employee = {};
```

## Difference 4 - Recursive types

Before TypeScript 3.7, there were differences in how recursive types and interfaces worked. With types, you couldn't type recursive structures, but in newer versions of the language, there's no problem. Details in the language release notes. Check [here](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#more-recursive-type-aliases) for more details.

## Difference 5 - Compatibility with Record Type

Because interface supports declaration merging (can be extended anywhere), it cannot be used where Record<string, any> is expected. This can be a problem in situations where you need to use URLSearchParams or other browser APIs expecting Record<string, any>:

```typescript
interface Employee {
  name: string;
}

const employee: Employee = { name: '' }

new URLSearchParams(employee);
```

This code won't compile with an interface, but will work if you change the interface to a type.

## Conclusion

Types are the more preferable option, as you can replace interfaces with types, but not vice versa. For using TypeScript's advanced functionality - mapped types, union types, and conditional types - interfaces won't work.
