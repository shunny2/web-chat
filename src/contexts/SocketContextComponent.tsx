import { PropsWithChildren, useEffect, useReducer, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from "./SocketContext";

export interface ISocketContextComponentProps extends PropsWithChildren { }

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
    const { children } = props;

    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading, setLoading] = useState(true);

    const socket = useSocket("ws://localhost:3335", {
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        autoConnect: false
    });

    useEffect(() => {
        /** Connect to the Web Socket */
        socket.connect();

        /** Save the socket in context */
        SocketDispatch({ type: "update_socket", payload: socket });

        /** Start the event listeners */
        StartListeners();

        /** Send the handshake */
        SendHandShake();

        // eslint-disable-next-line
    }, []);

    const StartListeners = () => {
        /** Reconnect event */
        socket.io.on("reconnect", (attempt) => {
            console.info("Reconnected on attempt: " + attempt);
        });

        /** Reconnect attempt event */
        socket.io.on("reconnect_attempt", (attempt) => {
            console.info("Reconnection attempt: " + attempt);
        });

        /** Reconnection error */
        socket.io.on("reconnect_error", (error) => {
            console.info("Reconnection error: " + error);
        });

        /** Reconnection failed */
        socket.io.on("reconnect_failed", () => {
            console.info("Reconnection failed");
            alert("We are unable to connect you to the web socket.")
        });
    }

    const SendHandShake = () => {
        console.log("Sending handshake to server...");

        socket.emit("handshake", (uid: string, users: string[]) => {
            console.log("User handshake callback message received");
            SocketDispatch({ type: "update_uid", payload: uid });
            SocketDispatch({ type: "update_users", payload: users });

            setLoading(false);
        });
    }

    if (loading)
        return (
            <p>Loading socket ID...</p>
        )

    return (
        <SocketContextProvider value={{ SocketState, SocketDispatch }}>
            {children}
        </SocketContextProvider>
    )
};

export default SocketContextComponent;