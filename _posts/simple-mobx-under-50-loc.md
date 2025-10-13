---
title: "A simple Mobx under 50 LOC to understand observer pattern"
excerpt: "Mobx uses observer pattern with a smart approach to create subscriptions implicitly. Some developers call it 'magic', but there's no magic at all - just pure ingenuity. Let's build a simplified version to understand how it works."
date: "2021-11-20"
---

Mobx uses observer pattern. The classic observer pattern requires users to manually subscribe for changes. Mobx uses a smart approach to create subscriptions implicitly. Some developers claimed it as "magic" of Mobx. The goal of the article is to describe you how implicit subscriptions work under the hood. Knowing this you can always find the reason why a component isn't updating/re-rendering when store changes. In this article I won't use proxy, decorators, classes to keep things simple. I expect you to be familiar with Mobx basics like observable, observer and autorun.

## Step 1. Implementing observable using classic observer pattern

Let's implement observable using classic [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern#JavaScript). An observable is an object that notifies listeners whenever a value changes. You can remove and add listeners.

```javascript
const observable = (value) => ({
  value,
  listeners: new Set(),
  subscribe(listener) {
    this.listeners.add(listener)
  },
  unsubscribe(listener) {
    this.listeners.delete(listener)
  },
  get() {
    return this.value
  },
  set(value) {
    this.value = value
    this.listeners.forEach((listener) => listener())
  },
});
```

Nothing fancy here. Let's test it:

```javascript
const title = observable('Mobx article');
const views = observable(10);

const listener = () => console.log(title.get());
title.subscribe(listener);

title.set('Lets write Mobx under 50 LOC');
views.set(11);
```

Output:

```
Lets write Mobx under 50 LOC
```

So here we created 2 observables - title and views, then we updated both of them. Notice that we subscribed only for title changes that's why console.log was triggered only once. If you encounter reactivity loss in Mobx (e.g. a component isn't re-rendering after store update) it means that there is no subscription.

## Step 2. Connecting to React

Let's connect the code above to React. We want our component to update whenever an observable changes:

```javascript
const useRerender = () => {
  const [, setValue] = useState();
  return () => setValue([]);
}

const Article = () => {
  const rerender = useRerender();

  useEffect(() => {
    title.subscribe(rerender);
    views.subscribe(rerender);
    return () => {
      title.unsubscribe(rerender);
      views.unsubscribe(rerender);
    }
  }, []);

  return <div>
    Article title: {title.get()}
    Views: {views.get()}
  </div>
}
```

We created a custom hook to force component rerender. useEffect is used to manually subscribe for changes title and views. These subscriptions are explicit. It's easy to realize that such approach is going to be very verbose and error prone. We clearly see the duplication. You may forgot to subscribe for observable, may forgot to unsubscribe. You may forgot to remove subscription if component no longer needs some observable. Wouldn't it be cool if subscriptions and unsubscriptions were automatic? Mobx does exactly that!

## Step 3. Implementing implicit subscriptions

In order to understand which observables a component should listen to, Mobx keeps track of accessed observables during component rendering. Let's recreate Mobx [autorun](https://mobx.js.org/reactions.html#autorun) to demonstrate that:

```javascript
const readObservables = new Set();

const observable = (value) => ({
  value,
  listeners: new Set(),
  subscribe(listener) {
    this.listeners.add(listener)
  },
  unsubscribe(listener) {
    this.listeners.delete(listener)
  },
  get() {
    readObservables.add(this) // <-- Remember this variable whenever it gets accessed
    return this.value
  },
  set(value) {
    this.value = value
    this.listeners.forEach((listener) => listener())
  },
});

const autorun = (fn) => {
  readObservables.clear();
  fn();
  readObservables.forEach(observable => observable.subscribe(fn))

  return () => readObservables.forEach(observable => observable.unsubscribe(fn))
}
```

Here we created a set of accessed observables during render. We push observables to it during running fn function. When we have a list of accessed observables we can subscribe to them. Let's test it:

```javascript
const title = observable('Mobx article');
const views = observable(10);

const dispose = autorun(() => {
  console.log(`Article: "${title.get()}". Views: ${views.get()}`);
});

views.set(11);
title.set('Lets write Mobx under 50 LOC');

dispose();

views.set(12)
```

Output:

```
Article "Mobx article". Views 10
Article "Mobx article". Views 11
Article "Lets write Mobx under 50 LOC". Views 11
```

As you can see our implicit subscriptions work. After calling dispose there is no console output because calling dispose unsubscribes from the observables. It's similar to [how Mobx works](https://mobx.js.org/reactions.html#always-dispose-of-reactions).

## Step 4. Creating observer HOC

Let's use this knowledge to create a simple observer HOC to match Mobx API:

```javascript
const useRerender = () => {
  const [, setValue] = useState([]);
  return () => setValue([])
}

const observer = (component) => (...props) => {
  const rerender = useRerender();
  readObservables.clear();
  const result = component(...props);
  readObservables.forEach(observable => observable.subscribe(rerender))

  useEffect(() => {
    return () => readObservables.forEach(observable => observable.unsubscribe(rerender));
  }, [])

  return result;
}
```

The function is very similar to our autorun except it's HOC and it returns the rendered component. Here is a working [CodeSandbox example](https://codesandbox.io/s/mystifying-jones-vc18p?file=/index.js).

## Conclusion

We created an oversimplified version of Mobx to better understand how its "magic" works. Hope you see that there is no magic at all! Just pure ingenuity. Of course we haven't touched a lot of topics such as proxy, decorators, how Mobx understand when to subscribe if there is an if statement inside render function. I intentionally avoided these topics to simplify the article. Hope you liked it.
