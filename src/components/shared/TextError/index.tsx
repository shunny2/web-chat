import { PropsWithChildren } from "react";

export const TextError = (props: PropsWithChildren) => {
    return (
        <div className="text-red-500 text-sm font-semibold">
            {props.children}
        </div>
    )
};