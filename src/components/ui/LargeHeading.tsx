import { FC } from "react";

interface LargeHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const styles = {
  heading:
    "text-white text-center lg:text-left font-extrabold leading-tight text-4xl md:text-5xl lg:text-6xl py-4",
};

const LargeHeading: FC<LargeHeadingProps> = ({ children }) => {
  return <h1 className={styles.heading}>{children}</h1>;
};

export default LargeHeading;
