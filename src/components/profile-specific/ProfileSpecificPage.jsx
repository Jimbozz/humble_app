import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import Heading from "../common/Heading";
import ProfileSpecific from "./ProfileSpecific";
import { Helmet } from "react-helmet-async";

function ProfileSpecificPage() {
  let { id } = useParams();

  return (
    <Layout>
      <Helmet>
        <title>{`Humble | ${id}`}</title>
      </Helmet>
      <Heading content={id} />
      <ProfileSpecific />
    </Layout>
  );
}

export default ProfileSpecificPage;
