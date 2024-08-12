import React from 'react';

const Alert = ({ alerts }) => {
    return (
        <div>
            <h2>Alerts</h2>
            {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                    <div key={index}>
                        <p>{alert.name} exceeds temperature threshold!</p>
                    </div>
                ))
            ) : (
                <p>No alerts.</p>
            )}
        </div>
    );
};

export default Alert;