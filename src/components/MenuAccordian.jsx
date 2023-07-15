import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import {
    Collapse,
    initTE,
} from "tw-elements";
export default function MenuAccordian() {
    useEffect(() => {
        initTE({ Collapse });
    }, [])
    const [searchParams,setSearchParams]=useSearchParams();
    const props = {
        pet: [
            {
                "Menus": [
                    ["Heading",
                        <svg class="h-5 w-5 dark:text-white text-slate-900 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <polyline points="4 7 4 4 20 4 20 7" />  <line x1="9" y1="20" x2="15" y2="20" />  <line x1="12" y1="4" x2="12" y2="20" /></svg>
                    ],
                    ["Paragraph",
                        <svg class="h-5 w-5 dark:text-white text-slate-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="18" cy="16" r="3" />  <line x1="21" y1="13" x2="21" y2="19" />  <path d="M3 19l5 -13l5 13" />  <line x1="5" y1="14" x2="11" y2="14" /></svg>
                    ]
                ]
            },
        ]
    }
    return (
        <div>
            <div id="accordionExample5" className='scale-75 md:scale-100 rounded-lg overflow-hidden w-14 -z-10'>
                {
                    props.pet.map((obj) => {
                        return (
                            <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                                <h2 className="mb-0" id={`headingThreealpha`}>
                                    <button
                                        className="rounded-t-lg group relative flex justify-center items-center w-full items-center border-0 bg-white pr-1 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-slate-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-slate-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                                        type="button"
                                        data-te-collapse-init=""
                                        data-te-collapse-collapsed=""
                                        data-te-target={`#collapseThreealpha`}
                                        aria-expanded="false"
                                        aria-controls={`collapseThreealpha`}
                                    >
                                        {/* {Object.keys(obj)[0]} */}
                                        <span className="rounded-t-lg h-5 w-5 shrink-0 rotate-[-90deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </h2>
                                <div
                                    id={`collapseThreealpha`}
                                    className="!visible hidden"
                                    data-te-collapse-item=""
                                    aria-labelledby={`headingThreealpha`}
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        {obj[Object.keys(obj)[0]].map(h => {
                                            return (
                                                <button
                                                    type="button"
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light"
                                                    class="w-full h-10 flex justify-center items-center"
                                                    title={h[0]}
                                                    onClick={()=>{
                                                        setSearchParams({add:h[0]})
                                                    }}
                                                >
                                                    {h[1]}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
