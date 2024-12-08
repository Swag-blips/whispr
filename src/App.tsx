import Chats from "./components/Chats";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Chats />
      <Chat />
    </div>
  );
}

export default App;
