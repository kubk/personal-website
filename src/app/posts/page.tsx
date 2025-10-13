import { Container } from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import { Header } from "@/app/_components/header";
import { PostPreview } from "@/app/_components/post-preview";

export default function Posts() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Header />
      <Container>
        {/* Posts */}
        <div className="relative sm:pb-12 max-w-xl mx-auto mt-16">
          {/* vertical line */}
          <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 sm:block" />

          <div className="space-y-16">
            {allPosts.map((post) => (
              <PostPreview key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
