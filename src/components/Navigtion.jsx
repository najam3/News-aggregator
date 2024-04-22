import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import Input from './Input';
import { NewsContext } from '../context/newsContext';





const Navigation = () => {
    const [search, setSearch] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const context = useContext(NewsContext);
    const { setSearchGlobal, setFromGlobal, setToGlobal } = context;
    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        const val = e.target.value
        setSearch(val);
    }






    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search || !from || !to) return;
        setSearchGlobal(search);
        setFromGlobal(from);
        setToGlobal(to);
    }

    useEffect(() => {
        setFrom(today);
        setTo(today);
    }, [])

    return (
        <div className='navbar bg-red-500 text-white py-3 flex items-center px-6 justify-between'>
            <div>
                <h4 className='font-bold'>All News</h4>
            </div>

            <nav>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2'>
                        <div className='flex gap-2 items-end'>
                            <h1>From</h1>
                            <input type='date' className='text-black p-1 text-xs rounded' value={from} onChange={(e) => setFrom(e.target.value)} id='from' />
                        </div>

                        <div className='flex gap-2 items-end'>
                            <h1>To</h1>
                            <input type='date' className='p-1 text-black rounded text-xs' value={to} onChange={(e) => setTo(e.target.value)} id='to' />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Input onChange={handleChange} value={search} />
                    </form>
                </div>
            </nav>

        </div>
    )

};

export default Navigation;

