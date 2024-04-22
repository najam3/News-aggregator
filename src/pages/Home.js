import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../components/Navigtion';
import Filters from '../components/Filters';
import { IoFilter } from "react-icons/io5";
import { apiKey } from '../config';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NewsContext } from '../context/newsContext';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const context = useContext(NewsContext);
    const { data, setOpenFilter } = context;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay:true,
        responsive: [
            {
                breakpoint: 1024, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 2, // Show 2 slides when screen size is smaller
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 1, // Show 2 slides when screen size is smaller
                    slidesToScroll: 1,
                },
            },
        ],
    };


 
    useEffect(() => {
        const topHeadLines = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        axios.get(topHeadLines)
            .then(res => {
                setArticles(res.data.articles)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <Navigation />
            <section className='pt-4'>
                <h1 className='text-3xl px-6 pb-4'>Top Stories</h1>
                <hr />
                <div className='slider-container pb-6 pt-5 px-6'>
                    <Slider {...settings}>
                        {
                            articles.map((article, index) => (
                                <div className={`${article.source.name === "[Removed]" ? 'hidden' : 'block'} border h-full shadow pb-2 h-full`}>

                                    <div className='h-[300px]'>
                                        <img src={article.urlToImage || '/dummy-article-img.jpg'} alt='' style={{ objectFit: 'cover' }} className='w-full  h-full' />
                                    </div>
                                    <div className='content p-2'>
                                        <p className='text-sm font-bold'>{article.title}</p>
                                    </div>
                                    <div className='flex px-2 text-xs justify-between'>
                                        <p className=''>{new Date(article.publishedAt).toLocaleString()}</p>
                                        <h5 className='font-medium'>-{article.author}</h5>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                <hr className='m-0 p-0' />
                <div className='flex'>
                    <Filters />
                    <div className='flex-1'>
                        <div className='text-end block md:hidden ps-2 mt-2'>
                            <button onClick={() => setOpenFilter(true)} className='border flex gap-2 items-center px-2 rounded py-1'>
                                <span>Filter</span>
                                <IoFilter />
                            </button>
                        </div>
                        <div className='flex gap-2 flex-wrap p-2'>
                            {
                                data?.length === 0 ?
                                    <p>No Results Found!</p>
                                    :
                                    data?.map((article, index) => (
                                        <a href={article.url} target='_blank' className={`${article.source.name === "[Removed]" ? 'hidden' : 'block'} border hover:scale-[1.01] transition-all duration-[200ms] shadow pb-2 w-[100%] mb-2 sm:mb-0 sm:w-[32%] md:w-full lg:w-[30%]`}>
                                            <div className='h-[300px]'>
                                                <img src={article.urlToImage || '/dummy-article-img.jpg'} alt='' style={{ objectFit: 'cover' }} className='w-full  h-full' />
                                            </div>
                                            <div className='content p-2'>
                                                <p className='text-sm font-bold'>{article.title}</p>
                                            </div>
                                            <div className='flex px-2 text-xs justify-between'>
                                                <div className='flex gap-2'>
                                                    <p className=''>{new Date(article.publishedAt).toLocaleString()}</p>
                                                    |
                                                    <p className='font-medium'>{article.source.name}</p>
                                                </div>
                                                <h5 className='font-medium'>-{article.author}</h5>
                                            </div>
                                        </a>
                                    ))
                            }
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
};

export default Home;