import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Accordian from '../components/Accordian'
import DarkMode from '../components/DarkMode'
import Navbar from '../components/Navbar'
import Content from '../components/Content'
import MenuAccordian from '../components/MenuAccordian'

export default function MainPage() {
    const storedAllContent = JSON.parse(localStorage.getItem("allContent"));
    const [allContent, setAllContent] = useState(storedAllContent ? storedAllContent:[]);
    useEffect(() => {
            localStorage.setItem("allContent", JSON.stringify(allContent));
    }, [allContent])
    console.log("all content in mainpage",allContent);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const obj = [
        {
            hello: [
                "peter",
                "petera"
            ]
        },
        {
            dablu: [
                "babu",
                "nanu"
            ]
        },
        {
            dablu: [
                "babu",
                "nanu"
            ]
        },
    ]
    return (
        <div>
            {/* <Sidebar/> */}
            <Navbar blogData={allContent} setBlogData={setAllContent} />
            <div className='flex m-10 gap-20 '>
                {
                    width > 768 ? <Accordian pet={obj} /> : ""
                }
                <Content blogData={allContent} setBlogData={setAllContent}/>
            </div>
            <MenuAccordian/>
        </div>
    )
}
