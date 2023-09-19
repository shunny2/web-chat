import { useContext } from "react";
import { Field, Form, Formik } from "formik";
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

import * as yup from "yup";

import { AuthContext } from "../../contexts/AuthContext";
import { Input } from "../../components/shared/Input";

interface IFormatData {
    email: string;
    password: string;
}

const signInSchema: yup.SchemaOf<IFormatData> = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required()
        .min(8)
});

export const SignIn = () => {
    const { login } = useContext(AuthContext);

    const handleSignIn = async (values: IFormatData) => {

        const result = await login(values);

        if (result instanceof Error)
            toast.error(result.message)
    };

    const initialValues: IFormatData = {
        email: "",
        password: ""
    }

    return (
        <>
            <div className="flex flex-col gap-4 px-4 items-center justify-center">

                <Formik
                    initialValues={initialValues}
                    validationSchema={signInSchema}
                    onSubmit={handleSignIn}
                >
                    {formik => {
                        return (
                            <Form className="w-80 max-w-[400px] md:w-[400px]">
                                <Field
                                    id="email"
                                    name="email"
                                    label="email"
                                    labelText="Email"
                                    type="email"
                                    placeholder="John@4shared.com"
                                    component={Input}
                                />

                                <Field
                                    id="password"
                                    name="password"
                                    label="password"
                                    labelText="Password"
                                    type="password"
                                    placeholder="**********"
                                    component={Input}
                                />

                                <button
                                    type="submit"
                                    disabled={!formik.isValid}
                                    className={`w-full ${!formik.isValid ? "bg-slate-300" : "bg-purple-500 hover:bg-purple-700"} rounded text-white px-3 py-3 mt-6`}
                                >
                                    Sign In
                                </button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="dark"
                limit={1}
            />
        </>
    )
};