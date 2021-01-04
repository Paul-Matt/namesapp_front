import React, { useState } from 'react'
import { apiStates, useApi } from './useApi.js'
import { DataGrid } from '@material-ui/data-grid'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    DataGridContent: {
        display: 'flex',
        height: '100%',
    },
    datagridHeaderContent: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
}))

const Namelist2 = () => {
    const { state, error, data } = useApi('https://namesapp-backend.herokuapp.com/names')
    const classes = useStyles()

    // For the name selector
    const [showResults, setShowResults] = useState(false)
    const [selectedName, setSelectedName] = useState()
    const [selectedNameAmount, setSelectedNameAmount] = useState()

    // Colums for Datagrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 70, hide: true },
        { field: 'name', headername: 'Firstname', width:130 },
        { field: 'amount', headername: 'Amount', width: 130 },
    ]

    // Datagrid column default sorting based on popularity of name
    const sortModel = [
        {
            field: 'amount',
            sort: 'desc',
        },
    ]

    // Custom toolbar for Datagrid to show the total amount of names
    function CustomToolbar() {
        return <div className={classes.datagridHeaderContent}>
            <Grid container spacing={3} justify="center">
                <Typography variant="h6" paragraph>
                    Total amount of names: {data.map(name => name.amount)
                        .reduce((total, currentValue) => total + currentValue)}
                </Typography>
                <Grid item xs={10} sm={8}>
                    <Autocomplete
                        {...nameProps}
                        id="nameSelector"
                        renderInput={
                            (params) =>
                                <TextField {...params}
                                    label="Type or select a specific name:"
                                    variant="outlined"
                                />
                        }
                        onChange={handleNameSelected}
                    />
                    <div>
                        { showResults && <div id="result">There are {selectedNameAmount} people named {selectedName} on the list</div> }
                    </div>
                </Grid>
            </Grid>
        </div>
    }

    const nameProps = {
        options: data.map((firstname) => firstname.name),
    }

    // Showing the amount of selected name given as parameter
    const handleNameSelected = (event, value) => {
        const result = data.find(firstname => firstname.name === value)
        setShowResults(true)
        setSelectedName(result.name)
        setSelectedNameAmount(result.amount)
    }


    switch (state) {
    case apiStates.ERROR:
        return <p>ERROR: {error || 'General error'}</p>
    case apiStates.SUCCESS:
        return (
            <div className={classes.DataGridContent}>
                <DataGrid
                    components={{
                        header: CustomToolbar
                    }}
                    sortModel={sortModel} rows={data} columns={columns} pageSize={20} checkboxSelection />
            </div>
        )
    default:
        return <p>loading..</p>
    }
}

export default Namelist2