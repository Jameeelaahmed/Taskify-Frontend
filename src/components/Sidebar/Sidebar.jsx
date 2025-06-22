import { faAngleLeft, faBorderAll, faDashboard, faTrophy } from "@fortawesome/free-solid-svg-icons"
import styles from './Sidebar.module.css'
import { useLocation } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from '../../store/sidebarSlice'
import { useParams } from "react-router"
import SidebarButton from "./SidebarButton"
function Sidebar() {
    const { id } = useParams()
    const collapseState = useSelector((state) => state.sidebarCollaps.collapsed)
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.user.id)
    const selectedBoard = useSelector((state) => state.selectedBoard)
    const boardOwner = selectedBoard?.owner || null

    const toggleCollapse = () => {
        dispatch(toggleSidebar())
    }

    const location = useLocation()
    const path = location.pathname

    return (
        <div className={`${styles.sidebar} ${collapseState ? styles.collapsed : ""}`}>
            {boardOwner === userId && (
                <SidebarButton
                    title="Dashboard"
                    icon={faDashboard}
                    active={path === `/${id}/dashboard`}
                    linkTo={`/${id}/dashboard`}
                ></SidebarButton>
            )}
            <SidebarButton
                title="Leaderboard"
                icon={faTrophy}
                active={path === `/${id}/leader-board`}
                linkTo={`/${id}/leader-board`}
            ></SidebarButton>
            <SidebarButton
                title="Tasks"
                icon={faBorderAll}
                active={path === `/${id}/tasks`}
                linkTo={`/${id}/tasks`}
            ></SidebarButton>
            <div
                className={`${styles.collapse} ${collapseState && styles.pointRight}`}
                onClick={toggleCollapse}
            >
                <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
            </div>
        </div>
    )
}

export default Sidebar
