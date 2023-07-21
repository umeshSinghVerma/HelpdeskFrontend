import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Accordian from '../components/Accordian'
import DarkMode from '../components/DarkMode'
import Navbar from '../components/Navbar'
import Content from '../components/Content'
import MenuAccordian from '../components/MenuAccordian'
import { useNavigate, useParams } from 'react-router-dom'

export default function MainPage() {

    const navigate = useNavigate();
    const [allset, setAllset] = useState(null);
    const storedAllContent = JSON.parse(localStorage.getItem("allContent"));
    const [allContent, setAllContent] = useState(storedAllContent ? storedAllContent : []);
    useEffect(() => {
        localStorage.setItem("allContent", JSON.stringify(allContent));
    }, [allContent])
    window.allContent = allContent;

    const urlParams = useParams();
    // useEffect(() => {
    //     if (urlParams.Blogid !== undefined) {
    //         if (urlParams.Blogid in allContent) {
    //             if (urlParams.Menuid !== undefined) {
    //                 if (urlParams.Menuid in allContent[urlParams.Blogid].blogMenus) {
    //                     if (urlParams.Headingid !== undefined) {
    //                         if (urlParams.Headingid in allContent[urlParams.Blogid].blogMenus[urlParams.Menuid].content) {
    //                             setAllset(null)
    //                         } else {
    //                             setAllset("No such heading found");
    //                         }
    //                     } else {
    //                         setAllset(null);
    //                     }
    //                 } else {
    //                     setAllset("menuid is incorrect please type correctly");
    //                 }
    //             } else {
    //                 setAllset(null);
    //             }
    //         } else {
    //             setAllset("Blogid id incorrect please type correct url");
    //         }
    //     }
    //     else {
    //         setAllset(null);
    //     }
    // }, [urlParams.Blogid, urlParams.Menuid])


    return (
        allset === null ? (
            <div className='flex flex-col'>
                <Navbar blogData={allContent} setBlogData={setAllContent} />
                <div>
                    <Content blogData={allContent} setBlogData={setAllContent} />
                </div>
            </div>
        ) : (
            <h1>{allset}</h1>
        )
    )
}
