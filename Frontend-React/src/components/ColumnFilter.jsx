import React from 'react';

const ColumnFilter = ({ filterColumn, setFilterColumn }) => {
    const options = [
        { value: 'title', label: 'Título' },
        { value: 'body', label: 'Contenido' },
        { value: 'id', label: 'ID' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors h-full">
            <label htmlFor="column-select" className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Columna de Búsqueda
            </label>
            <select
                id="column-select"
                value={filterColumn}
                onChange={(e) => setFilterColumn(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 
                           text-gray-700 dark:text-gray-200 dark:bg-gray-700 transition duration-150 ease-in-out"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ColumnFilter;