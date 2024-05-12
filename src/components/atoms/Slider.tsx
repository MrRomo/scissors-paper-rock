import React from 'react';

interface NativeSliderProps {
    setValue: (e: number) => void;
    min: number;
    max: number;
    value: number;
    step?: number;
    disabled?: boolean;
}

export function NativeSlider({ value, setValue, min, max, step, disabled }: NativeSliderProps) {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }

    return (
        <div className='flex gap-2'>
            <input
                type="range"
                min={min || 1} // Valor mínimo del slider
                max={max || 300} // Valor máximo del slider
                value={value} // Valor actual del slider
                onChange={handleChange} // Función que se ejecuta al cambiar el valor
                step={step || 1}
                disabled={disabled}
            />
            <div>{value}</div> {/* Mostrar el valor actual */}
        </div>
    );
}
