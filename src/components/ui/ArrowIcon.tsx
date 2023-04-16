import { FC } from "react";

interface ArrowIconProps {}

const ArrowIcon: FC<ArrowIconProps> = ({}) => {
  return (
    <div className="flex items-center justify-center rounded-full bg-gray-900 text-white w-12 h-12 cursor-pointer group-hover:bg-gray-800 transition duration-300 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-110">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    </div>
  );
};

export default ArrowIcon;
