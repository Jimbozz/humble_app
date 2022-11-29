import Heading from "../common/Heading";
import Layout from "../../layout/Layout";
import PostsList from "../posts/PostsList";
import { Helmet } from "react-helmet-async";

function HomePage() {
  return (
    <Layout>
      <Helmet>
        <title>Humble | Home</title>
      </Helmet>
      <Heading content="Home Page" />
      <PostsList />
    </Layout>
  );
}

export default HomePage;
