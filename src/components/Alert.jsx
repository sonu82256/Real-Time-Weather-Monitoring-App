import React from 'react';
import { useEffect } from 'react';

const Alert = ({ alerts }) => {
     const fun= (val) => {
        alert(`${val} exceeds temperature threshold!`)
     }
    return (
        <div className='bg-red-600 text-white shadow-lg rounded-lg overflow-hidden w-2/6 max-w-50% mx-auto my-4 p-2'>
            <h2>Alerts</h2>
            {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                    <div key={index}>
                        <p>{alert.name} exceeds temperature threshold!</p>
                        {fun(alert.name)}
                    </div>
                ))
            ) : (
                <p>No alerts.</p>
            )}
        </div>
    );
};

export default Alert;