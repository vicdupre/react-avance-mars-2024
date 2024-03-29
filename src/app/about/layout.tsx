import { ReactNode } from "react";

const AboutLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <p>I'm the About Layout</p>
      {children}
    </>
  );
};

export default AboutLayout;
