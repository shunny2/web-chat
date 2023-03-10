export const Home = () => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-5xl md:text-6xl text-center text-purple-500">Welcome to the <strong className="text-white drop-shadow-[0_5px_5px_rgba(168,85,247,1)] shadow-purple-500">Web Chat</strong>!</h1>

            <span className="text-xl md:text-1xl text-purple-300 text-center">
                Web Chat is a web application to exchange messages in real time between users.
            </span>
        </div>
    )
};