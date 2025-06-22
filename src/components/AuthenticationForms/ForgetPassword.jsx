import { useState } from "react";
import { useForm } from "react-hook-form";
import { getUserByEmail } from '../../services/userService'
import { sendOTP } from '../../services/otpService'
import styles from '../../pages/AuthenticationPage/Authentication.module.css'
import { Link } from "react-router";
let user = null;

function ForgetPassword() {
    const [registered, setRegistered] = useState(false);

    const {
        register,
        handleSubmit: submitHandler,
        formState: { errors },
        setError,
    } = useForm();

    const handleSubmit = async ({ email }) => {
        try {
            user = await getUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            await sendOTP(email);
            setRegistered(true);
        } catch (error) {
            setError("root", {
                message: error.message,
            });
        }
    };
    return (
        <>
            {registered ? (
                <OTPForm user={user} />
            ) : (
                <div className={`${styles.imageFormContainer}`}>
                    <div className={`${styles.imageContainer}`}>
                        <img src="/forget.png" alt="Register" />
                    </div>

                    <form
                        className={`${styles.formContainer}`}
                        onSubmit={submitHandler(handleSubmit)}
                    >
                        <h1 className={`${styles.formTitle}`}>Forget password</h1>
                        {errors.root && (
                            <p className={`${styles.errorMsg}`}>{errors.root.message}</p>
                        )}
                        <input
                            className={`${styles.formInput} ${errors.email && `${styles.error}`
                                }`}
                            type="text"
                            placeholder="Email"
                            name="email"
                            {...register("email", {
                                required: "This field is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className={`${styles.errorMsg}`}>{errors.email.message}</p>
                        )}
                        <input
                            className={`${styles.formInput}`}
                            type="submit"
                            value={"Reset Password"}
                        />
                        <hr className={`${styles.divider}`} />
                        <p>
                            Don't have an account?{" "}
                            <Link className={`${styles.link}`} to={`/register`}>
                                Create one
                            </Link>
                        </p>
                    </form>
                </div>
            )}
        </>
    )
}

export default ForgetPassword
