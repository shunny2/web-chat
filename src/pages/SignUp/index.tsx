import { useContext } from "react";
import { Field, Form, Formik } from "formik";
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

import * as yup from "yup";

import { AuthContext } from "../../contexts/AuthContext";
import { Input } from "../../components/shared/Input";
import { useNavigate } from "react-router-dom";

interface IFormatData {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const signUpSchema: yup.SchemaOf<IFormatData> = yup.object().shape({
    name: yup
        .string()
        .required()
        .min(4),
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required()
        .min(8),
    repeatPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Your passwords do not match")
});

export const SignUp = () => {
    const { signUp } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSignUp = async (values: IFormatData) => {
        const result = await signUp(values);

        if (result instanceof Error)
            toast.error(result.message)
        else
            toast.success("Success in registering!", {
                onClose: () => navigate("/signIn")
            })
    };

    const initialValues: IFormatData = {
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    }

    return (
        <>
            <div className="flex flex-col gap-4 px-4 items-center justify-center">

                <Formik
                    initialValues={initialValues}
                    validationSchema={signUpSchema}
                    onSubmit={handleSignUp}
                >
                    {formik => {
                        return (
                            <Form className="w-80 max-w-[400px] md:w-[400px]">
                                <Field
                                    id="name"
                                    name="name"
                                    label="name"
                                    labelText="Name"
                                    type="text"
                                    placeholder="John Doe"
                                    component={Input}
                                />

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

                                <Field
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    label="repeatPassword"
                                    labelText="Confirm password"
                                    type="password"
                                    placeholder="**********"
                                    component={Input}
                                />

                                <button
                                    type="submit"
                                    disabled={!formik.isValid}
                                    className={`w-full ${!formik.isValid ? "bg-slate-300" : "bg-purple-500 hover:bg-purple-700"} rounded text-white px-3 py-3 mt-6`}
                                >
                                    Register
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