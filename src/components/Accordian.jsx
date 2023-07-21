import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    Collapse,
    initTE,
} from "tw-elements";
export default function Accordian({ Headings }) {
    const urlParams = useParams();
    const navigate = useNavigate();
    return (
        <div className="hs-accordion-group mt-10">
            {
                Headings && Headings.map((obj, key) => {
                    if (obj.type == 'heading') {
                        return (
                            <div
                                key={key}
                                className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700"
                                id="hs-bordered-heading-two"
                            >
                                <button
                                    className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center gap-x-3 w-64 font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
                                    aria-controls="hs-basic-bordered-collapse-two"
                                    onClick={()=>{
                                        if(urlParams.Blogid!==undefined && urlParams.Menuid!==undefined){
                                            navigate(`/${urlParams.Blogid}/${urlParams.Menuid}/${obj.index}`)
                                        }
                                    }}
                                >
                                    <svg
                                        className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.5 8.85999L14.5 8.85998"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M8 15.36L8 2.35999"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <svg
                                        className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.5 8.85999L14.5 8.85998"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    {obj.text}
                                </button>
                                <div
                                    id="hs-basic-bordered-collapse-two"
                                    className="hs-accordion-content hidden w-64 overflow-hidden transition-[height] duration-300"
                                    aria-labelledby="hs-bordered-heading-two"
                                >
                                    <div className="pb-4 px-5">
                                        <p className="text-gray-800 dark:text-gray-200">
                                            <em>This is the second item's accordion body.</em> It is hidden by
                                            default, until the collapse plugin adds the appropriate classes that
                                            we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return null
                    }
                })
            }
        </div>

    )
}
