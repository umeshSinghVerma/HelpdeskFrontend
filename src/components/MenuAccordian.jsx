import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import {
    Collapse,
    initTE,
} from "tw-elements";
export default function MenuAccordian() {
    const [searchParams, setSearchParams] = useSearchParams();
    const menus = [
        ["heading",
            <svg class="h-5 w-5 dark:text-white text-slate-900 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <polyline points="4 7 4 4 20 4 20 7" />  <line x1="9" y1="20" x2="15" y2="20" />  <line x1="12" y1="4" x2="12" y2="20" /></svg>
        ],
        ["paragraph",
            <svg class="h-5 w-5 dark:text-white text-slate-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="18" cy="16" r="3" />  <line x1="21" y1="13" x2="21" y2="19" />  <path d="M3 19l5 -13l5 13" />  <line x1="5" y1="14" x2="11" y2="14" /></svg>
        ]
    ]


    return (
        <div>
            <div className="hs-accordion-group">
                <div
                    className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700"
                    id="hs-bordered-heading-two"
                >
                    <button
                        className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center gap-x-3 font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
                        aria-controls="hs-basic-bordered-collapse-two"
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
                    </button>
                    <div
                        id="hs-basic-bordered-collapse-two"
                        className="hs-accordion-content hidden overflow-hidden transition-[height] duration-300"
                        aria-labelledby="hs-bordered-heading-two"
                    >
                        <div className="pb-4">
                            {menus.map(h => {
                                return (
                                    <button
                                        type="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        class="w-full h-10 flex justify-center items-center"
                                        title={h[0]}
                                        onClick={() => {
                                            setSearchParams({ add: h[0] })
                                        }}
                                    >
                                        {h[1]}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
