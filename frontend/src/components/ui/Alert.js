import React from 'react';

const Alert = ({ variant = 'info', children }) => {
    const baseStyles = 'p-4 rounded-lg mb-4';
    const variantStyles = {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        warning: 'bg-yellow-100 text-yellow-800',
    };

    return (
        <div className={`${baseStyles} ${variantStyles[variant]}`}>
            {children}
        </div>
    );
};

export const AlertDescription = ({ children }) => {
    return <p className="mt-2">{children}</p>;
};

export default Alert;
