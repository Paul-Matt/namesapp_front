import * as React from 'react';
import {apiStates, useApi} from './useApi.js';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';

const Namelist2 = () => {
    const { state, error, data } = useApi('http://localhost:8080/names')

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headername: 'Firstname', width:130},
        { field: 'amount', headername: 'Amount', width: 130},
    ];

    const sortModel = [
        {
          field: 'amount',
          sort: 'desc',
        },
      ];
    

    switch (state) {
        case apiStates.ERROR:
          return <p>ERROR: {error || 'General error'}</p>;
        case apiStates.SUCCESS:
          return (
            <div style={{ height: 400, width: '60%' }}>
                <DataGrid sortModel={sortModel} rows={data} columns={columns} pageSize={20} checkboxSelection />
            </div>
          );
        default:
          return <p>loading..</p>;
      }
}

export default Namelist2;