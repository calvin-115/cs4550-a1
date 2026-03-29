"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: "M101", name: "Introduction to Rocket Propulsion",
        description: "Basic principles of rocket propulsion",
        course: "RS101",
    });
    const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
               href={`${ASSIGNMENT_API_URL}`}>
                Get Assignment
            </a>
            <hr />

            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
               href={`${ASSIGNMENT_API_URL}/title`}>
                Get Title
            </a>
            <hr />

            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title" className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <FormControl className="w-75 mb-2" id="wd-assignment-title"
                         defaultValue={assignment.title}
                         onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />

            <a className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <FormControl className="w-75 mb-2" type="number"
                         defaultValue={assignment.score}
                         onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })} />

            <a className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Completed
            </a>
            <input className="form-check-input mb-2" type="checkbox"
                   defaultChecked={assignment.completed}
                   onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
            <hr />

            <h4>Working with Module Object</h4>
            <a id="wd-retrieve-module" className="btn btn-primary me-2"
               href={`${MODULE_API_URL}`}>
                Get Module
            </a>
            <a id="wd-retrieve-module-name" className="btn btn-primary me-2"
               href={`${MODULE_API_URL}/name`}>
                Get Module Name
            </a>
            <hr />
            <a className="btn btn-primary float-end"
               href={`${MODULE_API_URL}/name/${module.name}`}>
                Update Name
            </a>
            <FormControl className="w-75 mb-2"
                         defaultValue={module.name}
                         onChange={(e) => setModule({ ...module, name: e.target.value })} />
            <a className="btn btn-primary float-end"
               href={`${MODULE_API_URL}/description/${module.description}`}>
                Update Description
            </a>
            <FormControl className="w-75 mb-2"
                         defaultValue={module.description}
                         onChange={(e) => setModule({ ...module, description: e.target.value })} />
            <hr />
        </div>
    );
}