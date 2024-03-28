import { ReactNode, useEffect, useState } from "react";

type Coordinates = {
  x: number;
  y: number;
};

const Mouse = ({
  children,
}: {
  children: (coordinates: Coordinates) => ReactNode;
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.onmousemove = (e) => {
        setCoordinates({
          x: e.clientX,
          y: e.clientY,
        });
      };
    }
    return () => {
      if (body) {
        body.onmousemove = null;
      }
    };
  }, []);

  return <>{children(coordinates)}</>;
};

export default Mouse;
