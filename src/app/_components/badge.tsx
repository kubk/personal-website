export const Badge = ({ text }: { text: string }) => {
  return (
    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 pt-0.5 text-xs font-medium text-secondary-foreground">
      {text}
    </span>
  );
};
