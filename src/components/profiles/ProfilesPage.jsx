import Heading from "../common/Heading";
import Layout from "../../layout/Layout";
import ProfilesList from "./ProfilesList";
import { Helmet } from "react-helmet-async";

function ProfilesPage() {
  return (
    <Layout>
      <Helmet>
        <title>Humble | Profiles</title>
      </Helmet>
      <Heading content="Profiles" />
      <ProfilesList />
    </Layout>
  );
}

export default ProfilesPage;
