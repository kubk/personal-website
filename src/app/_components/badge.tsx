type BadgeProps = {
  text: string;
};

export const Badge = ({ text }: BadgeProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 pt-0.5 text-xs font-medium text-slate-700">
      {text}
    </span>
  );
};
