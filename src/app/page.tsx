import { ClientComponent } from "@/app/components/ClientComponent";
import { ServerComponent } from "@/app/components/ServerComponent";

const Home = async () => {
  return (
    <main>
      {/* firebase sdk を使う場合は、Client側で動く / "use client"; */}
      <ClientComponent />
      {/* nextAuthを使う場合は、Server側で動く */}
      <ServerComponent />
    </main>
  );
};

export default Home;
