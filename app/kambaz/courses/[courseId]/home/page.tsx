"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ModulesControls from "../modules/ModulesControls";
import LessonControlButtons from "../modules/LessonControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "../modules/ModuleControlButtons";
import { useDispatch } from "react-redux";
import { deleteModule, editModule, addModule, updateModule } from "../modules/reducer";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import Status from "./Status";

export default function Home() {
    const { courseId } = useParams();
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const dispatch = useDispatch();
    const [moduleName, setModuleName] = useState("");
    return (
        <div className="d-flex" id="wd-home">
            <div className="flex-fill">
                <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
                                 addModule={() => {
                                     dispatch(addModule({ name: moduleName, course: courseId }));
                                     setModuleName("");
                                 }} />
                <br />
                <ListGroup id="wd-modules" className="rounded-0">
                    {modules
                        .filter((module: any) => module.course === courseId)
                        .map((module: any) => (
                            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                                <div className="wd-title p-3 ps-2 bg-secondary">
                                    <BsGripVertical className="me-2 fs-3" />
                                    {!module.editing && module.name}
                                    {module.editing && (
                                        <FormControl className="w-50 d-inline-block"
                                                     onChange={(e) =>
                                                         dispatch(updateModule({ ...module, name: e.target.value }))
                                                     }
                                                     onKeyDown={(e) => {
                                                         if (e.key === "Enter") {
                                                             dispatch(updateModule({ ...module, editing: false }));
                                                         }
                                                     }}
                                                     defaultValue={module.name} />
                                    )}
                                    <ModuleControlButtons
                                        moduleId={module._id}
                                        deleteModule={(moduleId: string) => dispatch(deleteModule(moduleId))}
                                        editModule={(moduleId: string) => dispatch(editModule(moduleId))} />
                                </div>
                                {module.lessons && (
                                    <ListGroup className="wd-lessons rounded-0">
                                        {module.lessons.map((lesson: any) => (
                                            <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                                                <BsGripVertical className="me-2 fs-3" />
                                                {lesson.name}
                                                <LessonControlButtons />
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroupItem>
                        ))}
                </ListGroup>
            </div>
            <div className="d-none d-lg-block ms-3" style={{ minWidth: "250px" }}>
                <Status />
            </div>
        </div>
    );
}