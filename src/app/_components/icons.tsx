type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  dot: (props: IconProps) => (
    <svg viewBox="0 0 9 9" {...props}>
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        stroke="currentColor"
        className="fill-white"
        strokeWidth="2"
      />
    </svg>
  ),
  rightArrow: (props: IconProps) => (
    <svg
      width="3"
      height="6"
      viewBox="0 0 3 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0L3 3L0 6"></path>
    </svg>
  ),
};
