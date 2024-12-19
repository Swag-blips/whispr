const ChatInfo = () => {
  return (
    <div className="flex  justify-center flex-col mt-8 ">
      <div className="flex flex-col items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile-img"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex flex-col text-center justify-center">
          <h2 className="text-white text-base font-medium ">Jeremy wilson</h2>
          <p className="text-green-500 text-xs">online</p>
        </div>
      </div>

      <div className="px-4 mt-8">
        <h2 className="text-base font-medium text-white ">Media Shared</h2>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            className="rounded-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg"
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
