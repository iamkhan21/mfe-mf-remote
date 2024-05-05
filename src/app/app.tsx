import { withProviders } from "./providers";
import UserCard from "../features/user-card";
import { Heading } from "@radix-ui/themes";
import React from "react";

const App = () => {
  return (
    <>
      <header className="app-container">
        <Heading size="7">USPM</Heading>
      </header>
      <main className="app-container">
        <UserCard />
      </main>
    </>
  );
};

export default withProviders(App);
