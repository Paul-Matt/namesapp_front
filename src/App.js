import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Namelist2 from './components/Namelist2'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        height: theme.spacing(170),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}))

function App() {
    const classes = useStyles()

    return (
        <div className="App">
            <Typography variant="h4" align="center" gutterBottom>
                Names Application
            </Typography>
            <Divider />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Namelist2/>
                </Paper>
            </main>
        </div>

    )
}

export default App
