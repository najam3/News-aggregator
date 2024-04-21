import React, { useContext, useEffect, useState } from 'react';
import { IoFilter } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";
import { GrResources } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { TbCategory2 } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { IoIosAdd } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from 'axios';
import { apiKey } from '../config';
import { NewsContext } from '../context/newsContext';

const Filters = () => {
    const [open, setOpen] = useState(false);
    const [dropId, setDropId] = useState();
    const [authors, setAuthors] = useState(['Tesla', 'Apple', 'Samsung', 'Ford', 'CNN']);
    const [categories, setCategories] = useState(['Politics', 'Business', 'Crime', 'Education', 'Film']);
    const [sources, setSources] = useState(['CNN', 'Techcrunch', 'Newsweek', 'News Broadcast']);
    const [newAuthor, setNewAuthor] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newSource, setNewSource] = useState('');
    const [showCloseBtn, setShowCloseBtn] = useState(false)
    const [myAuthor, setMyAuthor] = useState('');
    const [myCategory, setMyCategory] = useState('Politics');
    const [mySource, setMySource] = useState('');
    const [showIndex, setShowIndex] = useState();
    const [results, setResults] = useState([]);
    const context = useContext(NewsContext);
    const { setData, setIsLoading } = context;

    const addAuthor = (e) => {
        setAuthors((prev) => {
            return [...prev, newAuthor]
        })
    }

    const addCategory = (e) => {
        setCategories((prev) => {
            return [...prev, newCategory]
        })
    }
    const addSource = (e) => {
        setSources((prev) => {
            return [...prev, newSource]
        })
    }

    const removeAuthor = (author) => {
        authors.splice(author, 1);
    }

    const removeCategory = (cat) => {
        categories.splice(cat, 1);
    }

    const removeSource = (src) => {
        sources.splice(src, 1);
    }
    
    useEffect(() => {
        setIsLoading(true)
        if (myCategory) {
            axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${myCategory.toLowerCase()}&apiKey=${apiKey}`)
                .then(res => {
                    setData(res.data.articles);
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (mySource) {
            axios.get(`https://newsapi.org/v2/top-headlines?sources=${mySource.toLowerCase()}&apiKey=${apiKey}`)
                .then(res => {
                    setData(res.data.articles);
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            const dayOfTheMonth = new Date().getDate();
            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            let endpoint = `https://newsapi.org/v2/everything?q=${myAuthor.toLowerCase()}&from=${year}-${month}-${dayOfTheMonth}&sortBy=publishedAt&apiKey=${apiKey}`;
            axios.get(endpoint)
                .then(res => {
                    setData(res.data.articles);
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [myCategory, mySource, myAuthor])



    return (
        <div className='filters border shadow flex-1 max-w-[300px] min-h-[91vh]'>
            <div className='py-4  flex items-center ps-5 pe-2 border-b justify-between'>
                <div className='flex items-center gap-2'>
                    <span>
                        <IoFilter />
                    </span>
                    <h2 className='font-medium'>Filters</h2>
                </div>

                <div>
                    <span>
                        <RiCloseFill size={20} />
                    </span>
                </div>
            </div>

            <div className='py-4 ps-5 pe-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <span>
                            <GrResources />
                        </span>
                        <h2 className='font-medium'>Sources</h2>
                    </div>

                    <div id='sources' className='border cursor-pointer' onClick={(e) => {
                        setDropId(e.currentTarget.id)
                        setOpen(!open)
                    }}>
                        {
                            dropId === 'sources' && open ?
                                <span>
                                    <IoIosArrowUp size={15} />
                                </span>
                                :
                                <span>
                                    <IoIosArrowDown size={15} />
                                </span>
                        }
                    </div>
                </div>

                <div className={`${dropId === 'sources' && open ? 'block' : 'hidden'} w-[90%] mt-2`}>
                    <div className='flex items-center justify-between'>
                        <input value={newSource} onChange={(e) => setNewSource(e.target.value)} type='text' className='py-1 w-[80%] border ps-2 text-xs' placeholder='Add New Source' />
                        <IoIosAdd className='cursor-pointer hover:scale-[1.4] transition-all' onClick={addSource} />
                    </div>
                    <div className='mt-4 flex flex-wrap'>
                        {
                            sources.map((source, index) => (
                                <div
                                    onClick={() => {
                                        setMySource(sources[index]);
                                        setMyCategory('');
                                        setMyAuthor('');
                                    }}
                                    key={index} onMouseEnter={() => {
                                        setShowCloseBtn(true)
                                        setShowIndex(index)
                                    }}
                                    onMouseLeave={() => {
                                        setShowCloseBtn(false)
                                    }}
                                    className={`relative ${mySource === source ? 'bg-red-500 text-white' : ''} me-2 mb-2 text-xs px-3 py-2 border rounded w-max`}>
                                    {source}
                                    <span onClick={() => {
                                        removeSource(index)
                                        setNewSource('');
                                    }} className={`${showCloseBtn && index === showIndex ? 'block' : 'hidden'} cursor-pointer absolute top-0 right-0`}>
                                        <IoMdCloseCircleOutline size={10} className='hover:scale-[1.4] transition-all' />
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className='py-4 relative ps-5 pe-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <span>
                            <TbCategory2 />
                        </span>
                        <h2 className='font-medium'>Categories</h2>
                    </div>

                    <div id='categories' className='border cursor-pointer' onClick={(e) => {
                        setDropId(e.currentTarget.id)
                        setOpen(!open)
                    }}>
                        {
                            dropId === 'categories' && open ?
                                <span>
                                    <IoIosArrowUp size={15} />
                                </span>
                                :
                                <span>
                                    <IoIosArrowDown size={15} />
                                </span>
                        }
                    </div>
                </div>

                <div className={`${dropId === 'categories' && open ? 'block' : 'hidden'} w-[90%] mt-2`}>
                    <div className='flex items-center justify-between'>
                        <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} type='text' className='py-1 w-[80%] border ps-2 text-xs' placeholder='Add New Category' />
                        <IoIosAdd className='cursor-pointer hover:scale-[1.4] transition-all' onClick={addCategory} />
                    </div>
                    <div className='mt-4 flex flex-wrap'>
                        {
                            categories.map((cat, index) => (
                                <div
                                    onClick={() => {
                                        setMyCategory(categories[index]);
                                        setMyAuthor('');
                                        setMySource('');
                                    }}
                                    key={index} onMouseEnter={() => {
                                        setShowCloseBtn(true)
                                        setShowIndex(index)
                                    }}
                                    onMouseLeave={() => {
                                        setShowCloseBtn(false)
                                    }}
                                    className={`relative ${myCategory === cat ? 'bg-red-500 text-white' : ''} me-2 mb-2 text-xs px-3 py-2 border rounded w-max`}>
                                    {cat}
                                    <span onClick={() => {
                                        removeCategory(index)
                                        setNewCategory('');
                                    }} className={`${showCloseBtn && index === showIndex ? 'block' : 'hidden'} cursor-pointer absolute top-0 right-0`}>
                                        <IoMdCloseCircleOutline size={10} className='hover:scale-[1.4] transition-all' />
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='py-4 flex items-center relative ps-5 pe-2 justify-between'>
                <div className='flex items-center gap-2'>
                    <span>
                        <ImProfile />
                    </span>
                    <h2 className='font-medium'>Publishers</h2>
                </div>

                <div id='authors' className='border cursor-pointer' onClick={(e) => {
                    setDropId(e.currentTarget.id)
                    setOpen(!open)
                }}>

                    {
                        dropId === 'authors' && open ?
                            <span>
                                <IoIosArrowUp size={15} />
                            </span>
                            :
                            <span>
                                <IoIosArrowDown size={15} />
                            </span>
                    }
                </div>
                <div className={`${dropId === 'authors' && open ? 'block' : 'hidden'} absolute top-full w-[90%] py-3`}>
                    <div className='flex items-center justify-between'>
                        <input value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} type='text' className='py-1 w-[80%] border ps-2 text-xs' placeholder='Add New Author' />
                        <IoIosAdd className='cursor-pointer hover:scale-[1.4] transition-all' onClick={addAuthor} />
                    </div>
                    <div className='mt-4 flex flex-wrap'>
                        {
                            authors.map((auth, index) => (
                                <div
                                    onClick={() => {
                                        setMyAuthor(authors[index]);
                                        setMyCategory('');
                                        setMySource('');
                                    }}
                                    key={index} onMouseEnter={() => {
                                        setShowCloseBtn(true)
                                        setShowIndex(index)
                                    }}
                                    onMouseLeave={() => {
                                        setShowCloseBtn(false)
                                    }}
                                    className={`relative ${myAuthor === auth ? 'bg-red-500 text-white' : ''} me-2 mb-2 text-xs px-3 py-2 border rounded w-max`}>
                                    {auth}
                                    <span onClick={() => {
                                        removeAuthor(index)
                                        setNewAuthor('')
                                    }} className={`${showCloseBtn && index === showIndex ? 'block' : 'hidden'} cursor-pointer absolute top-0 right-0`}>
                                        <IoMdCloseCircleOutline size={10} className='hover:scale-[1.4] transition-all' />
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    {/* <button className='border transition-all text-sm p-2 rounded w-full mt-2 hover:bg-red-500 hover:text-white'>
                        Find Articles
                    </button> */}
                </div>
            </div>
        </div>
    )
};

export default Filters;