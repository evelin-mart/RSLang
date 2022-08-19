import './index.scss';
import { withProviders } from './providers';
import { Routing } from 'pages';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid className="app container" >
      <Routing />
    </Grid>
  );
}

export default withProviders(App);
