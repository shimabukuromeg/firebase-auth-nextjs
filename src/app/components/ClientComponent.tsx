"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const ClientComponent = () => {
    const { data: session } = useSession();
    const user = session?.user;

    if (!user) {
        return (
            <div>
                <p>ClientComponent: Not signed in</p>
                <Link href="/signin">
                    <button type="button">Sign in</button>
                </Link>
            </div>
        );
    }

    return <p>{JSON.stringify(user)}</p>;
};

export default ClientComponent;
