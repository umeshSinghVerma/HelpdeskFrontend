import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import Divider from './Divider';
import { timebasedindex } from './TimeBasedIndex';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const CssTextField = styled(TextField)({

    '& label.Mui-focused': {
        color: 'red',
    },
    '& .MuiInput-underline:after': {
        borderBottomWidth: '0',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
            borderWidth: '0',
        },
        '&:hover fieldset': {
            borderColor: 'red',
            borderWidth: '0',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'red',
            borderWidth: '0',
        },
    },
    '& .MuiInputBase-root': {
        margin: '-1px 13px', // Set margin to 0
        padding: '0',
        
    },
    '& .MuiInputBase-input': {
        fontSize: '16px',
        color: '#4b5563',
        lineHeight: '1.5rem',
    },
});


const DarkTextField = styled(TextField)({

    '& label.Mui-focused': {
        color: 'red',
    },
    '& .MuiInput-underline:after': {
        borderBottomWidth: '0',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
            borderWidth: '0',
        },
        '&:hover fieldset': {
            borderColor: 'red',
            borderWidth: '0',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'red',
            borderWidth: '0',
        },
    },
    '& .MuiInputBase-root': {
        margin: '-1px 13px', // Set margin to 0
        padding: '0',
        
    },
    '& .MuiInputBase-input': {
        fontSize: '16px',
        color: 'rgb(209 213 219)',
        lineHeight: '1.5rem',
    },
});



export default function Content({ blogData, setBlogData }) {
    const urlParams = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [contentData, setContentData] = useState({});

    useEffect(()=>{
        if(urlParams.Blogid!==undefined && urlParams.Menuid!==undefined){

            setContentData(blogData[urlParams.Blogid].blogMenus[urlParams.Menuid].content ? blogData[urlParams.Blogid].blogMenus[urlParams.Menuid].content : {} )
        }
    },[urlParams.Menuid,urlParams.Blogid])

    // window.data = blogData[urlParams.Blogid].blogMenus[urlParams.Menuid].content;
    window.contentData = contentData;
    const [editContent, setEditContent] = useState(null);

    window.content = contentData;
    window.editContent = editContent;
    console.log("edit Content", editContent);
    console.log(urlParams.Blogid);
    // console.log("ye paya kaas",blogData[urlParams.Blogid].blogMenus[urlParams.Menuid])
    useEffect(()=>{
        setBlogData(prevdata=>{
            if(urlParams.Blogid!==undefined && urlParams.Menuid!==undefined && contentData!=={}){
                return(
                    {...prevdata, [urlParams.Blogid]:{...prevdata[urlParams.Blogid],blogMenus:{...prevdata[urlParams.Blogid].blogMenus,[urlParams.Menuid]:{...prevdata[urlParams.Blogid].blogMenus[urlParams.Menuid],content:contentData}}}}
                )
            }
            return prevdata
        })
    },[contentData])

    useEffect(() => {
        if (searchParams.get("add") !== null) {
            const index = timebasedindex();
            console.log("I am in");
            setContentData(prevdata => {
                return (
                    { ...prevdata, [index]: {...prevdata[index], [searchParams.get("add")]: "", index: index } }
                )
            })
            setEditContent(index)
        }
    }, [searchParams.get("add")])

    // useEffect(() => {
    //     if (urlParams.Blogid !== undefined && urlParams.Menuid !== undefined) {
    //         setContentData(blogData?.[urlParams.Blogid]?.[urlParams.Menuid]?.content ? blogData?.[urlParams.Blogid]?.[urlParams.Menuid]?.content : {});
    //     }
    // }, [urlParams.Menuid])

    return (
        <div className='w-full'>
            {
                Object.values(contentData).map((obj, key) => {
                    if (Object.keys(obj)[0] === "Heading") {
                        console.log(obj);
                        return (
                            editContent === obj.index ? (
                                <input
                                    className='grow text-4xl my-4 font-bold leading-tight text-slate-800 outline-none transition duration-300 ease-linear dark:text-gray-300 bg-transparent dark:bg-transparent'
                                    autoFocus
                                    type='text'
                                    defaultValue={obj[Object.keys(obj)[0]]}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            if (e.target.value !== "") {
                                                setContentData((prevobj) => {
                                                    return (
                                                        { ...prevobj, [editContent]: { [Object.keys(obj)[0]]: e.target.value, index: obj.index } }
                                                    )
                                                })
                                            }
                                            setSearchParams(prevParams => {
                                                prevParams.delete("add");
                                            })
                                            // searchParams.delete("add");
                                            setEditContent(null);
                                        }
                                    }} onBlur={(e) => {
                                        if (e.target.value !== "") {
                                            setContentData((prevobj) => {
                                                return (
                                                    { ...prevobj, [editContent]: { [Object.keys(obj)[0]]: e.target.value, index: obj.index } }
                                                )
                                            })
                                        }
                                        setSearchParams(prevParams => {
                                            prevParams.delete("add");
                                        })
                                        setEditContent(null);
                                    }} />)
                                :
                                (
                                    <div className='flex gap-2 items-start'>
                                        <h1 className=" text-4xl font-bold my-4 leading-tight dark:text-gray-300 text-slate-800">
                                            {obj[Object.keys(obj)[0]]}
                                        </h1>
                                        <button className='flex flex-none items-center ml-2' onClick={() => {
                                            const newBlog = { ...contentData };
                                            delete (newBlog[obj.index]);
                                            setContentData(newBlog);
                                        }}>
                                            <span className="mr-2 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300 dark:fill-gray-100 fill-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 456 511.82"><path d="M48.42 140.13h361.99c17.36 0 29.82 9.78 28.08 28.17l-30.73 317.1c-1.23 13.36-8.99 26.42-25.3 26.42H76.34c-13.63-.73-23.74-9.75-25.09-24.14L20.79 168.99c-1.74-18.38 9.75-28.86 27.63-28.86zM24.49 38.15h136.47V28.1c0-15.94 10.2-28.1 27.02-28.1h81.28c17.3 0 27.65 11.77 27.65 28.01v10.14h138.66c.57 0 1.11.07 1.68.13 10.23.93 18.15 9.02 18.69 19.22.03.79.06 1.39.06 2.17v42.76c0 5.99-4.73 10.89-10.62 11.19-.54 0-1.09.03-1.63.03H11.22c-5.92 0-10.77-4.6-11.19-10.38 0-.72-.03-1.47-.03-2.23v-39.5c0-10.93 4.21-20.71 16.82-23.02 2.53-.45 5.09-.37 7.67-.37zm83.78 208.38c-.51-10.17 8.21-18.83 19.53-19.31 11.31-.49 20.94 7.4 21.45 17.57l8.7 160.62c.51 10.18-8.22 18.84-19.53 19.32-11.32.48-20.94-7.4-21.46-17.57l-8.69-160.63zm201.7-1.74c.51-10.17 10.14-18.06 21.45-17.57 11.32.48 20.04 9.14 19.53 19.31l-8.66 160.63c-.52 10.17-10.14 18.05-21.46 17.57-11.31-.48-20.04-9.14-19.53-19.32l8.67-160.62zm-102.94.87c0-10.23 9.23-18.53 20.58-18.53 11.34 0 20.58 8.3 20.58 18.53v160.63c0 10.23-9.24 18.53-20.58 18.53-11.35 0-20.58-8.3-20.58-18.53V245.66z" /></svg>
                                            </span>

                                        </button>
                                        <button className='flex flex-none items-center' onClick={() => {
                                            setEditContent(prevdata => {
                                                return (obj.index)
                                            });
                                        }}>
                                            {editContent === obj.index ? "" :
                                                <span className="mr-1 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300 dark:fill-gray-100 fill-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 122.88 122.88" ><path class="st0" d="M79.7,31.87c-0.7-0.65-1.5-1-2.4-0.95c-0.9,0-1.7,0.35-2.35,1.05l-5.29,5.49L84.49,51.8l5.34-5.59 c0.65-0.65,0.9-1.5,0.9-2.4c0-0.9-0.35-1.75-1-2.35L79.7,31.87L79.7,31.87L79.7,31.87z M12.51,0h97.85c3.44,0,6.57,1.41,8.84,3.67 c2.27,2.27,3.67,5.4,3.67,8.84v97.85c0,3.44-1.41,6.57-3.67,8.84c-2.27,2.27-5.4,3.67-8.84,3.67H12.51c-3.44,0-6.57-1.41-8.84-3.67 c-2.27-2.27-3.67-5.4-3.67-8.84V12.51c0-3.44,1.41-6.57,3.67-8.84C5.94,1.41,9.07,0,12.51,0L12.51,0z M110.37,5.39H12.51 c-1.96,0-3.74,0.8-5.03,2.1c-1.29,1.29-2.1,3.08-2.1,5.03v97.85c0,1.96,0.8,3.74,2.1,5.03c1.29,1.29,3.08,2.1,5.03,2.1h97.85 c1.96,0,3.74-0.8,5.03-2.1c1.29-1.29,2.1-3.08,2.1-5.03V12.51c0-1.96-0.8-3.74-2.1-5.03C114.1,6.19,112.32,5.39,110.37,5.39 L110.37,5.39z M51.93,85.61c-1.95,0.65-3.95,1.25-5.89,1.9c-1.95,0.65-3.9,1.3-5.89,1.95c-4.64,1.5-7.19,2.35-7.74,2.5 c-0.55,0.15-0.2-2,0.95-6.49l3.7-14.13l0.3-0.32L51.93,85.61L51.93,85.61L51.93,85.61L51.93,85.61z M42.74,65.41l22.9-23.78 l14.83,14.28L57.33,79.99L42.74,65.41L42.74,65.41z" /></svg>
                                                </span>}

                                        </button>
                                    </div>
                                )
                        )
                    }
                    else if (Object.keys(obj)[0] === "Paragraph") {
                        console.log(obj);
                        return (
                            editContent === obj.index ? (
                                <>
                                    {document.documentElement.classList.contains("dark") ? <Box
                                        component="form"
                                        noValidate
                                        sx={{
                                            '& .MuiTextField-root': { ml: -1.5, width: '100%' },
                                        }}
                                    >
                                        <DarkTextField
                                            label=""
                                            id="custom-css-outlined-input"
                                            multiline
                                            fullWidth
                                            autoFocus
                                            spellCheck="false"
                                            defaultValue={obj[Object.keys(obj)[0]]}
                                            onKeyDown={e => {
                                                if (e.ctrlKey && e.key === 'Enter') {
                                                    if (e.target.value !== "") {
                                                        setContentData((prevobj) => {
                                                            return (
                                                                { ...prevobj, [editContent]: { [Object.keys(obj)[0]]: e.target.value, index: obj.index } }
                                                            )
                                                        })
                                                    }
                                                    setSearchParams(prevParams => {
                                                        prevParams.delete("add");
                                                    })
                                                    // searchParams.delete("add");
                                                    setEditContent(null);
                                                }
                                            }}
                                            onBlur={(e) => {
                                                if (e.target.value !== "") {
                                                    setContentData((prevobj) => {
                                                        return (
                                                            { ...prevobj, [editContent]: { [Object.keys(obj)[0]]: e.target.value, index: obj.index } }
                                                        )
                                                    })
                                                }
                                                setSearchParams(prevParams => {
                                                    prevParams.delete("add");
                                                })
                                                setEditContent(null);
                                            }}
                                        />
                                    </Box>
                                        :
                                        <Box
                                            component="form"
                                            noValidate
                                            sx={{
                                            '& .MuiTextField-root': { ml: -1.5, width: '100%' },
                                        }}
                                        >
                                            <CssTextField
                                            label=""
                                            id="custom-css-outlined-input"
                                            multiline
                                            fullWidth
                                            autoFocus
                                            spellCheck="false"
                                            defaultValue={obj[Object.keys(obj)[0]]}
                                            onKeyDown={e => {
                                                if (e.ctrlKey && e.key === 'Enter') {
                                                    if (e.target.value !== "") {
                                                        setContentData((prevobj) => {
                                                            return (
                                                                { ...prevobj, [editContent]: { [Object.keys(obj)[0]]: e.target.value, index: obj.index } }
                                                            )
                                                        })
                                                    }
                                                    setSearchParams(prevParams => {
                                                        prevParams.delete("add");
                                                    })
                                                    // searchParams.delete("add");
                                                    setEditContent(null);
                                                }
                                            }}
                                            onBlur={(e) => {
                                                if (e.target.value !== "") {
                                                    setContentData((prevobj) => {
                                                        return (
                                                            { ...prevobj, [editContent]: { [Object.keys(obj)[0]]: e.target.value, index: obj.index } }
                                                        )
                                                    })
                                                }
                                                setSearchParams(prevParams => {
                                                    prevParams.delete("add");
                                                })
                                                setEditContent(null);
                                            }}
                                        />
                                        </Box>}
                                </>
                            )
                                :
                                (
                                    <div className='flex items-center gap-2'>
                                        <div 
                                        style={{fontSize:"16px" ,lineHeight:"24px", letterSpacing:"0.15008px", marginTop:"-1px",marginLeft:"1px"}}
                                        className="font-sans leading-tight dark:text-gray-300 text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: obj[Object.keys(obj)[0]].replace(/\n/g, '<br/>') }}
                                        >
                                        </div>
                                        <button className='flex flex-none items-center ml-2 mb-auto' onClick={() => {
                                            const newBlog = { ...contentData };
                                            delete (newBlog[obj.index]);
                                            setContentData(newBlog);
                                        }}>
                                            <span className="mr-2 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300 dark:fill-gray-100 fill-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 456 511.82"><path d="M48.42 140.13h361.99c17.36 0 29.82 9.78 28.08 28.17l-30.73 317.1c-1.23 13.36-8.99 26.42-25.3 26.42H76.34c-13.63-.73-23.74-9.75-25.09-24.14L20.79 168.99c-1.74-18.38 9.75-28.86 27.63-28.86zM24.49 38.15h136.47V28.1c0-15.94 10.2-28.1 27.02-28.1h81.28c17.3 0 27.65 11.77 27.65 28.01v10.14h138.66c.57 0 1.11.07 1.68.13 10.23.93 18.15 9.02 18.69 19.22.03.79.06 1.39.06 2.17v42.76c0 5.99-4.73 10.89-10.62 11.19-.54 0-1.09.03-1.63.03H11.22c-5.92 0-10.77-4.6-11.19-10.38 0-.72-.03-1.47-.03-2.23v-39.5c0-10.93 4.21-20.71 16.82-23.02 2.53-.45 5.09-.37 7.67-.37zm83.78 208.38c-.51-10.17 8.21-18.83 19.53-19.31 11.31-.49 20.94 7.4 21.45 17.57l8.7 160.62c.51 10.18-8.22 18.84-19.53 19.32-11.32.48-20.94-7.4-21.46-17.57l-8.69-160.63zm201.7-1.74c.51-10.17 10.14-18.06 21.45-17.57 11.32.48 20.04 9.14 19.53 19.31l-8.66 160.63c-.52 10.17-10.14 18.05-21.46 17.57-11.31-.48-20.04-9.14-19.53-19.32l8.67-160.62zm-102.94.87c0-10.23 9.23-18.53 20.58-18.53 11.34 0 20.58 8.3 20.58 18.53v160.63c0 10.23-9.24 18.53-20.58 18.53-11.35 0-20.58-8.3-20.58-18.53V245.66z" /></svg>
                                            </span>

                                        </button>
                                        <button className='flex flex-none items-center mb-auto' onClick={() => {
                                            setEditContent(prevdata => {
                                                return (obj.index)
                                            });
                                        }}>
                                            {editContent === obj.index ? "" :
                                                <span className="mr-1 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300 dark:fill-gray-100 fill-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 122.88 122.88" ><path class="st0" d="M79.7,31.87c-0.7-0.65-1.5-1-2.4-0.95c-0.9,0-1.7,0.35-2.35,1.05l-5.29,5.49L84.49,51.8l5.34-5.59 c0.65-0.65,0.9-1.5,0.9-2.4c0-0.9-0.35-1.75-1-2.35L79.7,31.87L79.7,31.87L79.7,31.87z M12.51,0h97.85c3.44,0,6.57,1.41,8.84,3.67 c2.27,2.27,3.67,5.4,3.67,8.84v97.85c0,3.44-1.41,6.57-3.67,8.84c-2.27,2.27-5.4,3.67-8.84,3.67H12.51c-3.44,0-6.57-1.41-8.84-3.67 c-2.27-2.27-3.67-5.4-3.67-8.84V12.51c0-3.44,1.41-6.57,3.67-8.84C5.94,1.41,9.07,0,12.51,0L12.51,0z M110.37,5.39H12.51 c-1.96,0-3.74,0.8-5.03,2.1c-1.29,1.29-2.1,3.08-2.1,5.03v97.85c0,1.96,0.8,3.74,2.1,5.03c1.29,1.29,3.08,2.1,5.03,2.1h97.85 c1.96,0,3.74-0.8,5.03-2.1c1.29-1.29,2.1-3.08,2.1-5.03V12.51c0-1.96-0.8-3.74-2.1-5.03C114.1,6.19,112.32,5.39,110.37,5.39 L110.37,5.39z M51.93,85.61c-1.95,0.65-3.95,1.25-5.89,1.9c-1.95,0.65-3.9,1.3-5.89,1.95c-4.64,1.5-7.19,2.35-7.74,2.5 c-0.55,0.15-0.2-2,0.95-6.49l3.7-14.13l0.3-0.32L51.93,85.61L51.93,85.61L51.93,85.61L51.93,85.61z M42.74,65.41l22.9-23.78 l14.83,14.28L57.33,79.99L42.74,65.41L42.74,65.41z" /></svg>
                                                </span>}

                                        </button>
                                    </div>
                                )
                        )
                    }
                    return null
                })

            }
            <Divider />
        </div>
    )
}
