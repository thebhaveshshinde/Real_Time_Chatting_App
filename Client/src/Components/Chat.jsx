import { useState, useEffect } from "react"
import { io } from "socket.io-client"
const socket = io("http://localhost:4000")


function Chat() {
  const [username, setusername] = useState("")
  const [Message, setMessage] = useState("")
  const [Messages, setMessages] = useState([])

  useEffect(() => {
    socket.on("NewMessage", (data) => {
      setMessages((prev) => ([...prev, data]))
    })

    return () => {
      socket.off("NewMessage")
    }
  }, []);

  const HandleSubmit = (e) => {
    e.preventDefault()
    const data = { username, Message }
    socket.emit("NewMessage", data)
    setMessage("")
  }

  return (
    <>
      <div className="bg-slate-600 h-screen w-screen">
        <div className="bg-cyan-300 fixed z-30 w-screen p-2 ">
          Enter Your Name : <input type="text" className="border-2 font-bold border-brown-700 w-2/4" value={username} onChange={(e) => setusername(e.target.value)} required /><br />
        </div><br />


        <div className="flex z-10 absolute overflow-x-auto  bottom-30 top-15  left-2 flex-col">
          {Messages.length > 0 ? (
            <div>
              {Messages.map((m, index) => (
                <div key={index}>
                  <p className="mb-2 text-slate-50 text-2xl "><strong className="text-xl">{m.username}:</strong>{m.Message}</p>
                </div>
              ))}
            </div>


          ) :
            (
              <div className="flex justify-center items-center text-center h-screen w-screen">
                <h1 className="text-2xl font-bold">Enter Your Name and Begin Chatting!</h1>
              </div>
            )}

        </div><br />


        <div className="fixed z-30 bottom-0 h-15 bg-cyan-300 p-1  w-screen">
          Message:<input className="border-2 border-brown-600  m-4  w-2/4 " type="text" value={Message} onChange={(e) => { setMessage(e.target.value) }} />
          <button className="bg-blue-700 absolute  rounded p-1 border-red-500 border-2 text-slate-50  text-2xl " onClick={HandleSubmit}>Send</button>
        </div>





      </div>
    </>
  )
}

export default Chat
