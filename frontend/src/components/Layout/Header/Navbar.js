import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../../static/data'

const Navbar = ({activeHeading}) => {
    return (
        <div className='flex flex-col items-start 800px:flex-row 800px:items-end 800px:h-full gap-[30px] 800px:gap-3'>
             { navItems && navItems.map((item,index) => (
                <div key={index} className={`${activeHeading === index + 1 ? "bg-lime-500 text-white" : "bg-white text-[#333333]"} normalFlex 800px:h-[40px] font-[500] px-4 cursor-pointer}`}>
                    <Link to={item.url} >
                        {item.title}
                    </Link>
                </div>
                ))
             }
        </div>
      )
}

export default Navbar
