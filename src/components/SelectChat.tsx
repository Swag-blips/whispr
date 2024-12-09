import noChat from "/assets/no-chat.png";

const SelectChat = () => {
  const user1 = "user_2pydGe44pMeSCsLd4Gf5UlnPxpz";
  const user2 = "user_2pynOVww2jkLD1DimMQrv7DUIQi";

  const user3 = [user1, user2];

  console.log(user3.sort().join(""));
  return (
    <main className="flex items-center flex-col w-[67.22222%] justify-center">
      <img src={noChat} alt="no-chat illustration" />
      <h2 className="text-[32px] text-white font-medium">
        Select a message and chat
      </h2>
    </main>
  );
};

export default SelectChat;
