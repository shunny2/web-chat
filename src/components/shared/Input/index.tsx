import { ErrorMessage, FieldInputProps, FormikState } from "formik";

import { TextError } from "../TextError";

const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input className="bg-transparent flex-1 text-white text-xs placeholder:text-white outline-none" {...props} />
)

export const Input = ({
    field,
    form,
    label,
    labelText,
    ...props
}: {
    field: FieldInputProps<any>;
    form: FormikState<any>;
    label?: string;
    labelText?: string;
}) => (
    <div className="flex flex-col gap-2 my-2">
        <label htmlFor={label} className="font-semibold">{labelText}</label>
        <div className="flex items-center w-full max-w-[400px] py-4 px-3 rounded bg-gray-600 focus-within:ring-2 ring-gray-900">
            <CustomInput {...field} {...props} />
        </div>
        <ErrorMessage component={TextError} name={field.name} />
    </div>
);