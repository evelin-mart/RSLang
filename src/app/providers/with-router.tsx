import { HashRouter } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () => (
  <HashRouter>    
    {component()}
  </HashRouter>
);
