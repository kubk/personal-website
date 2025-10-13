---
title: "Reasons to avoid default exports in JavaScript"
excerpt: "In ES6, there are two ways to export classes, functions, and variables from modules - named export and default export. Default exports have several disadvantages compared to named exports."
date: "2019-11-10"
---

In ES6, there are two ways to export classes, functions, and variables from modules - named export and default export.

## Named export

For named exports, the `export` keyword is used next to the class, function, or variable being exported. When importing, curly braces are used:

```javascript
// sms-sender.js
export class SmsSender {
  sendMessage(phone, text) {
    // Implementation
  }
}
```

```javascript
// app.js
import { SmsSender } from './sms-sender';
```

## Default export

For default exports, `export default` is used. When importing, curly braces are not used:

```javascript
// sms-sender.js
export default class SmsSender {
  sendMessage(phone, text) {
    // Implementation
  }
}
```

```javascript
// app.js
import SmsSender from './sms-sender';
```

Default exports have several disadvantages compared to named exports.

## Possible mismatch of names in imports and exports

A module can have at most 1 default export, so the exported entity may not have a name. For the same reason, there's no restriction on what name the entity is imported under, which in practice leads to problems - if a class is renamed, developer might forget to update the name in all imports. Unlike named exports, default exports allow importing the same entity under different names in different places, which is not uncommon in large projects. The need to remember that an entity appears in the code under several names increases cognitive load, as you need to remember more insignificant details.

## Simpler re-export

Using re-export is justified if you're writing a library for general use. Re-export allows library users to use only those modules that are exported externally, making the remaining modules private and inaccessible from outside. For private modules, backward compatibility is not required, meaning you can change the internals as you like without fear of breaking something for library users. If all exports are named, you can re-export them like this:

```javascript
export * from './canvas';
```

For default exports, you need to keep in mind that they are handled differently:

```javascript
export * from './canvas';
export { default as Canvas } from './canvas';
```

## Lack of automatic import by IDE

VSCode and WebStorm can automatically insert imports for default and named exports. However, if the exported entity has no name, automatic import insertion won't work. Such functions can be [even found even in popular open-source projects](https://github.com/zalmoxisus/mobx-remotedev/blob/master/index.d.ts#L12):

```typescript
export default function<T>(store: T, config?: RemoteDevConfig): T;
```

Named export always requires specifying a name, so this problem doesn't occur with it.

## Default export of an anonymous function

In React projects, you can sometimes encounter this construct:

```javascript
export default ({ onClick }) => {
  // Component implementation
}
```

Because the function is unnamed, such a component will be displayed in React Devtools as Unknown, as React names components based on the function or class name. A large number of unnamed components will complicate debugging in Devtools.

## Conclusion

Thus, using named exports instead of default ones frees us from accidental complexity, simplifies code through uniformity, allowing us to think less about how to export classes, functions, and variables. To prohibit default exports, you can use ESLint and TSLint rules:

- [https://palantir.github.io/tslint/rules/no-default-export/](https://palantir.github.io/tslint/rules/no-default-export/)
- [https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md)
