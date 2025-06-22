import styles from './layout.module.css'
import Sidebar from '../components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router';
function BoardLayout() {
    const collapseState = useSelector((state) => state.sidebarCollaps.collapsed);
    return (
        <div className={`${styles.layout_continer} ${collapseState ? styles.collapsed : ""}`}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.outlit_container}>
                <Outlet />
            </div>
        </div>
    )
}

export default BoardLayout
