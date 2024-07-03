"use client";
import { MdCheck } from "react-icons/md";

const CustomCheckBox = ({ handleChecked, isChecked }) => {
  return (
    <div
      onClick={() => {
        handleChecked();
      }}
      className="flex flex-row items-center justify-center w-5 h-5 m-1 border border-blue-500 rounded cursor-pointer "
    >
      <MdCheck
        className={` text-lg ${isChecked ? "block" : "hidden"} text-blue-500 `}
      />
    </div>
  );
};

export default CustomCheckBox;
