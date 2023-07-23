import { useContext, useEffect, useRef, useState } from "react";
import DarkMode from "./DarkMode";
import Sidebar from "./Sidebar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DarkModeContext from "../Contexts/DarkmodeContext";
import Loader from "./Loader"
import axios from "axios";
import BASE_URL from "../BASE_URL";
import Signup from "./Signup";
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";
import Login from "./Login";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";
import useEditMode from "../hooks/useEditMode";
import Profile from "./Profile";
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
    const { user } = useAuthContext();
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading,setLoading]=useState(false);


    useEffect(() => {
        initTE({ Modal, Ripple });
    }, []);
    
    useEffect(()=>{
        setSelectedImage(null);
    },[user])

    useEffect(() => {
        const getProfilePhoto = async () => {
            try {
                setLoading(true);
                console.log('i came here', user.userId);
                const res = await axios.post(`${BASE_URL}/user/getProfilePicture_User`, {
                    userId: user.userId
                })
                if(res.status===200){
                    console.log("profile data", res);
                    const data = res.data;
                    setSelectedImage(data);
                    console.log("profile url", data);
                }else{
                    setSelectedImage(null);
                }
            }
            catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                }
            }
            setLoading(false);
        }
        getProfilePhoto();

    }, [selectedImage, user])




    let navigation = [
        { title: "Profile", path: "profile" },
        // { title: "Settings", path: "javascript:void(0)" },
    ];
    if (!user) {
        navigation = [
            { title: "Login", path: "login" },
            { title: "Signup", path: "signup" },
            ...navigation
        ]
    }

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

    const { logout } = useLogout();


    return (
        <div className="relative border-t lg:border-none antialiased text-slate-500 dark:text-slate-400 dark:bg-slate-900">
            <div className="">
                <button
                    ref={profileRef}
                    className="hidden w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 lg:focus:ring-2 lg:block"
                    onClick={() => setState(!state)}
                >
                    {loading ? <Loader/> :<img
                        src={selectedImage === null ? "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" : `${selectedImage}`}
                        alt=""
                        className="w-full h-full rounded-full"
                    />}
                </button>
            </div>
            <ul
                className={`bg-white top-14 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0  dark:bg-slate-800 dark:border-gray-700 ${state ? "" : "lg:hidden dark:bg-slate-900"
                    }`}
            >
                <Signup />
                <Login />
                <Profile newImage={selectedImage} setNewImage={setSelectedImage} setLoading={setLoading} />
                {navigation.map((item, idx) => (
                    <li key={idx}>
                        <button
                            className={`block w-full text-justify text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 lg:p-3 ${state ? "" : "dark:hover:bg-slate-900 hover:bg-white"
                                }`}
                            data-te-toggle="modal"
                            data-te-target={`#${item.path}`}
                            data-te-ripple-init=""
                            data-te-ripple-color="light"
                        >
                            {item.title}
                        </button>
                    </li>
                ))}
                {user && <button
                    className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 lg:p-3  dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                        logout();
                    }}
                >
                    Logout
                </button>}
            </ul>
        </div>


    );
};

export default function Navbar() {
    const [state, setState] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { editMode, setEditMode } = useEditMode();
    // console.log("blog came in navbar", blogData)

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "Pro version", path: "javascript:void(0)" },
        { title: "Upgrade", path: "javascript:void(0)" },
        { title: "Support", path: "javascript:void(0)" },
    ];
    const [submenuNav, setSubmenuNav] = useState(null); // [Blogheading,menus,CurrentMenu]
    const [blogOwner, setBlogOwner] = useState(null);
    const [loading, setLoading] = useState(false);
    let urlParams = useParams();


    // When the blog is clicked in the sidebar -->
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BASE_URL}/helpdesk/${urlParams.Blogid}/getBlog`);
                const data = await res.data;
                console.log("otherBlogData", data);
                const BlogOwnerId = data[3];
                setBlogOwner(BlogOwnerId);
                if (res.status === 201) {
                    setSubmenuNav(prevMenu => {
                        return (
                            [data[0], [], {}]
                        )
                    })
                } else if (res.status === 200) {
                    const blogHeading = data[0];
                    const menus = data[1];
                    const firstMenuItem = data[2];

                    setSubmenuNav(prevMenu => {
                        return (
                            [blogHeading, menus, firstMenuItem]
                        )
                    })
                } else {
                    navigate('/error');
                }
            }
            catch (error) {
                console.log(error.message);
                navigate('/error?reason=Blog Not Found');
            }
            setLoading(false);
        }
        if (urlParams.Blogid) {
            fetchData();
        } else {
            console.log("Blog id is not there in the url params")
        }
    }, [urlParams.Blogid, user])

    // Create Menu function 
    const CreateMenu = async (menu) => {
        if (!user) {
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/helpdesk/${urlParams.Blogid}/addMenu`, menu, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            const data = await response.data;
            if (data) {
                setSubmenuNav(prevarr => {
                    const newarr = [...prevarr];
                    return (
                        [newarr[0], data, newarr[2]]
                    )
                })
            } else {
                console.log(response);
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    const DeleteMenu = async (menu) => {
        if (!user) {
            return;
        }
        try {
            const response = await axios.delete(`${BASE_URL}/helpdesk/${urlParams.Blogid}/${menu.blogMenuId}/deleteMenu`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            const data = await response.data;
            if (data) {
                setSubmenuNav(prevarr => {
                    const newarr = [...prevarr];
                    return (
                        [newarr[0], data, newarr[2]]
                    )
                })
            } else {
                console.log(response);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }


    const [editBlogMenuNames, setEditBlogMenuNames] = useState(null);

    const darkMode = useContext(DarkModeContext);
    useEffect(() => {
        if (urlParams.Menuid !== undefined) {
            if (document.getElementById(urlParams.Menuid)) {
                let allMenus = document.querySelectorAll(".menus");
                allMenus.forEach(menu => {
                    menu.style.backgroundColor = "";
                    menu.style.color = "";
                })
                if (darkMode.darkMode) {
                    document.getElementById(urlParams.Menuid).style.cssText = " background-color:rgb(30 41 59);"
                } else {
                    document.getElementById(urlParams.Menuid).style.cssText = "background-color:#e5e7eb;";
                }
            }
        }

    }, [urlParams.Menuid, document.getElementById(urlParams.Menuid), darkMode])
    window.submenuNav = submenuNav;
    window.CurrentUser = user && user.userId;
    window.blogOwner=blogOwner;


    return (
        <header
            className=" bg-white dark:bg-slate-900 z-[100] sticky top-0"
            id="HEADER"
        >
            <div
                className={`antialiased text-slate-500 dark:text-slate-400 dark:bg-slate-900 bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${state ? "h-max fixed inset-x-0 z-50 " : ""
                    }`}
            >
                <div className="flex items-center justify-between py-3 lg:py-5 lg:block">

                    <h1 class="text-4xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            {loading ? <Loader /> : submenuNav !== null && submenuNav[0]}
                        </span>
                    </h1>

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

                <div
                    className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${state ? "" : "hidden"
                        }`}
                >

                    <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
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
                        {user && user.userid!==null && user.userId === blogOwner && <input
                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault01"
                            onChange={(e) => {
                                setEditMode(e.target.checked);
                            }}
                        />}
                        <DarkMode />
                        <AvatarMenu />
                    </ul>
                </div>
            </div>
            <nav className="border-b">
                <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
                    <Sidebar />
                    <button
                        data-te-sidenav-toggle-ref=""
                        data-te-target="#sidenav-8"
                        aria-controls="#sidenav-8"
                        aria-haspopup="true"
                    >
                        <span className="block pb-1 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-slate-900 dark:[&>svg]:text-slate-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </button>
                    {editMode && <button className="active:scale-90 pb-1" onClick={() => {
                        setShowCreateMenu(prev => {
                            return (!prev)
                        })
                    }}>
                        <svg class="h-5 w-5 dark:text-gray-400 text-slate-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>}
                    {showCreateMenu && editMode && <input className='w-20 pb-1 text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 
                    dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent' autoFocus type='text' onKeyDown={(e) => {
                            let value = e.target.value;
                            if (e.key === "Enter") {
                                if (value !== "") {
                                    let index = timebasedindex();
                                    const menu = {
                                        blogMenuId: index,
                                        title: value
                                    }
                                    CreateMenu(menu);
                                    setSubmenuNav(prevMenu => {
                                        const newBlog = [...prevMenu];
                                        const newMenus = [menu, ...newBlog[1]];
                                        return (
                                            [newBlog[0], newMenus, newBlog[2]]
                                        )
                                    })
                                    setShowCreateMenu(false);
                                }
                            }
                        }} />}

                    {submenuNav !== null && submenuNav[1] !== [] && submenuNav[1].map((item, idx) => {
                        let index = item.blogMenuId;
                        return (
                            <li
                                key={idx}
                                id={index}
                                className="flex py-1 px-3 menus rounded-t-lg"
                            >
                                {editBlogMenuNames === index ?
                                    <input
                                        className='ml-1 grow w-20 text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 
                                        dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent'
                                        autoFocus
                                        type='text'
                                        defaultValue={submenuNav[1][idx].title}
                                        onKeyDown={e => {
                                            if (e.key === "Enter") {
                                                if (e.target.value !== "") {
                                                    let menu = {
                                                        blogMenuId: index,
                                                        title: e.target.value
                                                    }
                                                    CreateMenu(menu);
                                                    setSubmenuNav(prevMenu => {
                                                        const newBlog = [...prevMenu];
                                                        const newMenus = newBlog[1].map(obj => {
                                                            if (obj.blogMenuId == index) {
                                                                return (
                                                                    { ...obj, title: e.target.value }
                                                                )
                                                            } else {
                                                                return ({ ...obj })
                                                            }
                                                        })
                                                        return (
                                                            [newBlog[0], newMenus, newBlog[2]]
                                                        )
                                                    })
                                                }
                                                setEditBlogMenuNames(null);
                                            }
                                        }} onBlur={(e) => {
                                            if (e.target.value !== "") {
                                                let menu = {
                                                    blogMenuId: index,
                                                    title: e.target.value
                                                }
                                                CreateMenu(menu);
                                                setSubmenuNav(prevMenu => {
                                                    const newBlog = [...prevMenu];
                                                    const newMenus = newBlog[1].map(obj => {
                                                        if (obj.blogMenuId == index) {
                                                            return (
                                                                { ...obj, title: e.target.value }
                                                            )
                                                        } else {
                                                            return ({ ...obj })
                                                        }
                                                    })
                                                    return (
                                                        [newBlog[0], newMenus, newBlog[2]]
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
                                {editMode && (<>
                                    <button id={`${index}navbarMenuContainer-deleteBtn`} className='flex flex-none items-center ml-2' onClick={() => {
                                        const newBlog = [...submenuNav];
                                        const menu = {
                                            blogMenuId: index
                                        }
                                        DeleteMenu(menu);
                                        const menus = newBlog[1];
                                        const newMenus = menus.filter(obj => obj.blogMenuId != index)
                                        console.log([newBlog[0], newMenus, newBlog[2]]);
                                        setSubmenuNav([newBlog[0], newMenus, newBlog[2]]);
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
                                </>)}
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    );
}
