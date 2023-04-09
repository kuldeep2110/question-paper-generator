import { FC } from "react";

interface MyButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const MyButton: FC<MyButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 rounded-md"
    >
      {children}
    </button>
  );
};

export default MyButton;
