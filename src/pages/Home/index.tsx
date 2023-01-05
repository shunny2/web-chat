export const Home = () => {
    return (
        <div className="flex flex-col gap-4 items-center md:justify-center w-screen h-screen">
            <h1 className="text-4xl md:text-5xl text-center text-purple-500">Welcome to the <strong className="text-white drop-shadow-[0_5px_5px_rgba(168,85,247,1)] shadow-purple-500">Web Chat</strong>!</h1>

            <span className="text-lg md:text-xl text-purple-300 text-center">
                Web Chat is a web application to exchange messages in real time between users.
            </span>
        </div>
    )
};