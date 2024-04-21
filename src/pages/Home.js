import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../components/Navigtion';
import Filters from '../components/Filters';
import { apiKey } from '../config';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NewsContext } from '../context/newsContext';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const context = useContext(NewsContext);
    const { data } = context;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
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
                                <div className='border h-full shadow pb-2 max-w-[350px]'>

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
                    <div className='flex gap-2 flex-wrap flex-1 p-2'>
                        {
                            data?.map((article, index) => (
                                <div className={`${article.source.name === "[Removed]" ? 'hidden' : 'block'} border shadow pb-2 max-w-[30%]`}>

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
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
};

export default Home;