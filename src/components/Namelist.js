import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js';

class Namelist extends Component {
    constructor(props) {
        super(props);
        this.state = { names: []};
    }

componentDidMount() {
    const url = SERVER_URL + 'names'
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
            names: responseData,
        });
    })
    .catch(err => console.error(err));
}

    render() {
        const tableRows = this.state.names.map((firstname, index) =>
        <tr key={index}>
            <td>{firstname.name}</td>
            <td>{firstname.amount}</td>
        </tr>
        );

        return (
            <div className="App">
                <table>
                    <tbody>{tableRows}</tbody>
                </table>
            </div>
        );
    }
}

export default Namelist;