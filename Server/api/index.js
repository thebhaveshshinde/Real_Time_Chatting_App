const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const cors = require("cors")

const app = express()


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "https://real-time-chatting-app-mu.vercel.app",
        method: ["GET", "POST"],
    }
})


app.use(cors({
    origin: 'https://real-time-chatting-app-mu.vercel.app',
}));

app.get("/", (req, res) => {
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

// server.listen(4000, () => {
//     console.log("Server Running On The Port 4000 ...")
// })

module.exports = server
