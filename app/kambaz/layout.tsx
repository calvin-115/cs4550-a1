import Link from "next/link";

const sidebarLinkStyle: React.CSSProperties = {
    display: "block",
    padding: "8px 10px",
    borderRadius: 8,
    textDecoration: "none",
    color: "black",
};

export default function KambazLayout({ children }: { children: React.ReactNode }) {
    const sampleCourseId = "cs4550";

    return (
        <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui" }}>
            <aside
                style={{
                    width: 220,
                    borderRight: "1px solid #ddd",
                    padding: 12,
                    background: "#fafafa",
                }}
            >
                <h2 style={{ margin: "8px 0 12px" }}>Kambaz</h2>

                <a
                    href="https://www.northeastern.edu"
                    target="_blank"
                    rel="noreferrer"
                    style={sidebarLinkStyle}
                >
                    NEU
                </a>

                <Link href="/kambaz/account" style={sidebarLinkStyle}>
                    Account
                </Link>
                <Link href="/kambaz/dashboard" style={sidebarLinkStyle}>
                    Dashboard
                </Link>
                <Link href={`/kambaz/courses/${sampleCourseId}/home`} style={sidebarLinkStyle}>
                    Course
                </Link>
                <Link href="/kambaz/calendar" style={sidebarLinkStyle}>
                    Calendar
                </Link>
                <Link href="/kambaz/inbox" style={sidebarLinkStyle}>
                    Inbox
                </Link>

                <hr style={{ margin: "12px 0" }} />

                <Link href="/labs/lab1" style={sidebarLinkStyle}>
                    Labs
                </Link>
            </aside>

            <main style={{ flex: 1, padding: 24 }}>{children}</main>
        </div>
    );
}
