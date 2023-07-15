import { useEffect, useRef, useState } from "react";
import DarkMode from "./DarkMode";
import Sidebar from "./Sidebar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
function timebasedindex() {
    let date = new Date();
    let millisec = date.getMilliseconds();
    if (millisec < 10) {
        millisec = '00' + String(millisec);
    }
    if (millisec < 100) {
        millisec = '0' + String(millisec);
    }
    let sec = date.getSeconds();
    if (sec < 10) {
        sec = '0' + String(sec);
    }
    let min = date.getMinutes();
    if (min < 10) {
        min = '0' + String(min);
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = '0' + String(hour);
    }
    let dateoftheday = date.getUTCDate();
    let monthoftheday = date.getUTCMonth();
    let yearoftheday = date.getUTCFullYear();
    return (+(String(yearoftheday) + monthoftheday + dateoftheday + hour + min + sec + millisec));
}

// Avatar with dropdown menu
const AvatarMenu = () => {
    const [state, setState] = useState(false);
    const profileRef = useRef();

    const navigation = [
        { title: "Dashboard", path: "javascript:void(0)" },
        { title: "Analytics", path: "javascript:void(0)" },
        { title: "Profile", path: "javascript:void(0)" },
        { title: "Settings", path: "javascript:void(0)" },
    ];

    useEffect(() => {
        const handleDropDown = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setState(false);
            }
        };
        document.addEventListener("click", handleDropDown);

        return () => {
            document.removeEventListener("click", handleDropDown);
        };
    }, []);


    return (
        <div className="relative border-t lg:border-none antialiased text-slate-500 dark:text-slate-400 dark:bg-slate-900">
            <div className="">
                <button
                    ref={profileRef}
                    className="hidden w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 lg:focus:ring-2 lg:block"
                    onClick={() => setState(!state)}
                >
                    <img
                        src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                        className="w-full h-full rounded-full"
                    />
                </button>
            </div>
            <ul
                className={`bg-white top-14 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0  dark:bg-slate-800 dark:border-gray-700 ${state ? "" : "lg:hidden dark:bg-slate-900"
                    }`}
            >
                {navigation.map((item, idx) => (
                    <li key={idx}>
                        <a
                            className={`block text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 lg:p-3 ${state ? "" : "dark:hover:bg-slate-900 hover:bg-white"
                                }`}
                            href={item.path}
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
                <button className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 lg:p-3">
                    Logout
                </button>
            </ul>
        </div>


    );
};

export default function Navbar({ blogData, setBlogData }) {
    const [state, setState] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const navigate = useNavigate();
    console.log("blog came in navbar", blogData)

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "Pro version", path: "javascript:void(0)" },
        { title: "Upgrade", path: "javascript:void(0)" },
        { title: "Support", path: "javascript:void(0)" },
    ];
    const [submenuNav, setSubmenuNav] = useState({});
    let urlParams = useParams();
    useEffect(() => {
        if (blogData != null && urlParams.Blogid !== undefined) {
            setSubmenuNav(blogData[urlParams.Blogid].blogMenus ? blogData[urlParams.Blogid].blogMenus : {});
        }
    }, [urlParams.Blogid])
    console.log("urlParams", urlParams.Blogid);
    useEffect(() => {
        let index = urlParams.Blogid;
        if (index !== undefined) {
            setBlogData(prevBlogData => {
                return ({ ...prevBlogData, [index]: { ...prevBlogData[index], blogMenus: submenuNav } })
            })
        }
    }, [submenuNav])

    const [editBlogMenuNames, setEditBlogMenuNames] = useState(null);

    return (
        <header>
            <div
                className={`antialiased text-slate-500 dark:text-slate-400 dark:bg-slate-900 bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${state ? "h-full fixed inset-x-0 z-50" : ""
                    }`}
            >
                <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
                    <h1 class="mb-1 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{blogData !== [] && urlParams.Blogid && blogData[urlParams.Blogid].blogHeading}</span></h1>
                    <div className="lg:hidden">
                        <button
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
                            onClick={() => setState(!state)}
                        >
                            {state ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div
                    className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${state ? "" : "hidden"
                        }`}
                >
                    <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex-1 items-center justify-start pb-4 lg:flex lg:pb-0"
                        >
                            <div className="flex items-center gap-1 px-2 border rounded-lg dark:border-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-400 dark:text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none dark:text-gray-200"
                                />
                            </div>
                        </form>
                        {navigation.map((item, idx) => (
                            <li key={idx}>
                                <a
                                    href={item.path}
                                    className="block text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                        <DarkMode />
                        <AvatarMenu />
                    </ul>
                </div>
            </div>
            <nav className="border-b">
                <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
                    <Sidebar Blog={blogData} setBlog={setBlogData} />
                    <button className="active:scale-90 pb-1" onClick={() => {
                        setShowCreateMenu(prev => {
                            return (!prev)
                        })
                    }}>
                        <svg class="h-5 w-5 dark:text-gray-400 text-slate-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>
                    {showCreateMenu && <input className='w-20 pb-1 text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 
                    dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent' autoFocus type='text' onKeyDown={(e) => {
                            let value = e.target.value;
                            if (e.key === "Enter") {
                                if (value !== "") {
                                    let index = timebasedindex();
                                    setSubmenuNav(prevarr => {
                                        return ({ [index]: { ...prevarr[index], blogMenuId: index, title: value, path: "javascript:void(0)" }, ...prevarr })
                                    })
                                    setShowCreateMenu(false);
                                }
                            }
                        }} />}
                    {Object.values(submenuNav).map((item, idx) => {
                        let index = item.blogMenuId;
                        return (
                            <li
                                key={idx}
                                className={`flex py-1 ${idx === 0 ? "border-b-2 border-indigo-600" : ""}`}
                            >
                                {editBlogMenuNames === index ?
                                    <input className='ml-1 grow w-20 text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 
                                    dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent' autoFocus type='text' defaultValue={submenuNav[index].title} onKeyDown={e => {
                                            if (e.key === "Enter") {
                                                if (e.target.value !== "") {
                                                    setSubmenuNav((prevobj) => {
                                                        return (
                                                            { ...prevobj, [index]: { ...prevobj[index], title: e.target.value } }
                                                        )
                                                    })
                                                }
                                                setEditBlogMenuNames(null);
                                            }
                                        }} onBlur={(e) => {
                                            if (e.target.value !== "") {
                                                // console.log(index)
                                                console.log(submenuNav[index]);
                                                setSubmenuNav((prevobj) => {
                                                    return (
                                                        { ...prevobj, [index]: { ...prevobj[index], title: e.target.value } }
                                                    )
                                                })
                                            }
                                            setEditBlogMenuNames(null);
                                        }} />
                                    :
                                    <button className='grow ml-1 flex justify-start' id={`${item.blogMenuId}sidebarBlogContainer-blogBtn`} onClick={() => {
                                        navigate(`/${urlParams.Blogid}/${index}`);
                                    }}>
                                        {item.title.length > 12 ? item.title.substring(0, 11) + "..." : item.title}
                                    </button>}
                                <button id={`${index}navbarMenuContainer-deleteBtn`} className='flex flex-none items-center ml-2' onClick={() => {
                                    const newBlog = { ...submenuNav };
                                    delete (newBlog[index]);
                                    setSubmenuNav(newBlog);
                                }}>
                                    <span className="mr-2 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300 dark:fill-gray-100 fill-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 456 511.82"><path d="M48.42 140.13h361.99c17.36 0 29.82 9.78 28.08 28.17l-30.73 317.1c-1.23 13.36-8.99 26.42-25.3 26.42H76.34c-13.63-.73-23.74-9.75-25.09-24.14L20.79 168.99c-1.74-18.38 9.75-28.86 27.63-28.86zM24.49 38.15h136.47V28.1c0-15.94 10.2-28.1 27.02-28.1h81.28c17.3 0 27.65 11.77 27.65 28.01v10.14h138.66c.57 0 1.11.07 1.68.13 10.23.93 18.15 9.02 18.69 19.22.03.79.06 1.39.06 2.17v42.76c0 5.99-4.73 10.89-10.62 11.19-.54 0-1.09.03-1.63.03H11.22c-5.92 0-10.77-4.6-11.19-10.38 0-.72-.03-1.47-.03-2.23v-39.5c0-10.93 4.21-20.71 16.82-23.02 2.53-.45 5.09-.37 7.67-.37zm83.78 208.38c-.51-10.17 8.21-18.83 19.53-19.31 11.31-.49 20.94 7.4 21.45 17.57l8.7 160.62c.51 10.18-8.22 18.84-19.53 19.32-11.32.48-20.94-7.4-21.46-17.57l-8.69-160.63zm201.7-1.74c.51-10.17 10.14-18.06 21.45-17.57 11.32.48 20.04 9.14 19.53 19.31l-8.66 160.63c-.52 10.17-10.14 18.05-21.46 17.57-11.31-.48-20.04-9.14-19.53-19.32l8.67-160.62zm-102.94.87c0-10.23 9.23-18.53 20.58-18.53 11.34 0 20.58 8.3 20.58 18.53v160.63c0 10.23-9.24 18.53-20.58 18.53-11.35 0-20.58-8.3-20.58-18.53V245.66z" /></svg>
                                    </span>

                                </button>
                                <button className='flex flex-none items-center' onClick={() => {
                                    setEditBlogMenuNames(index);
                                }}>
                                    {editBlogMenuNames === index ? "" :
                                        <span className="mr-1 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300 dark:fill-gray-100 fill-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 122.88 122.88" ><path class="st0" d="M79.7,31.87c-0.7-0.65-1.5-1-2.4-0.95c-0.9,0-1.7,0.35-2.35,1.05l-5.29,5.49L84.49,51.8l5.34-5.59 c0.65-0.65,0.9-1.5,0.9-2.4c0-0.9-0.35-1.75-1-2.35L79.7,31.87L79.7,31.87L79.7,31.87z M12.51,0h97.85c3.44,0,6.57,1.41,8.84,3.67 c2.27,2.27,3.67,5.4,3.67,8.84v97.85c0,3.44-1.41,6.57-3.67,8.84c-2.27,2.27-5.4,3.67-8.84,3.67H12.51c-3.44,0-6.57-1.41-8.84-3.67 c-2.27-2.27-3.67-5.4-3.67-8.84V12.51c0-3.44,1.41-6.57,3.67-8.84C5.94,1.41,9.07,0,12.51,0L12.51,0z M110.37,5.39H12.51 c-1.96,0-3.74,0.8-5.03,2.1c-1.29,1.29-2.1,3.08-2.1,5.03v97.85c0,1.96,0.8,3.74,2.1,5.03c1.29,1.29,3.08,2.1,5.03,2.1h97.85 c1.96,0,3.74-0.8,5.03-2.1c1.29-1.29,2.1-3.08,2.1-5.03V12.51c0-1.96-0.8-3.74-2.1-5.03C114.1,6.19,112.32,5.39,110.37,5.39 L110.37,5.39z M51.93,85.61c-1.95,0.65-3.95,1.25-5.89,1.9c-1.95,0.65-3.9,1.3-5.89,1.95c-4.64,1.5-7.19,2.35-7.74,2.5 c-0.55,0.15-0.2-2,0.95-6.49l3.7-14.13l0.3-0.32L51.93,85.61L51.93,85.61L51.93,85.61L51.93,85.61z M42.74,65.41l22.9-23.78 l14.83,14.28L57.33,79.99L42.74,65.41L42.74,65.41z" /></svg>
                                        </span>}

                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    );
}