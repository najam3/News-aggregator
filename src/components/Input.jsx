import React from 'react';
import { FaSearch } from 'react-icons/fa';
const Input = ({onChange, value}) => {

    return (
        <>
            <div className='search relative'>
                <FaSearch className='absolute bottom-[30%] left-[14px]' fill='gray' />
                <input 
                value={value} 
                onChange={onChange} 
                type='search' 
                className='border ps-10 pe-2 py-2 rounded text-black w-full' 
                placeholder='Find Articles' 
                />
            </div>

        </>
    )

};

export default Input;