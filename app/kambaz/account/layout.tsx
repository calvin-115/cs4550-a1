import { ReactNode } from "react";
import Link from "next/link";

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div id="wd-account-screen">
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
                        <Link href="/kambaz/account/signin" className="list-group-item text-danger border-0">Signin</Link>
                        <Link href="/kambaz/account/signup" className="list-group-item text-danger border-0">Signup</Link>
                        <Link href="/kambaz/account/profile" className="list-group-item text-danger border-0">Profile</Link>
                    </div>
                </div>
                <div className="flex-fill">
                    {children}
                </div>
            </div>
        </div>
    );
}