import { Container } from "@/app/_components/container";
import { Header } from "@/app/_components/header";
import { Badge } from "@/app/_components/badge";
import {
  petProjects,
  gitHubContributions,
  publications,
  talks,
  blogPosts,
} from "@/app/links";
import Link from "next/link";

export default function Index() {
  return (
    <main>
      <Header />
      <Container>
        <div className="pt-4 max-w-3xl mx-auto sm:pt-16 pb-16">
          <div className="flex gap-6 mb-12">
            <div className="flex-shrink-0 hidden sm:block">
              <img
                src="https://avatars.githubusercontent.com/u/22447849?v=4"
                alt="Egor Gorbachev"
                className="rounded-full w-28 h-28 border-4 border-white dark:border-background shadow-[0_0_0_2px] shadow-slate-300 dark:shadow-border"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="mb-3 text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-foreground font-extrabold">
                Egor Gorbachev
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-muted-foreground mb-3">
                <a
                  href="https://github.com/kubk"
                  className="underline underline-offset-4 decoration-slate-400 dark:decoration-muted-foreground/50 hover:decoration-slate-900 dark:hover:decoration-muted-foreground hover:text-slate-900 dark:hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/kubk
                </a>
                <span className="text-slate-400 dark:text-muted-foreground/50">
                  •
                </span>
                <a
                  href="mailto:7gorbachevm@gmail.com"
                  className="underline underline-offset-4 decoration-slate-400 dark:decoration-muted-foreground/50 hover:decoration-slate-900 dark:hover:decoration-muted-foreground hover:text-slate-900 dark:hover:text-foreground"
                >
                  7gorbachevm@gmail.com
                </a>
              </div>
              <p className="text-lg text-slate-600 dark:text-muted-foreground">
                Hi there 👋 I am an AI TypeScript Engineer turned Founder
              </p>
            </div>
          </div>

          <div className="space-y-12 max-w-4xl">
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground mb-6">
                Projects:
              </h2>
              <ul className="space-y-4 text-slate-700 dark:text-muted-foreground">
                {petProjects.map((project) => (
                  <li key={project.url}>
                    <a
                      href={project.url}
                      className="underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground font-medium text-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>{" "}
                    - {project.description}
                    {"additionalLink" in project && (
                      <>
                        {" "}
                        <a
                          href={project.additionalLink.url}
                          className="underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground font-medium text-foreground"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.additionalLink.text}
                        </a>{" "}
                        {project.additionalText}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground mb-6">
                My contributions to Open Source:
              </h2>
              <ul className="space-y-4 text-slate-700 dark:text-muted-foreground">
                {gitHubContributions.map((contribution) => (
                  <li key={contribution.name}>
                    <span className="font-medium text-slate-900 dark:text-foreground">
                      {contribution.name}
                    </span>{" "}
                    (⭐{contribution.stars}️) -{" "}
                    {contribution.type === "multiple" ? (
                      <>
                        <a
                          href={contribution.countLink}
                          className="underline underline-offset-4 decoration-slate-400 dark:decoration-muted-foreground/50 hover:decoration-slate-900 dark:hover:decoration-muted-foreground"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {contribution.count} PRs
                        </a>
                        . Example PR -{" "}
                        <a
                          href={contribution.examplePrLink}
                          className="underline underline-offset-4 decoration-slate-400 dark:decoration-muted-foreground/50 hover:decoration-slate-900 dark:hover:decoration-muted-foreground"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {contribution.examplePrTitle}
                        </a>{" "}
                      </>
                    ) : (
                      <>
                        <a
                          href={contribution.prLink}
                          className="underline underline-offset-4 decoration-slate-400 dark:decoration-muted-foreground/50 hover:decoration-slate-900 dark:hover:decoration-muted-foreground"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {contribution.prTitle}
                        </a>{" "}
                      </>
                    )}
                    <Badge text={contribution.badge} />
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground mb-6">
                Publications:
              </h2>
              <ul className="space-y-4 text-slate-700 dark:text-muted-foreground">
                {publications.map((publication) => (
                  <li key={publication.url}>
                    <a
                      href={publication.url}
                      className="underline underline-offset-4 decoration-slate-400 dark:decoration-muted-foreground/50 hover:decoration-slate-900 dark:hover:decoration-muted-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {publication.title}
                    </a>{" "}
                    <span className="text-slate-500 dark:text-muted-foreground/70">
                      {publication.meta}
                    </span>{" "}
                    <Badge text={publication.badge} />
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground mb-6">
                Talks:
              </h2>
              <ul className="space-y-4 text-slate-700 dark:text-muted-foreground">
                {talks.map((talk) => (
                  <li key={talk.url}>
                    <a
                      href={talk.url}
                      className="underline underline-offset-4 decoration-slate-400 dark:decoration-muted-foreground/50 hover:decoration-slate-900 dark:hover:decoration-muted-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {talk.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground mb-6">
                Blog posts:
              </h2>
              <ul className="space-y-4 text-slate-700 dark:text-muted-foreground">
                {blogPosts.map((post) => (
                  <li key={post.url}>
                    <a
                      href={post.url}
                      className="underline underline-offset-4 decoration-slate-400 dark:decoration-muted-foreground/50 hover:decoration-slate-900 dark:hover:decoration-muted-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </a>{" "}
                    <span className="text-slate-500 dark:text-muted-foreground/70">
                      {post.views}
                    </span>
                  </li>
                ))}
                <li className="underline">
                  <Link href="/blog">Other blog posts</Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
