import { useContext } from "react";

import dayjs from "dayjs";

import { IMessage, SocketContext } from "../../contexts/SocketContext";

interface ChatCardProps {
    message: IMessage;
    id: string
}

export const ChatCard = ({ message, id }: ChatCardProps) => {
    const { loggedInUser } = useContext(SocketContext);

    return (
        <div className={`flex m-3 ${message.uid === id || message.user._id === loggedInUser ? "justify-end" : ""}`}>
            <div className={`flex flex-col ${message.uid === id || message.user._id === loggedInUser ? "bg-emerald-700 text-white rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl" : "bg-gray-800 text-white rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"} shadow-sm p-1 max-w-[80%]`}>
                {message.user._id !== loggedInUser && (
                    <span className={`text-xs text-slate-400 ${message.user.name && "h-4 mt-1 mx-1"}`}>
                        {message.user.name}
                    </span>
                )}
                <span className="text-base my-1 mr-10 ml-1">
                    {message.text}
                </span>
                <span className="text-xs text-slate-400 text-right h-4 -mt-1 mr-1">
                    {dayjs(message.createdAt).format("DD/MM HH:mm")}
                </span>
            </div>
        </div>
    )
}