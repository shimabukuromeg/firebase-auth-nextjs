import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

const ServerComponent = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return (
            <div>
                <p>ServerComponent: Not signed in</p>
                <Link href="/signin">
                    <button type="button">Sign in</button>
                </Link>

            </div>
        );
    }

    return (<>
        <h2> Session info</h2 >
        <p>{JSON.stringify(session)}</p>
        <hr />
        <h2> User info</h2 >
        <p>uid: {JSON.stringify(user.uid)}</p>
    </>);
};

export default ServerComponent;
