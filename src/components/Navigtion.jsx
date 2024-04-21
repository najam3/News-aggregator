import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import Input from './Input';

const Navigation = () => {
    const [search, setSearch] = useState('');


    const handleChange = (e) => {
        const val = e.target.value
        setSearch(val);
    }

    return (
        <div className='navbar bg-red-500 text-white py-3 flex items-center px-6 justify-between'>
            <div>
                <h4 className='font-bold'>News Channel</h4>
            </div>

            <nav>
                <div className='flex gap-4'>
                    <ul className='flex items-center gap-8'>
                    </ul>
                    <Input onChange={handleChange} value={search} />
                </div>
            </nav>

        </div>
    )

};

export default Navigation;

