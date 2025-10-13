import { Container } from "@/app/_components/container";
import { Header } from "@/app/_components/header";
import { Badge } from "@/app/_components/badge";

export default function Index() {
  return (
    <main>
      <Header />
      <Container>
        <div className="py-16">
          <div className="flex gap-6 mb-12">
            <div className="flex-shrink-0 hidden sm:block">
              <img
                src="https://avatars.githubusercontent.com/u/22447849?v=4"
                alt="Egor Gorbachev"
                className="rounded-full w-28 h-28 border-4 border-white shadow-[0_0_0_2px] shadow-slate-300"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="mb-3 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold">
                Egor Gorbachev
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                <a
                  href="https://github.com/kubk"
                  className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900 hover:text-slate-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/kubk
                </a>
                <span className="text-slate-400">•</span>
                <a
                  href="mailto:7gorbachevm@gmail.com"
                  className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900 hover:text-slate-900"
                >
                  7gorbachevm@gmail.com
                </a>
              </div>
              <p className="text-lg text-slate-600">
                Hi there 👋 I am a full-stack developer passionate about UI/UX,
                static typing, and software testing
              </p>
            </div>
          </div>

          <div className="space-y-12 max-w-4xl">
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
                Pet projects:
              </h2>
              <ul className="space-y-4 text-slate-700">
                <li>
                  <a
                    href="https://github.com/kubk/memo-card"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900 font-medium text-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MemoCard
                  </a>{" "}
                  - Award-winning Telegram mini app for improving memory with
                  spaced repetition
                </li>
                <li>
                  <a
                    href="https://github.com/kubk/mobx-log"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900 font-medium text-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    mobx-log
                  </a>{" "}
                  - Logging library for MobX.{" "}
                  <a
                    href="https://npm-stat.com/charts.html?package=mobx-log&from=2020-02-12"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900 font-medium text-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    500k+
                  </a>{" "}
                  total downloads
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
                My contributions to Open Source:
              </h2>
              <ul className="space-y-4 text-slate-700">
                <li>
                  <span className="font-medium text-slate-900">mobx</span>{" "}
                  (⭐28.1k+️) -{" "}
                  <a
                    href="https://github.com/mobxjs/mobx/pulls?q=is%3Apr+is%3Aclosed+author%3Akubk"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    23 PRs
                  </a>
                  . Example PR -{" "}
                  <a
                    href="https://github.com/mobxjs/mobx/pull/2213"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fix type inference of the action callback arguments
                  </a>{" "}
                  <Badge text="merged" />
                </li>
                <li>
                  <span className="font-medium text-slate-900">phpstan</span>{" "}
                  (⭐13.7k+️) -{" "}
                  <a
                    href="https://github.com/phpstan/phpstan-src/pull/2371"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Detect enum duplicated values
                  </a>{" "}
                  <Badge text="merged" />
                </li>
                <li>
                  <span className="font-medium text-slate-900">
                    wavesurfer.js
                  </span>{" "}
                  (⭐9.7k+️) -{" "}
                  <a
                    href="https://github.com/katspaugh/wavesurfer.js/pull/1760"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Waveform with rounded bars
                  </a>{" "}
                  <Badge text="merged" />
                </li>
                <li>
                  <span className="font-medium text-slate-900">
                    assistant-ui
                  </span>{" "}
                  (⭐6.7k+️) -{" "}
                  <a
                    href="https://github.com/assistant-ui/assistant-ui/pull/1711"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add support for dynamic headers in EdgeChatAdapter
                  </a>{" "}
                  <Badge text="merged" />
                </li>
                <li>
                  <span className="font-medium text-slate-900">
                    ts-essentials
                  </span>{" "}
                  (⭐4.0k+️) -{" "}
                  <a
                    href="https://github.com/ts-essentials/ts-essentials/pull/136"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Simplify Merge type
                  </a>{" "}
                  <Badge text="merged" />
                </li>
                <li>
                  <span className="font-medium text-slate-900">
                    construct-js
                  </span>{" "}
                  (⭐1.4k+️) -{" "}
                  <a
                    href="https://github.com/francisrstokes/construct-js/pull/30"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Use TS assertion signature to avoid type casting
                  </a>{" "}
                  <Badge text="merged" />
                </li>
                <li>
                  <span className="font-medium text-slate-900">
                    mobx-angular
                  </span>{" "}
                  (⭐479) -{" "}
                  <a
                    href="https://github.com/mobxjs/mobx-angular/pulls?q=is%3Apr+is%3Aclosed+author%3Akubk"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    10 PRs
                  </a>
                  . Last PR -{" "}
                  <a
                    href="https://github.com/mobxjs/mobx-angular/pull/101"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Replace Karma with Jest, run tests on CI
                  </a>{" "}
                  <Badge text="merged" />
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
                Publications:
              </h2>
              <ul className="space-y-4 text-slate-700">
                <li>
                  <a
                    href="https://habr.com/ru/articles/911996/"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Why I fix bugs for free and how it changed my career
                  </a>{" "}
                  <span className="text-slate-500">
                    (in Russian, 15K views)
                  </span>{" "}
                  <Badge text="4th place in Habr Open Source competition (80+ entries)" />
                </li>
                <li>
                  <a
                    href="https://habr.com/ru/articles/779508/"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    How I built a project for myself and won a prize from
                    Telegram
                  </a>{" "}
                  <span className="text-slate-500">
                    (in Russian, 21K views)
                  </span>{" "}
                  <Badge text="Habr Technotext 2023 Nominee" />
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
                Talks:
              </h2>
              <ul className="space-y-4 text-slate-700">
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=Tra9NbAwSEY"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Using Supabase in a real-world project
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
                Blog posts:
              </h2>
              <ul className="space-y-4 text-slate-700">
                <li>
                  <a
                    href="https://teletype.in/@alteregor/how-to-integrate-telegram-stars"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    How to integrate Telegram Stars Payment to your bot
                  </a>{" "}
                  <span className="text-slate-500">(19.7K views)</span>
                </li>
                <li>
                  <a
                    href="https://teletype.in/@alteregor/rkPlgmQz8"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The difference between type and interface in TypeScript
                  </a>{" "}
                  <span className="text-slate-500">(11.6K views)</span>
                </li>
                <li>
                  <a
                    href="https://teletype.in/@alteregor/memocard-telegram-contest-win"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    How I built a project for myself and won a prize from
                    Telegram
                  </a>{" "}
                  <span className="text-slate-500">(817 views)</span>
                </li>
                <li>
                  <a
                    href="https://teletype.in/@alteregor/cra-multiple-entry-points"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Configure multiple entry points for Create React App without
                    the eject
                  </a>{" "}
                  <span className="text-slate-500">(4.6K views)</span>
                </li>
                <li>
                  <a
                    href="https://teletype.in/@alteregor/mobx-50-loc"
                    className="underline underline-offset-4 decoration-slate-400 hover:decoration-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    A simple Mobx under 50 LOC to understand observer pattern
                  </a>{" "}
                  <span className="text-slate-500">(2.3K views)</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
