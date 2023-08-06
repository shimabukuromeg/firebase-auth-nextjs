import { auth } from '@/firebase/admin'
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'
import { authOptions } from '../[...nextauth]/route';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const customToken = await auth.createCustomToken(user.uid)
    console.log("customToken", customToken)
    return NextResponse.json({ customToken: customToken })
}
