import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from "react-router"
import styles from './Sidebar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function SidebarButton({ title, icon, active, linkTo }) {
    const { t } = useTranslation()

    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    function changePage(pageRoute) {
        if (pageRoute === path) return
        navigate(pageRoute)
    }
    return (
        <div className={`${styles.sidebarButton} ${active ? styles.active : ''}`} onClick={() => changePage(linkTo)}>
            <FontAwesomeIcon icon={icon} className={styles.sidebarButtonIcon}></FontAwesomeIcon>
            <span className={styles.desktopOnly}>{t(`${title}`)}</span>
        </div>
    )
}

export default SidebarButton
