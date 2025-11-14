import React, { useState, useMemo } from 'react';
import { useDataFetcher } from '../hooks/useDataFetcher';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import ColumnFilter from '../components/ColumnFilter';
import ThemeToggle from '../components/ThemeToggle';


function DataDisplay() {
    const { data, loading, error } = useDataFetcher();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState('title');

    const filteredData = useMemo(() => {
        let currentData = data;

        if (searchTerm && filterColumn) {
            const lowerCaseSearch = searchTerm.toLowerCase();

            currentData = currentData.filter(post => {
                const value = post[filterColumn];
                if (value === null || value === undefined) return false;
                return value.toString().toLowerCase().includes(lowerCaseSearch);
            });
        }

        return currentData;
    }, [data, searchTerm, filterColumn]);

    if (loading) {
        return <div className="text-center p-8 text-xl font-semibold">Cargando datos...</div>;
    }

    if (error && filteredData.length === 0) {
        return <div className="text-center p-8 text-red-500 font-bold">No se pudieron cargar los datos iniciales. Revise la consola.</div>;
    }

    return (
        <div className="min-h-screen transition-colors duration-500">
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Visualización de Posts de JsonPlaceHolder
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-1">
                        <ColumnFilter
                            filterColumn={filterColumn}
                            setFilterColumn={setFilterColumn}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            placeholder={`Buscar por ${filterColumn}...`}
                        />
                    </div>
                </div>
                <div className="mt-4 shadow-lg rounded-lg overflow-hidden">
                    <Table data={filteredData} />
                </div>

                {filteredData.length === 0 && !loading && (
                    <p className="text-center mt-6 text-gray-500 dark:text-gray-400">No se encontraron resultados para la búsqueda.</p>
                )}
            </div>
        </div>
    );
}

export default DataDisplay;