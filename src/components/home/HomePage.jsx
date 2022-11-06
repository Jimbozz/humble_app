import Heading from "../../layout/Heading";
import Layout from "../../layout/Layout";
import PostsList from "../posts/PostsList";

function HomePage() {
  return (
    <Layout>
      <Heading content="Home Page" />
      <PostsList />
    </Layout>
  );
}

export default HomePage;
