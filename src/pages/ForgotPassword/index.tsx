import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import * as yup from "yup";

import { Input } from "../../components/shared/Input";
import { UserService } from "../../services/User";

interface IFormatData {
    email: string;
}

const forgotPasswordSchema: yup.SchemaOf<IFormatData> = yup.object().shape({
    email: yup
        .string()
        .email()
        .required()
});

export const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleSendResetPasswordEmail = async (values: IFormatData) => {
        const result = UserService.forgotPassword(values.email);

        if (result instanceof Error)
            toast.error(result.message);
        else
            toast.success("Password reset email sent successfully!", {
                onClose: () => navigate("/signIn")
            });
    };

    const initialValues: IFormatData = {
        email: ""
    };

    return (
        <>
            <div className="flex flex-col gap-4 px-4 items-center justify-center">

                <Formik
                    initialValues={initialValues}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={handleSendResetPasswordEmail}
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

                                <button
                                    type="submit"
                                    disabled={!formik.isValid}
                                    className={`w-full ${!formik.isValid ? "bg-slate-300" : "bg-purple-500 hover:bg-purple-700"} rounded text-white px-3 py-3 mt-6`}
                                >
                                    Send password reset email
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