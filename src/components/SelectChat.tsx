import noChat from "/assets/no-chat.png";

const SelectChat = () => {
  return (
    <main className=" hidden xl:flex items-center h-screen flex-col w-[67.22222%] justify-center">
      <img src={noChat} alt="no-chat illustration" />
      <h2 className="text-[32px] text-white font-medium">
        Select a message and chat
      </h2>
    </main>
  );
};

export default SelectChat;
