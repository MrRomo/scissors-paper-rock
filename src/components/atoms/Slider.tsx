import React from 'react';

function NativeSlider({value, setValue}: {value: number, setValue: (e: number) => void}){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(e.target.value));
    }

    return (
        <div className='flex gap-2'>
            <input
                type="range"
                min={1} // Valor mínimo del slider
                max={300} // Valor máximo del slider
                value={value} // Valor actual del slider
                onChange={handleChange} // Función que se ejecuta al cambiar el valor
            />
            <div>{value}</div> {/* Mostrar el valor actual */}
        </div>
    );
}

export default NativeSlider;