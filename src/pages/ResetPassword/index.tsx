import { useNavigate, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import * as yup from "yup";

import { Input } from "../../components/shared/Input";
import { UserService } from "../../services/User";

interface IFormatData {
    password: string;
}

const resetPasswordSchema: yup.SchemaOf<IFormatData> = yup.object().shape({
    password: yup
        .string()
        .required()
        .min(8)
});

export const ResetPassword = () => {
    const { token } = useParams<{ token: string }>();

    const navigate = useNavigate();

    const handleResetPassword = async (values: IFormatData) => {
        const result = await UserService.resetPassword(token, values.password);

        if (result instanceof Error)
            toast.error(result.message);
        else
            toast.success("Password reset successfully!", {
                onClose: () => navigate("/signIn")
            });
    };

    const initialValues: IFormatData = {
        password: ""
    };

    return (
        <>
            <div className="flex flex-col gap-4 px-4 items-center justify-center">

                <Formik
                    initialValues={initialValues}
                    validationSchema={resetPasswordSchema}
                    onSubmit={handleResetPassword}
                >
                    {formik => {
                        return (
                            <Form className="w-80 max-w-[400px] md:w-[400px]">
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
                                    Reset my password
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