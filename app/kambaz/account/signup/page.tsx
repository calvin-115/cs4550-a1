import Link from "next/link";

export default function Signup() {
    return (
        <div style={{ maxWidth: 520 }}>
            <h1>Signup</h1>

            <div style={{ display: "grid", gap: 10 }}>
                <label>
                    Username:
                    <input type="text" defaultValue="newuser" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <label>
                    Password:
                    <input type="password" defaultValue="password123" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <label>
                    Verify Password:
                    <input type="password" defaultValue="password123" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {/* Clicking navigates to signin */}
                    <Link href="/kambaz/account/signin">Signin</Link>
                    <span>|</span>
                    {/* Clicking navigates to profile */}
                    <Link href="/kambaz/account/profile">Signup</Link>
                </div>
            </div>
        </div>
    );
}
