import './App.css';
import Namelist2 from './components/Namelist2';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

function App() {
  return (
    <div className="App">
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Names Application
        </Typography>
        <Divider />
      <Namelist2/>
      </Grid>
    </div>
    
  );
}

export default App;
