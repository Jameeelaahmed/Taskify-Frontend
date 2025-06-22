import styles from '../../pages/AuthenticationPage/Authentication.module.css'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendOTP } from '../../services/otpService'
import OTPForm from './OTPForm';
import { Link } from 'react-router';

function RegisterForm() {
    const [registered, setRegistered] = useState(false);
    const [pendingUser, setPendingUser] = useState(null);
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;

    const {
        register,
        handleSubmit: submitHandler,
        formState: { errors },
        setError,
        getValues,
    } = useForm();

    const handleSubmit = async ({ name, email, password }) => {
        try {
            const res = await fetch(`${baseUrl}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            console.log(res);

            if (res.status === 201) {
                await sendOTP(email);
                setPendingUser({ name, email, password });
                setRegistered(true);
            } else if (res.status === 409) {
                setError("root", { message: "This email is already registered. Please log in." });
            } else {
                const data = await res.json();
                setError("root", { message: data.message || "Registration failed." });
            }
        } catch (error) {
            setError("root", { message: error.message });
        }
    };
    return (
        <>
            {registered ? (
                <OTPForm user={pendingUser} verifyAccount={true} />
            ) : (
                <>
                    <div className={`${styles.imageFormContainer}`}>
                        <div className={`${styles.imageContainer}`}>
                            <img src="/login bg.jpg" alt="Register" />
                        </div>
                        <form
                            className={`${styles.formContainer}`}
                            onSubmit={submitHandler(handleSubmit)}
                        >
                            <h1 className={`${styles.formTitle}`}>Create an account</h1>
                            {errors.root && (
                                <p className={`${styles.errorMsg}`}>{errors.root.message}</p>
                            )}
                            <input
                                className={`${styles.formInput} ${errors.name && `${styles.error}`
                                    }`}
                                type="text"
                                placeholder="Name"
                                name="name"
                                {...register("name", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.name && (
                                <p className={`${styles.errorMsg}`}>{errors.name.message}</p>
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
                                className={`${styles.formInput} ${errors.password && `${styles.error}`
                                    }`}
                                type="password"
                                placeholder="Password"
                                name="password"
                                {...register("password", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.password && (
                                <p className={`${styles.errorMsg}`}>
                                    {errors.password.message}
                                </p>
                            )}
                            <input
                                className={`${styles.formInput} ${errors.confirmPassword && `${styles.error}`
                                    }`}
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                {...register("confirmPassword", {
                                    required: "This field is required",
                                    validate: (value) =>
                                        value === getValues("password") || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className={`${styles.errorMsg}`}>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                            <input
                                className={`${styles.formInput}`}
                                type="submit"
                                value={"Register"}
                            />
                            <hr className={`${styles.divider}`} />
                            <p>
                                Already have an account?{" "}
                                <Link className={`${styles.link}`} to={`/`}>
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </>
            )}
        </>
    )
}

export default RegisterForm
