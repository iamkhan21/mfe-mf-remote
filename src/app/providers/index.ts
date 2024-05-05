import { compose } from "func-compose";
import withTheme from "./with-theme";
import withTanstackQuery from "./with-tanstack-query";

export const withProviders = compose(withTheme, withTanstackQuery);
