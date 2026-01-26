import Link from "next/link";

const linkStyle: React.CSSProperties = {
    display: "block",
    padding: "8px 10px",
    borderRadius: 8,
    textDecoration: "none",
    color: "black",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", gap: 18 }}>
            <aside style={{ width: 200, borderRight: "1px solid #ddd", paddingRight: 12 }}>
                <h3 style={{ marginTop: 0 }}>Account</h3>
                <Link href="/kambaz/account/signin" style={linkStyle}>Signin</Link>
                <Link href="/kambaz/account/signup" style={linkStyle}>Signup</Link>
                <Link href="/kambaz/account/profile" style={linkStyle}>Profile</Link>
            </aside>

            <section style={{ flex: 1 }}>{children}</section>
        </div>
    );
}
