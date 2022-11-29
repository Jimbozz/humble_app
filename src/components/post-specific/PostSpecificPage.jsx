import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import Heading from "../common/Heading";
import PostSpecific from "./PostSpecific";
import { Helmet } from "react-helmet-async";

export default function PostSpecificPage() {
  let { title } = useParams();

  return (
    <Layout>
      <Helmet>
        <title>{`Humble | ${title}`}</title>
      </Helmet>
      <Heading content={title} />
      <PostSpecific />
    </Layout>
  );
}
