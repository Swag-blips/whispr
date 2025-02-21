const ChatInfoSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex flex-col gap-2 items-center">
        <div className="size-20 bg-gray-400 animate-pulse rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 animate-pulse rounded-sm"></div>
      </div>

      <div className="flex flex-col mt-8 px-4">
        <div className="grid grid-cols-2 mt-4 gap-4">
          <div className="size-20 bg-gray-400 animate-pulse rounded-lg "></div>
          <div className="size-20 bg-gray-400 animate-pulse rounded-lg "></div>
          <div className="size-20 bg-gray-400 animate-pulse rounded-lg "></div>
          <div className="size-20 bg-gray-400 animate-pulse rounded-lg "></div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfoSkeleton;
