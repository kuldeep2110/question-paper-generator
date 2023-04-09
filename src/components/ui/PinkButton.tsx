import { FC } from "react";

interface PinkButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const PinkButton: FC<PinkButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="submit"
      className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white rounded-md px-4 py-2 hover:from-fuchsia-600 hover:to-fuchsia-700 "
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PinkButton;
