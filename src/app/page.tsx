import ClientComponent from "@/app/components/ClientComponent";
import ServerComponent from "@/app/components/ServerComponent";
import Header from "@/app/components/Header";

const Home = async () => {
  return (
    <main>
      <Header />
      {/* <ClientComponent /> */}
      {/* @ts-ignore */}
      <ServerComponent />
    </main>
  );
};

export default Home;
