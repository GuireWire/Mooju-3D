import clsx from "clsx";

type Props = {
  className?: string;
};

export default function CircleText({ className }: Props) {
  return (
    <img
      src="/circlecow.svg"
      alt="Rotating cow text"
      className={clsx("animate-spin-slow", className)}
    />
  );
}