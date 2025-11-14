import React from 'react';

const Table = ({ data }) => {
    const columns = [
        { header: 'ID', accessor: 'id', width: 'w-[5%]' },       
        { header: 'Usuario ID', accessor: 'userId', width: 'w-[7%]' }, 
        { header: 'Título', accessor: 'title', width: 'w-[35%]' }, 
        { header: 'Contenido', accessor: 'body', width: 'w-[53%]' },  
    ];

    if (!data || data.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400 dark:bg-gray-700 rounded-b-lg">
                No hay datos disponibles para mostrar en la tabla.
            </div>
        );
    }

    return (
        <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-indigo-600">
                <tr>
                    {columns.map((col, index) => (
                        <th
                            key={index}
                            className={`${col.width} px-6 py-3 text-left text-xs font-medium 
                                       text-white uppercase tracking-wider`}
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700">
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-indigo-50 dark:hover:bg-gray-600 transition duration-150">
                        {columns.map((col, index) => (
                            <td 
                                key={index}
                                className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200 align-top"
                            >
                                <div 
                                    className={`${col.accessor === 'id' || col.accessor === 'userId' ? 'font-bold' : ''}`}
                                >
                                    {item[col.accessor]}
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;