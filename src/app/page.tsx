import { ClientComponent } from "@/app/components/ClientComponent";
import { ServerComponent } from "@/app/components/ServerComponent";

const Home = async () => {
  return (
    <main>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
};

export default Home;
