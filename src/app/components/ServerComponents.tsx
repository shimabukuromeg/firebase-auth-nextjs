import Link from "next/link";
import { useSession } from "./useSession";
import { cookies } from 'next/headers'
import { auth } from "@/lib/admin"
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'

const ServerComponent = async () => {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('session')?.value
    if (!sessionCookie) {
        redirect('/login')
    }

    const decodedClaims = await auth.verifySessionCookie(
        sessionCookie,
        true
    );

    const user = {
        user_id: decodedClaims.user_id,
        email: decodedClaims.email,
        name: decodedClaims.name,
        sub: decodedClaims.sub,
    }

    console.log('decodedClaims', decodedClaims)

    return (<>
        <p>ServerComponent</p>
        <p>Logged in</p>
        <p>{JSON.stringify(user)}</p>
    </>);
};

export default ServerComponent;