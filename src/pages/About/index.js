import React from "react";
import Layout from "@theme/Layout";
import Rain from "../../components/Rain";

const AboutMe = () => {
  return (
    <Layout
      title="About me"
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <div className="hero hero--primary container">
          <h1 className="hero__title">About me</h1>
          <Rain />
        </div>
      </main>
    </Layout>
  );
};

export default AboutMe;
