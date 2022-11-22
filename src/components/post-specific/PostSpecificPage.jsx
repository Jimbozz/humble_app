import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import Heading from "../common/Heading";
import PostSpecific from "./PostSpecific";

export default function PostSpecificPage() {
  let { title } = useParams();

  return (
    <Layout>
      <Heading content={title} />
      <PostSpecific />
    </Layout>
  );
}
