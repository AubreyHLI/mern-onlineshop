import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../../static/data'

const Navbar = ({activeHeading}) => {
    return (
        <div className='flex items-start flex-col 800px:flex-row 800px:items-center overflow-y-scroll'>
             { navItems && navItems.map((item,index) => (
                <div className="normalFlex" key={index}>
                    <Link to={item.url} className={`${activeHeading === index + 1 ? "text-[#78be20]" : "text-[#333333]"} pb-[30px] text-lg 800px:pb-0 font-[500] px-6 cursor-pointer}`}>
                        {item.title}
                    </Link>
                </div>
                ))
             }
        </div>
      )
}

export default Navbar