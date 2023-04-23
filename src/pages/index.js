import React, { useState } from "react";
import FileUploader from "./component/FileUploder";
import NavBar from "./component/NavBar";
import Loading from "./component/Loding";

import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>File Host-Free File Hosting</title>
        <meta
          name="description"
          content="We offering free file hosting, provide users with a convenient and reliable way to store and share their files without having to spend any money."
        />
      </Head>
      <Loading />
      <NavBar />
      <FileUploader />
    </>
  );
}
