import { PropsWithChildren } from "react";

export const TextError = (props: PropsWithChildren) => {
    return (
        <div className="text-red-500 text-sm">
            {props.children}
        </div>
    )
};