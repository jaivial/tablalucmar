import React, { useState, useEffect } from 'react';


const TableComponent = () => {

    const [searchData, setSearchData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 50;

    const fetchData = (page) => {
      
        fetch(`/pagination.php?page=${page}&itemsPerPage=${itemsPerPage}`)
            .then(response => response.json())
            .then(data => {
                setSearchData(data.data);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching JSON data:', error));
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
           

            <div class="overflow-x-hiden mt-3 w-full flex flex-col items-center justify-center overflow-hidden md:w-[80%]">

                {searchData && searchData.length > 0 && (
                    <table class="mt-6">
                        <thead>
                            <tr class="text-center px-1 py-1 text-xs sm:text-base md:text-xl bg-slate-200 text-black w-auto">
                                <th class="text-center px-1 py-1 text-xs sm:text-sm md:text-xl">Dirección</th>
                                <th class="text-center px-1 py-1 text-xs sm:text-sm md:text-xl">Tipo</th>
                                <th class="text-center px-1 py-1 text-xs sm:text-sm md:text-xl">Uso</th>
                                <th class="text-center px-1 py-1 text-xs sm:text-sm md:text-xl">Superficie</th>
                                <th class="text-center px-1 py-1 text-xs sm:text-sm md:text-xl">Año de Construcción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchData.map((item, index) => (
                                <tr class="border-gray-900 border-4 bg-slate-600 overflow-hidden w-full"
                                key={index}>
                                    <td class="text-center px-2 py-2 text-xs sm:text-sm md:text-xl">{item.direccion}</td>
                                    <td class="text-center px-2 py-2 text-xs sm:text-sm md:text-xl">{item.tipo}</td>
                                    <td class="text-center px-2 py-2 text-xs sm:text-sm md:text-xl">{item.uso}</td>
                                    <td class="text-center px-2 py-2 text-xs sm:text-sm md:text-xl">{item.superficie}</td>
                                    <td class="text-center px-2 py-2 text-xs sm:text-sm md:text-xl">{item.ano_construccion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div class="flex flex-row justify-center items-center gap-3 bg-slate-50 text-black py-3 px-10 rounded-md">
                    <button class=" hover:bg-gray-700 bg-gray-900 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-md" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Anterior                    </button>
                    <span>{currentPage} de {totalPages}</span>
                    <button class=" hover:bg-gray-700 bg-gray-900 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-md" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Siguiente
                    </button>
                </div>
            </div>
        </>
    );
};

export default TableComponent;
