import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  initialWidthMultiplier?: number;
}

const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
  ...props
}) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const initialWidthMultiplier = props.initialWidthMultiplier || 0.75;

  // Initializer. As window is not defined during first render on server in NextJS (stupidity)
  useEffect(() => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
    setWidth(window.innerWidth * initialWidthMultiplier);
  }, []);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * initialWidthMultiplier < width) {
          setWidth(window.innerWidth * initialWidthMultiplier);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
