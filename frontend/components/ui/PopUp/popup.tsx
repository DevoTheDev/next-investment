"use client";
import React from "react";

type PopUpProps = {
  visible: boolean;
  children: React.ReactNode;
};

const PopUp: React.FC<PopUpProps> = ({ visible, children }) => {

  React.useEffect(() => {
    console.log(visible)
  }, [visible])

  return (
    <div className={`${visible ? "fixed w-2/3 bottom-1/4 top-1/4" : "hidden"}`} >
        {children}
    </div>
  );
};

export default PopUp;
