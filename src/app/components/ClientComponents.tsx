"use client";

import { useAuthContext } from "@/providers/AuthProvider"

const ClientComponent = () => {
    const { user } = useAuthContext()
    return (
        <>
            <h1>Home</h1>
            <p>{user?.displayName}</p>
            <p>{user?.email}</p>
        </>
    )
};

export default ClientComponent;