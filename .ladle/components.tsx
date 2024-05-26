import type { GlobalProvider } from "@ladle/react";
import { withProviders } from "../src/app/providers";

export const Provider: GlobalProvider = ({ children }) => {
  const WrappedComponent = withProviders(() => children);
  return <WrappedComponent />;
};
