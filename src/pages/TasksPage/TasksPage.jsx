import TaskList from "../../components/TaskList/TaskList";
import styles from './TasksPage.module.css'
import { DndContext, useSensor, useSensors, PointerSensor, TouchSensor } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBoard } from "../../store/selectedBoardSlice";
import { updateBoard } from "../../services/boardService";
import * as FaIcons from 'react-icons/fa6'
import { useTranslation } from "react-i18next";
import { fetchBoardById } from '../../store/board/BoardActions'

const STATUSES = ["To Do", "In Progress", "Done"];

function TasksPage() {
    const dispatch = useDispatch();
    const selectedBoard = useSelector((state) => state.selectedBoard);
    const { t } = useTranslation();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );
    const getScoreBasedOnDifficulty = (difficulty) => {
        if (difficulty === "Easy") return 5;
        if (difficulty === "Medium") return 10;
        if (difficulty === "Hard") return 20;
        return 0;
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || !active) return;
        if (active.id === over.id) return;

        const tasks = selectedBoard.tasks || [];
        console.log(tasks);

        const draggedTask = tasks.find((t) => t.id === active.id);
        if (!draggedTask) return;
        console.log(draggedTask);

        const newStatus = over.id;
        if (STATUSES.includes(newStatus) && draggedTask.status !== newStatus) {
            let boardMembers = selectedBoard.members;

            let updatedBoardMembers = boardMembers.map(member => {
                if (newStatus === 'Done') {
                    const isAssigned = draggedTask.members.find(m => m.id === member.id);
                    if (isAssigned) {
                        return {
                            ...member,
                            score: Number(member.score || 0) + getScoreBasedOnDifficulty(draggedTask.difficulty)
                        };
                    }
                } else if (draggedTask.status === 'Done' && newStatus !== 'Done') {
                    const isAssigned = draggedTask.members.find(m => m.id === member.id);
                    if (isAssigned) {
                        return {
                            ...member,
                            score: Math.max(0, Number(member.score || 0) - getScoreBasedOnDifficulty(draggedTask.difficulty))
                        };
                    }
                }
                return member;
            });
            const updatedTasks = tasks.map((task) =>
                task.id === active.id ? { ...draggedTask, status: newStatus } : task
            );
            const updatedBoard = { ...selectedBoard, tasks: updatedTasks, members: updatedBoardMembers };
            dispatch(setSelectedBoard(updatedBoard));
            await updateBoard(selectedBoard.id, updatedBoard);
            dispatch(fetchBoardById(selectedBoard.id));
            return;
        }

        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === over.id);
        if (activeIndex === -1 || overIndex === -1) return;
        if (tasks[activeIndex].status !== tasks[overIndex].status) return;
        const reordered = [...tasks];
        const [removed] = reordered.splice(activeIndex, 1);
        reordered.splice(overIndex, 0, removed);
        const updatedBoard = { ...selectedBoard, tasks: reordered };
        dispatch(setSelectedBoard(updatedBoard));
        await updateBoard(selectedBoard.id, updatedBoard);
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.boardHeaderCard}>
                <div className={styles.boardMeta}>
                    <span className={styles.boardLabel}>{t("Active Board")}</span>
                    <FaIcons.FaClipboardList className={styles.boardIcon} />
                </div>
                <h1 className={styles.boardName}>{selectedBoard?.title && ` ${selectedBoard.title}`}</h1>
                <div className={styles.boardStats}>
                    <span>
                        {selectedBoard?.tasks && selectedBoard.tasks.length}{" "}
                        {selectedBoard?.tasks && selectedBoard.tasks.length === 1 ? t("Task") : t("Tasks")}
                    </span>
                    <span>•</span>
                    <span>
                        {selectedBoard?.members && selectedBoard.members.length}{" "}
                        {selectedBoard?.members && selectedBoard.members.length === 1 ? t("Member") : t("Members")}
                    </span>
                </div>
            </div>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div className={styles.boardContainer}>
                    {STATUSES.map((status) => (
                        <TaskList
                            key={status}
                            title={status}
                            status={status}
                            tasks={selectedBoard?.tasks?.filter((task) => task.status === status) || []}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    )
}

export default TasksPage
