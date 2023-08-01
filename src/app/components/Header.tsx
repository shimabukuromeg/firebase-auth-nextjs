"use client";

import { signOut, useSession } from "next-auth/react";

const Header = () => {
    const { data: session } = useSession();
    const user = session?.user;

    if (!user) {
        return null;
    }

    return (
        <>
            <div>
                <h1>Home</h1>
                <button onClick={async () => await signOut()}>Sign out</button>
            </div></>
    )

};

export default Header;
