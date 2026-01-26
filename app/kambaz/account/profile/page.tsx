import Link from "next/link";

export default function Profile() {
    return (
        <div style={{ maxWidth: 640 }}>
            <h1>Profile</h1>

            <div style={{ display: "grid", gap: 10 }}>
                <label>
                    Username:
                    <input type="text" defaultValue="calvin" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <label>
                    First Name:
                    <input type="text" defaultValue="Calvin" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <label>
                    Last Name:
                    <input type="text" defaultValue="Liang" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <label>
                    Password:
                    <input type="password" defaultValue="password123" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <label>
                    Date of Birth:
                    <input type="date" defaultValue="2004-01-01" style={{ marginLeft: 8 }} />
                </label>

                <label>
                    Email:
                    <input type="email" defaultValue="calvin@example.com" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <label>
                    Role:
                    <select defaultValue="STUDENT" style={{ marginLeft: 8 }}>
                        <option value="STUDENT">Student</option>
                        <option value="TA">TA</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </label>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {/* Signout goes back to signin */}
                    <Link href="/kambaz/account/signin">Signout</Link>
                    <span>|</span>
                    <Link href="/kambaz/dashboard">Go to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}
