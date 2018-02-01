import React from 'react';

export default props => {

    const historyList = props.data.map((item, index) => {
        const color = item.indexOf('High') > -1 ? 'red darken-3' : item.indexOf('Low') > -1 ? 'red lighten-1' : 'teal';
        return <li key={index} className={`center-align collection-item ${color}`}>{item}</li>
    });

    return (
        <ul className="collection">
            {historyList}
        </ul>
    )
}