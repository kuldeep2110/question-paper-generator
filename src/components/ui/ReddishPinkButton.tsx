import { FC } from "react";

interface ReddishPinkButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const ReddishPinkButton: FC<ReddishPinkButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      type="submit"
      className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ReddishPinkButton;
