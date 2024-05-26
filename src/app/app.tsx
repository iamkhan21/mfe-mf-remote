import { withProviders } from "./providers";
import { Heading, Text } from "@radix-ui/themes";

const App = () => {
  return (
    <>
      <header className="app-container">
        <Heading size="7">USPM</Heading>
      </header>
      <main className="app-container">
        <Text>Remote module for country data</Text>
      </main>
    </>
  );
};

export default withProviders(App);
