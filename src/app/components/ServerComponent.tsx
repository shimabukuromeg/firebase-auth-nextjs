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

    return <p>{JSON.stringify(user)}</p>;
};

export default ServerComponent;
