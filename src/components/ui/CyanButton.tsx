import { FC } from "react";

interface CyanButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const CyanButton: FC<CyanButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="submit"
      className="text-white  shadow-blackA7 bg-cyan-600 hover:bg-cyan-800 inline-flex h-[35px] items-center justify-center rounded-[7px] px-[10px] font-bold leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none transition-all duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CyanButton;
