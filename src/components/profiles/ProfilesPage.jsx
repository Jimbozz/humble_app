import { Card } from "react-bootstrap";
import Heading from "../common/Heading";
import Layout from "../../layout/Layout";
import ProfilesList from "./ProfilesList";

function ProfilesPage() {
  return (
    <Layout>
      <Heading content="Profiles Page" />
      <ProfilesList />
    </Layout>
  );
}

export default ProfilesPage;
