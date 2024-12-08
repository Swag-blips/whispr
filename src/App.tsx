import Chats from "./components/Chats";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Chats />
    </div>
  );
}

export default App;
