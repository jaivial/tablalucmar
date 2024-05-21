import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

const TextFormComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [formAction, setFormAction] = useState('form.php');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue === '' && formAction === 'form.php') {
            toast.error("¡Introduzca un mensaje!", {
                style: { backgroundColor: "#303030", color: "#fff" },
            });
        } else if (inputValue !== '' && formAction === 'form.php') {
            setFormAction('form.php');
            // Perform form submission with the updated action
            const form = document.getElementById('myForm');
            form.action = formAction;
            form.submit();
        }
    };

    const resetData = () => {
        // Update form action when resetting data
        setFormAction('resetform.php');
        // Perform form submission with the updated action
        const form = document.getElementById('myForm');
        form.action = formAction;
        form.submit();
    };

    return (
        <>
            <div>
                <Toaster />
            </div>
            <div>
                <form id="myForm" action={formAction} method='post' onSubmit={handleSubmit} class="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-0 md:items-center md:justify-around md:w-full md:text-center">
                    <input
                        type="text"
                        class="text-black rounded-md border-2 border-gray-300 px-3 py-2 w-[80%]"
                        name='query'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-3">Enviar</button>
                    <button onClick={resetData} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md ml-3">Ver todos</button>
                </form>
            </div>
        </>
    );
};

export default TextFormComponent;
