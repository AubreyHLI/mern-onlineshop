import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../static/data";

const Categories = () => {
    const navigate = useNavigate();

    return (
    <>
        <div className='section hidden sm:block'>
            <div className={`branding my-12 flex justify-between w-full shadow-md bg-white p-5 rounded-md`} >
                { brandingData && brandingData.map((i, index) => 
                    <div className="flex items-start" key={index}>
                        {i.icon}
                        <div className="px-3">
                            <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                            <p className="text-xs md:text-sm">{i.Description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div id="categories" className='section bg-white p-6 rounded-lg mb-12'>
            <div className="grid grid-cols-1 grid-tem gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
                {categoriesData && categoriesData.map(i => {
                    const handleCategoryClick = (i) => {  
                        navigate(`/products?category=${i.title}`);
                    };

                    return (
                        <div className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden" key={i.id} onClick={() => handleCategoryClick(i)}>
                            <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                            <img className="w-[120px] object-cover" alt="" src={i.image_Url}/>
                        </div>
                    );
                })}
            </div>
        </div>
    </>
    );
};

export default Categories;