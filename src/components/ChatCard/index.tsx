import dayjs from "dayjs";
import { useContext } from "react";

import { IMessage, SocketContext } from "../../contexts/SocketContext";

interface ChatCardProps {
    message: IMessage;
    id: string
}

export const ChatCard = ({ message, id }: ChatCardProps) => {
    const { loggedInUser } = useContext(SocketContext);

    return (
        <div className={`flex m-3 ${message.uid === id || message.user === loggedInUser ? "justify-end" : ""}`}>
            <div className={`flex flex-col ${message.uid === id || message.user === loggedInUser ? "bg-emerald-200" : "bg-white"} rounded-lg shadow-sm p-1 max-w-[80%]`}>
                <span className="text-sm my-1 mr-10 ml-1">
                    {message.text}
                </span>
                <span className="text-xs text-slate-400 text-right h-4 -mt-1 mr-1">
                    {dayjs(message.createdAt).format("DD/MM HH:mm")}
                </span>
            </div>
        </div>
    )
}