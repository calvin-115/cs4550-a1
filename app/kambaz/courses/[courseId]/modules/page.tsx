"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setModules, editModule, updateModule } from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import * as coursesClient from "../../client";

export default function Modules() {
    const { courseId } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const dispatch = useDispatch();

    const fetchModules = async () => {
        const modules = await coursesClient.findModulesForCourse(courseId as string);
        dispatch(setModules(modules));
    };

    const onCreateModuleForCourse = async () => {
        if (!courseId) return;
        const newModule = { name: moduleName, course: courseId };
        const module = await coursesClient.createModuleForCourse(courseId as string, newModule);
        dispatch(setModules([...modules, module]));
        setModuleName("");
    };

    const onRemoveModule = async (moduleId: string) => {
        await coursesClient.deleteModule(moduleId);
        dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
    };

    const onUpdateModule = async (module: any) => {
        await coursesClient.updateModule(module);
        dispatch(setModules(modules.map((m: any) => (m._id === module._id ? module : m))));
    };

    useEffect(() => {
        fetchModules();
    }, []);

    return (
        <div className="wd-modules">
            <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
                             addModule={onCreateModuleForCourse} />
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
                                                         onUpdateModule({ ...module, editing: false });
                                                     }
                                                 }}
                                                 defaultValue={module.name} />
                                )}
                                <ModuleControlButtons
                                    moduleId={module._id}
                                    deleteModule={(moduleId: string) => onRemoveModule(moduleId)}
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
    );
}