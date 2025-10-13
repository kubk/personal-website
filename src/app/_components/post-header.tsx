import { PostTitle } from "@/app/_components/post-title";

export function PostHeader({ title }: { title: string }) {
  return (
    <>
      <div className="flex justify-center">
        <PostTitle>{title}</PostTitle>
      </div>
    </>
  );
}
