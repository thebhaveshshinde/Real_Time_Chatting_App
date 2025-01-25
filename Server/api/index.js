const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const cors = require("cors")

const app = express()


const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
    }
})

app.use(cors())

app.get("/",(req,res)=>{
    res.send("<HTML><HEAD></HEAD><BODY><H1>Hello!</H1></BODY></HTML>")
})



io.on("connection", (socket) => {
    console.log("User Connected ... ")

    socket.on("NewMessage", (data) => {
        io.emit("NewMessage", data)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected...")
    })
    
})

server.listen(4000, () => {
    console.log("Server Running On The Port 4000 ...")
})

