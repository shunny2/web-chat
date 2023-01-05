import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { AuthContext } from "../../contexts/AuthContext";
import { IMessage, SocketContext } from "../../contexts/SocketContext";
import { ChatCard } from "../../components/ChatCard";

const id = uuidv4();

export const Chat = () => {
    const { user } = useContext(AuthContext);
    const { socket, setMessages, messages } = useContext(SocketContext);

    const [message, setMessage] = useState("");

    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleNewMessage = (newMessage: IMessage) => {
            setMessages([...messages, newMessage]);
        }

        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        socket.on("chat.message", (data: IMessage) => handleNewMessage(data));
        
        return () => {
            socket.off("chat.message", (data: IMessage) => handleNewMessage(data));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, messages]);

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (message.trim()) {
            socket.emit("chat.message", {
                uid: id,
                name: user.name,
                text: message
            })
            setMessage("");
        }
    }

    return (
        <div className="flex w-full">
            <div className="flex flex-col w-full">
                <header className="flex items-center justify-between h-14 bg-slate-200 px-3 shadow-sm shadow-black z-[1] ">
                    <div className="flex items-center">
                        <div className="grid">
                            <span className="text-lg overflow-hidden text-ellipsis">
                                Usuários Online:
                            </span>
                        </div>
                    </div>
                </header>
                <div className="h-[465px] md:h-[640px] lg:h-[750px]  bg-purple-300 overflow-y-scroll">
                    {messages.map((m, index) => (
                        <ChatCard message={m} key={index} id={id} />
                    ))}
                    <div ref={messageEndRef} />
                </div>
                <footer className="bg-slate-200 h-16 bottom-0 left-0 w-full p-3 shadow-md">
                    <form className="flex items-center gap-4 w-full" onSubmit={handleFormSubmit}>
                        <input
                            className="p-2 outline-none border-none rounded w-full shadow-inner"
                            type="text"
                            placeholder="Message..."
                            value={message}
                            onChange={event => setMessage(event.target.value)}
                        />
                        <button type="submit">
                            <MdSend size={28} color={"#a855f7"} />
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    )
};