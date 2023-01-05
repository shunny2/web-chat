import { createContext, useContext, useEffect, useState } from "react";

import io, { Socket } from "socket.io-client";

import { EVENTS, SOCKET_URI } from "../config/socket";
import { AuthContext } from "./AuthContext";

interface IUser {
    _id: string;
    uuid?: string;
    name: string;
}

export interface IMessage {
    uid: string;
    text: string;
    user: IUser;
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

const socket = io(SOCKET_URI, {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 5000
});

export const SocketContext = createContext({} as ISocketContext);

const SocketsProvider = (props: any) => {
    const { user } = useContext(AuthContext);

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loggedInUser, setLoggedInUser] = useState("");

    useEffect(() => {
        socket.on(EVENTS.connect, () => console.info("[IO]: A new connection has been established."));

        if (user) {
            socket.emit(EVENTS.user, {
                uuid: user.id,
                name: user.name
            });
        }

        const getAllMessages = (messages: IMessage[]) => {
            setMessages(messages);
        }

        if (messages.length === 0)
            socket.on(EVENTS.allMessages, (data: IMessage[]) => getAllMessages(data));

        socket.on(EVENTS.user, (data: string) => {
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