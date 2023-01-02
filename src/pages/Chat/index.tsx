import { FormEvent, useContext, useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import { AuthContext } from "../../contexts/AuthContext";

interface ISocketState {
    uid: string;
    name: string;
    text: string | string[];
    date: Date;
}

const id = uuidv4();
const socket = io("http://localhost:3335", { transports: ['websocket'] });
socket.on("connect", () => console.log("[IO]: A new connection has been established."));

export const Chat = () => {
    const { user } = useContext(AuthContext);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ISocketState[]>([]);

    useEffect(() => {
        socket.emit("user", {
            name: user.name
        });

        const handleNewMessage = (newMessage: ISocketState) => {
            setMessages([...messages, newMessage]);
            console.log(messages);
        }

        socket.on("chat.message", (data: ISocketState) => handleNewMessage(data));

        (() => {
            socket.off("chat.message", (data: ISocketState) => handleNewMessage(data));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

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
                                Usuário
                            </span>
                        </div>
                    </div>
                </header>
                <div className="h-[465px] md:h-[640px] lg:h-[750px]  bg-purple-300 overflow-y-scroll">
                    {messages.map((m, index) => (
                        <div className={`flex m-3 ${m.uid === id ? "justify-end" : ""}`} key={index}>
                            <div className={`flex flex-col ${m.uid === id ? "bg-emerald-200" : "bg-white"} rounded-lg shadow-sm p-1 max-w-[80%]`}>
                                <span className="text-sm my-1 mr-10 ml-1">
                                    {m.text}
                                </span>
                                <span className="text-xs text-slate-400 text-right h-4 -mt-1 mr-1">
                                    {dayjs(m.date).format("DD/MM HH:mm")}
                                </span>
                            </div>
                        </div>
                    ))}
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