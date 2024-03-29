export const SOCKET_URI = process.env.REACT_APP_SOCKET_URI || "http://localhost:3335";

export const EVENTS = {
    connect: "connect",
    user: "user",
    onlineUsers: "online.users",
    message: "chat.message",
    allMessages: "chat.all.messages"
};