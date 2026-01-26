import Link from "next/link";

export default function Signin() {
    return (
        <div style={{ maxWidth: 520 }}>
            <h1>Signin</h1>

            <div style={{ display: "grid", gap: 10 }}>
                <label>
                    Username:
                    <input type="text" defaultValue="calvin" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <label>
                    Password:
                    <input type="password" defaultValue="password123" style={{ marginLeft: 8, width: "100%" }} />
                </label>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {/* Clicking navigates to Profile or Dashboard (rubric allows either) */}
                    <Link href="/kambaz/account/profile">Signin</Link>
                    <span>|</span>
                    <Link href="/kambaz/account/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
}
