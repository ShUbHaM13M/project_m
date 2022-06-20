import React from "react";

interface Props {
  setOnClick?: () => void;
  children?: React.ReactNode;
}

const Modal = ({ children, setOnClick }: Props) => {
  return (
    <div
      onClick={setOnClick}
      className="flex justify-center items-center 
      absolute top-0 left-0 
      bg-black bg-opacity-75 backdrop-blur-sm
      w-screen h-screen"
    >
      {children}
    </div>
  );
};

export default Modal;
