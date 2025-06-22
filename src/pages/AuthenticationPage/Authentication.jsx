import styles from './Authentication.module.css'
import ForgetPassword from '../../components/AuthenticationForms/ForgetPassword';
import LoginForm from '../../components/AuthenticationForms/LoginForm';
import RegisterForm from '../../components/AuthenticationForms/RegisterForm';
function Authentication({ type }) {
    return (
        <div className={`${styles.mainContainer}`}>
            {(() => {
                if (type === "login") return <LoginForm />;

                if (type === "register") return <RegisterForm />;

                if (type === "forgetPassword") return <ForgetPassword />;
            })()}
        </div>

    )
}

export default Authentication
