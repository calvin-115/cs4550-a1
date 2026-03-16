"use client";
import Link from "next/link";
import { Provider } from "react-redux";
import store from "./store";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";

export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }
    return (
        <Provider store={store}>
            <div id="wd-lab4" className="container">
                <h2>Lab 4</h2>
                <Link href="./lab4/redux" className="btn btn-primary me-2">Redux Examples</Link>
                <Link href="./lab4/react-context" className="btn btn-primary me-2">React Context Examples</Link>
                <Link href="./lab4/zustand" className="btn btn-primary me-2">Zustand Examples</Link>
                <Link href="./lab4/query-parameters" className="btn btn-primary">URL Encoding</Link>
                <hr />
                <ClickEvent />
                <PassingDataOnEvent />
                <PassingFunctions theFunction={sayHello} />
                <EventObject />
                <Counter />
                <BooleanStateVariables />
                <StringStateVariables />
                <DateStateVariable />
                <ObjectStateVariable />
                <ArrayStateVariable />
                <ParentStateComponent />
            </div>
        </Provider>
    );
}