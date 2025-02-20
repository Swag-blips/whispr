const SidebarSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <div className="size-12 bg-gray-400 animate-pulse rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="w-20 h-2 bg-gray-400 animate-pulse rounded-sm"></div>
          <div className="w-10 h-2 bg-gray-400 animate-pulse rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
