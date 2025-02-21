

const ChatheaderSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="size-12 bg-gray-400 animate-pulse rounded-full"></div>
        <div className="w-12 h-2 bg-gray-400 animate-pulse rounded-sm"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="size-4 bg-gray-400 animate-pulse rounded-full"></div>
        <div className="size-4 bg-gray-400 animate-pulse rounded-full"></div>
        <div className="size-4 bg-gray-400 animate-pulse rounded-full"></div>
      </div>
    </>
  );
};

export default ChatheaderSkeleton;
