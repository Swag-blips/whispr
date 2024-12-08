import receiverImg from "/assets/john_doe.jpg";

const Messages = () => {
  return (
    <main className="px-6 mt-6">
      <div className="flex flex-col justify-center">
        <div className="flex gap-6">
          <img
            src={receiverImg}
            alt="profile-img"
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="bg-[#1E2126] w-[300px] py-4 px-4 rounded-lg">
            <p className="text-xs break-words leading-[20px] text-white font-medium">
              Consider this feature for the next subsequent updates Consider
              this feature for the next subsequent updates Consider this feature
              for the next subsequent updates Consider this feature for the next
              subsequent updates
            </p>
          </div>
        </div>

        <div className=" flex justify-end">
          <div className="bg-[#1E2126] w-[300px] py-4 px-4 rounded-lg">
            <p className="text-xs break-words leading-[20px] text-white font-medium">
              Hi User G, I noticed you mentioned needing someone to walk your
              dog. I love dogs and can help with that. Let's coordinate a time
              to meet your furry friend.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Messages;
