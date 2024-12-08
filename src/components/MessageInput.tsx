const MessageInput = () => {
  return (
    <form className="fixed bg-[#16191C] bottom-0 mb-6 w-[86.5%] mr-[24px]">
      <div className="w-[inherit]">
        <input
          className="w-[inherit] placeholder:text-xs h-14 outline-none bg-[#1E2126] rounded-lg"
          placeholder="Send a message..."
        />
      </div>
    </form>
  );
};

export default MessageInput;
