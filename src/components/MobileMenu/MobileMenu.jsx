import styles from './MobileMenu.module.css'
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaUser } from "react-icons/fa6"
import { Link } from 'react-router'
import { logout } from '../../services/userService'
import { t } from 'i18next'
function MobileMenu({
    toggleTheme,
    setThemeIcon,
    currentLang,
    handleLanguageChange,
    themeIcon,
    toggleMobileMenu,
    setToggleMobileMenu,
}) {
    return (
        <div className={`${styles.mobileMenu} ${toggleMobileMenu ? styles.showMenu : ""}`}>
            <Link to="/" onClick={() => setToggleMobileMenu(false)}>
                <p className={styles.logo}>Home</p>
            </Link>

            <div>
                <button onClick={() => setToggleMobileMenu(false)}>
                    <Link to="/createdboardsPage">
                        <p>{t("Created Boards")}</p>
                    </Link>
                </button>

                <button onClick={() => setToggleMobileMenu(false)}>
                    <Link to="/involvedboardsPage">
                        <p>{t("Involved Boards")}</p>
                    </Link>
                </button>

                <button
                    onClick={() => {
                        toggleTheme()
                        setThemeIcon(themeIcon === "light" ? "dark" : "light")
                        setToggleMobileMenu(false)
                    }}
                >
                    {themeIcon === "light" ? (
                        <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
                    ) : (
                        <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
                    )}
                </button>
                <button
                    className={styles.lang}
                    onClick={() => {
                        handleLanguageChange(currentLang === "ar" ? "en" : "ar")
                        setToggleMobileMenu(false)
                    }}
                >
                    {currentLang === "ar" ? "en" : "ar"}
                </button>
                <button
                    className={styles.signOut}
                    onClick={() => {
                        setToggleMobileMenu(false)
                        logout()
                    }}
                >
                    <FaUser />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default MobileMenu
