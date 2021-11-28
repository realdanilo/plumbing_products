import React from "react";
import Head from "next/Head";

const MetaSearchEngine = ({ title, description }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta httpEquiv="content-language" content="en-us" />
        <meta name="keywords" content="Van Marcke, Plumbing Supplies" />
        <meta name="author" content="Danilo Mera" />
        <meta name="developer" content="Danilo Mera" />
      </Head>
    </div>
  );
};

export default MetaSearchEngine;

MetaSearchEngine.defaultProps = {
  title: "Product Search",
  description: "Find product by SKU or description.",
};
