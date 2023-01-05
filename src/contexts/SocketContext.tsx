import { createContext, useContext, useEffect, useState } from "react";

import io, { Socket } from "socket.io-client";

import { SOCKET_URI } from "../config/socket";
import { AuthContext } from "./AuthContext";

interface IUser {
    uuid: string;
    name: string;
}

export interface IMessage {
    uid: string;
    text: string;
    user: string;
    createdAt: Date;
}

export interface ISocketContext {
    socket: Socket;
    user: IUser;
    loggedInUser: string;
    messages: IMessage[];

    // eslint-disable-next-line no-empty-pattern
    setMessages: ([]: IMessage[]) => void;
}

const socket = io(SOCKET_URI, { transports: ['websocket'] });

export const SocketContext = createContext({} as ISocketContext);

const SocketsProvider = (props: any) => {
    const { user } = useContext(AuthContext);

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loggedInUser, setLoggedInUser] = useState("");

    useEffect(() => {
        socket.on("connect", () => console.info("[IO]: A new connection has been established."));

        if (user)
            socket.emit("user", {
                uuid: user.id,
                name: user.name
            });

        const getAllMessages = (messages: IMessage[]) => {
            setMessages(messages);
        }

        if (messages.length === 0)
            socket.on("chat.all.messages", (data: IMessage[]) => getAllMessages(data));

        socket.on("user", (data) => {
            setLoggedInUser(data)
        });
    }, [user, messages]);

    return (
        <SocketContext.Provider
            value={{ socket, messages, setMessages, loggedInUser }}
            {...props}
        />
    )
}

export default SocketsProvider;