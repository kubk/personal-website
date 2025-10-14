export const petProjects = [
  {
    url: "https://github.com/kubk/memo-card",
    title: "MemoCard",
    description:
      "Award-winning Telegram mini app for improving memory with spaced repetition",
  },
  {
    url: "https://github.com/kubk/mobx-log",
    title: "mobx-log",
    description: "Logging library for MobX.",
    additionalLink: {
      url: "https://npm-stat.com/charts.html?package=mobx-log&from=2020-02-12",
      text: "500k+",
    },
    additionalText: "total downloads",
  },
] as const;

export const gitHubContributions = [
  {
    name: "mobx",
    stars: "28.1k+",
    type: "multiple" as const,
    count: 23,
    countLink:
      "https://github.com/mobxjs/mobx/pulls?q=is%3Apr+is%3Aclosed+author%3Akubk",
    examplePrLink: "https://github.com/mobxjs/mobx/pull/2213",
    examplePrTitle: "Fix type inference of the action callback arguments",
    badge: "merged",
  },
  {
    name: "phpstan",
    stars: "13.7k+",
    type: "single" as const,
    prLink: "https://github.com/phpstan/phpstan-src/pull/2371",
    prTitle: "Detect enum duplicated values",
    badge: "merged",
  },
  {
    name: "wavesurfer.js",
    stars: "9.7k+",
    type: "single" as const,
    prLink: "https://github.com/katspaugh/wavesurfer.js/pull/1760",
    prTitle: "Waveform with rounded bars",
    badge: "merged",
  },
  {
    name: "assistant-ui",
    stars: "6.7k+",
    type: "single" as const,
    prLink: "https://github.com/assistant-ui/assistant-ui/pull/1711",
    prTitle: "Add support for dynamic headers in EdgeChatAdapter",
    badge: "merged",
  },
  {
    name: "ts-essentials",
    stars: "4.0k+",
    type: "single" as const,
    prLink: "https://github.com/ts-essentials/ts-essentials/pull/136",
    prTitle: "Simplify Merge type",
    badge: "merged",
  },
  {
    name: "construct-js",
    stars: "1.4k+",
    type: "single" as const,
    prLink: "https://github.com/francisrstokes/construct-js/pull/30",
    prTitle: "Use TS assertion signature to avoid type casting",
    badge: "merged",
  },
  {
    name: "mobx-angular",
    stars: "479",
    type: "multiple" as const,
    count: 10,
    countLink:
      "https://github.com/mobxjs/mobx-angular/pulls?q=is%3Apr+is%3Aclosed+author%3Akubk",
    examplePrLink: "https://github.com/mobxjs/mobx-angular/pull/101",
    examplePrTitle: "Replace Karma with Jest, run tests on CI",
    badge: "merged",
  },
] as const;

export const publications = [
  {
    url: "https://habr.com/ru/articles/911996/",
    title: "Why I fix bugs for free and how it changed my career",
    meta: "(in Russian, 15K views)",
    badge: "4th place in Habr Open Source competition (80+ entries)",
  },
  {
    url: "https://habr.com/ru/articles/779508/",
    title: "How I built a project for myself and won a prize from Telegram",
    meta: "(in Russian, 21K views)",
    badge: "Habr Technotext 2023 Nominee",
  },
] as const;

export const talks = [
  {
    url: "https://www.youtube.com/watch?v=Tra9NbAwSEY",
    title: "Using Supabase in a real-world project",
  },
] as const;

export const blogPosts = [
  {
    url: "https://teletype.in/@alteregor/how-to-integrate-telegram-stars",
    title: "How to integrate Telegram Stars Payment to your bot",
    views: "(19.7K views)",
  },
  {
    url: "https://teletype.in/@alteregor/rkPlgmQz8",
    title: "The difference between type and interface in TypeScript",
    views: "(11.6K views)",
  },
  {
    url: "https://teletype.in/@alteregor/memocard-telegram-contest-win",
    title: "How I built a project for myself and won a prize from Telegram",
    views: "(817 views)",
  },
  {
    url: "https://teletype.in/@alteregor/cra-multiple-entry-points",
    title:
      "Configure multiple entry points for Create React App without the eject",
    views: "(4.6K views)",
  },
  {
    url: "https://teletype.in/@alteregor/mobx-50-loc",
    title: "A simple Mobx under 50 LOC to understand observer pattern",
    views: "(2.3K views)",
  },
] as const;
