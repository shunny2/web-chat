import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { AuthContext } from "../../contexts/AuthContext";
import { IMessage, SocketContext } from "../../contexts/SocketContext";
import { ChatCard } from "../../components/ChatCard";
import { EVENTS } from "../../config/socket";

const id = uuidv4();

export const Chat = () => {
    const { user } = useContext(AuthContext);
    const { socket, setMessages, messages, onlineUsersCount } = useContext(SocketContext);

    const [message, setMessage] = useState("");

    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleNewMessage = (newMessage: IMessage) => {
            setMessages([...messages, newMessage]);
        }

        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        socket.on(EVENTS.message, (data: IMessage) => handleNewMessage(data));

        return () => {
            socket.off(EVENTS.message, (data: IMessage) => handleNewMessage(data));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, messages]);

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (message.trim()) {
            socket.emit(EVENTS.message, {
                uid: id,
                name: user.name,
                text: message
            })
            setMessage("");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[590px] min-w-[260px] w-full h-full py-4 px-4 md:py-0 md:px-0 md:max-h-[700px] md:min-h-[700px]">
            <header className="flex items-center justify-between h-16 w-full max-w-[500px] md:max-w-[700px] bg-purple-500 p-3 shadow-sm shadow-black md:z-[1]">
                <div className="flex items-center justify-center w-full">
                    <span className="text-white text-lg overflow-hidden text-ellipsis">
                        Online Users: <strong className={`${onlineUsersCount !== 0 ? "text-emerald-500" : "text-white"}`}>{onlineUsersCount}</strong>
                    </span>
                </div>
            </header>
            <div className="h-full w-full max-w-[500px] md:max-w-[700px] bg-gray-600  overflow-y-scroll">
                {messages.map((m, index) => (
                    <ChatCard message={m} key={index} id={id} />
                ))}
                <div ref={messageEndRef} />
            </div>
            <footer className="bg-purple-500 h-16 bottom-0 left-0 w-full max-w-[500px] md:max-w-[700px] p-3 shadow-md">
                <form className="flex items-center gap-4 w-full" onSubmit={handleFormSubmit}>
                    <input
                        className="p-2 outline-none border-none rounded w-full shadow-inner text-white bg-gray-600 focus-within:ring-2 ring-gray-900"
                        type="text"
                        placeholder="Message..."
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    />
                    <button type="submit">
                        <MdSend size={28} color={"#fff"} />
                    </button>
                </form>
            </footer>
        </div>
    )
};