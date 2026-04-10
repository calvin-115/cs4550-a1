"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const pathname = usePathname();
    const links = currentUser ? ["profile"] : ["signin", "signup"];
    return (
        <Nav variant="pills" className="flex-column">
            {links.map((link) => (
                <NavItem key={link}>
                    <NavLink as={Link} href={`/kambaz/account/${link}`}
                             active={pathname.includes(link)}>
                        {link.charAt(0).toUpperCase() + link.slice(1)}
                    </NavLink>
                </NavItem>
            ))}
            {currentUser && currentUser.role === "ADMIN" && (
                <NavItem>
                    <NavLink as={Link} href="/kambaz/account/users"
                             active={pathname.includes("users")}>
                        Users
                    </NavLink>
                </NavItem>
            )}
        </Nav>
    );
}