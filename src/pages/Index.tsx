import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { TodoList } from "@/components/TodoList";

const Index = () => {
  return (
    <>
      <Header />
      <Layout>
        <TodoList />
      </Layout>
    </>
  );
};

export default Index;