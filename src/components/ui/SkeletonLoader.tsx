import { FC } from "react";

interface SkeletonLoaderProps {}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({}) => {
  return (
    <div className="border border-slate-700 shadow rounded-md p-4 mt-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-6">
        <div className="bg-slate-700 h-14 w-14 rounded-full"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-3 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
