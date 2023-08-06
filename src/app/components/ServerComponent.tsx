import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export const ServerComponent = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return (
            <div>
                <Link href="/signin">
                    <button type="button">ログインページへ</button>
                </Link>
                <h3>next auth user</h3>
                <p>未ログイン</p>

            </div>
        );
    }

    return (<>
        <h3>next auth session info</h3 >
        <p>{JSON.stringify(session)}</p>
        <p>uid: {JSON.stringify(user.uid)}</p>
    </>);
};
