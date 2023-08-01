import { useAuthContext } from "@/providers/AuthProvider"
import ServerComponent from "./components/ServerComponents";
import ClientComponent from "./components/ClientComponents";

export default function Home() {
  return (
    <>
      <ClientComponent />
      <hr />
      <ServerComponent />
    </>
  )
}
