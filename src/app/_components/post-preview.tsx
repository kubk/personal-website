import Link from "next/link";
import { DateFormatter } from "@/app/_components/date-formatter";
import { Icons } from "@/app/_components/icons";
import { ChevronRight } from "lucide-react";

export function PostPreview({
  title,
  date,
  excerpt,
  slug,
}: {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <article className="relative group">
        <div className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-50 dark:group-hover:bg-accent/50" />
        <Icons.dot className="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-border md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block" />
        <div className="relative">
          <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-foreground pt-8 lg:pt-0">
            {title}
          </h3>
          <div className="mt-2 mb-4 prose prose-slate dark:prose-invert prose-a:relative prose-a:z-10 line-clamp-2">
            {excerpt}
          </div>
          <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
            <dd className="whitespace-nowrap text-sm leading-6 text-slate-400 dark:text-muted-foreground">
              <DateFormatter dateString={date} />
            </dd>
          </dl>
        </div>
        <div className="hidden sm:flex relative flex items-center text-sm font-medium underline">
          Read more
          <ChevronRight className="ml-1.5 mt-0.5" size={14} />
        </div>
      </article>
    </Link>
  );
}
