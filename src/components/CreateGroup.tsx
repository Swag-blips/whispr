import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateGroup = () => {
    const users = useQuery(api.chats.getUserChats)
    const createGroupChat = useMutation(api.chats.createGroupChat)
    const [addedUsers, setAddedUsers] = useState<Array<string>>([])
    const [groupName, setGroupName] = useState("")

    const handleAddUser = (userId: string | undefined) => {
        if(!userId){
            return
        }

        if(addedUsers.includes(userId)) {
            return
        }
        
        setAddedUsers(prevUsers => ([...prevUsers, userId]))
        console.log(addedUsers)
    }

    const handleCreateGroup = async () => {
        if(!addedUsers.length){
            return
        }
        if(!groupName){
            return
        }
        try {
            await createGroupChat({participants: addedUsers, groupName:groupName})
            toast.success("group chat successfully created")
        } catch (error) {
           console.error(error) 
       
        }finally{

        }
    }

    console.log(groupName)
    return (
        <div className="fixed top-0 z-[70]  items-center justify-center flex flex-col h-screen  right-0 left-0 bottom-0 ">
      <div className=" bg-[#12171D] py-6  px-6 rounded-lg w-[433px] ">
       <div className="flex flex-col justify-center">    
        {users?.map((user) => (
            <div className="flex justify-between items-center">
             <div className="flex items-center gap-2">
               <img src={user.receiver?.photoUrl} alt="user-photo" className="h-12 w-12 rounded-full object-cover" />
               <p className="text-white">{user.receiver?.name}</p>
             </div>
              <CiCirclePlus onClick={() => handleAddUser(user.receiver?.userId)} size={24} className="text-white" />
         
            </div>
        ))}
        <input type="text" onChange={(e) => setGroupName(e.target.value)} />
        <button onClick={handleCreateGroup} className="text-white ">Create group</button>
        </div>
        </div>
        </div>
    )
}

export default CreateGroup
