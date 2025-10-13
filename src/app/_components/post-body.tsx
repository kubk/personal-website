import markdownStyles from "./markdown-styles.module.css";

export function PostBody({ content }: { content: string }) {
  return (
    <div className="max-w-xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
