import React, { useState } from 'react';
import {apiStates, useApi} from './useApi.js';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Namelist2 = () => {
    const { state, error, data } = useApi('http://localhost:8080/names')

    const classes = useStyles();

    // For the name selector
    const [showResults, setShowResults] = useState(false)
    const [selectedName, setSelectedName] = useState();
    const [selectedNameAmount, setSelectedNameAmount] = useState();
    
    // Colums for Datagrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 70, hide: true },
        { field: 'name', headername: 'Firstname', width:130},
        { field: 'amount', headername: 'Amount', width: 130},
    ];

    // Datagrid column default sorting based on popularity of name
    const sortModel = [
        {
          field: 'amount',
          sort: 'desc',
        },
    ];

    // Custom toolbar for Datagrid to show the total amount of names
    function CustomToolbar() {
      return <Grid>
                <p>Total amount of names: {data.map(name => name.amount)
                  .reduce((total, currentValue) => total + currentValue)}
                </p>
                <p>Type or select a spesific name:</p>
                <div style={{ width: 300 }}>
                    <Autocomplete
                      {...nameProps}
                      id="nameSelector"
                      renderInput={
                        (params) => 
                        <TextField {...params} 
                          label="firstname" 
                          margin="normal" 
                        />
                      }
                      onChange={handleNameSelected}
                    />
                    <div>
                      { showResults && <div id="result">There are {selectedNameAmount} people named {selectedName} on the list</div> }
                    </div>
                </div>  
              </Grid>
    }

    const nameProps = {
      options: data.map((firstname) => firstname.name),
    };

    // Showing the amount of selected name given as parameter
    const handleNameSelected = (event, value) => { 
      const result = data.find(firstname => firstname.name === value);
      setShowResults(true);
      setSelectedName(result.name);
      setSelectedNameAmount(result.amount);
      return <div id="result">Amount of {result.name} is {result.amount}</div>
    }


    switch (state) {
        case apiStates.ERROR:
          return <p>ERROR: {error || 'General error'}</p>;
        case apiStates.SUCCESS:
          return (
            <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}>
            <div style={{ height: 700, width: '50%' }}>
                <DataGrid 
                components={{
                  header: CustomToolbar
                }}
                sortModel={sortModel} rows={data} columns={columns} pageSize={20} checkboxSelection />
            </div>
            
            </Grid>
          );
        default:
          return <p>loading..</p>;
      }
}

export default Namelist2;