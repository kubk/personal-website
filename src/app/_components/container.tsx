export function Container({ children }: { children?: React.ReactNode }) {
  return <div className="container mx-auto px-5 md:pl-28">{children}</div>;
}
