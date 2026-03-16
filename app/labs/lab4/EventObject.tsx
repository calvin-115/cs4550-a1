"use client";
export default function EventObject() {
    return (
        <div id="wd-event-object">
            <h2>Event Object</h2>
            <button id="wd-event-object-click" className="btn btn-primary"
                    onClick={(e) => {
                        const target = e.target as HTMLElement;
                        alert(JSON.stringify(
                            { type: e.type, target: target.outerHTML },
                            null, 2
                        ));
                    }}>
                Event Object
            </button>
            <hr />
        </div>
    );
}