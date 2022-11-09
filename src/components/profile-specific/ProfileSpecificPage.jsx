import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import Heading from "../common/Heading";
import ProfileSpecific from "./ProfileSpecific";

function ProfileSpecificPage() {
  let { id } = useParams();

  return (
    <Layout>
      <Heading content={id} />
      <ProfileSpecific />
    </Layout>
  );
}

export default ProfileSpecificPage;
