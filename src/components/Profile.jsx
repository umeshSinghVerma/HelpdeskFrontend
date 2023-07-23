import React, { useCallback, useEffect, useState } from "react"
import RouterDOM from 'react-dom'
// Initialization for ES Users
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";
import useLogin from "../hooks/useLogin";
import Loader from "./Loader";
import { useDropzone } from "react-dropzone";
import BASE_URL from "../BASE_URL";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

export default function Profile({ newImage, setNewImage, setLoading }) {
    useEffect(() => {
        initTE({ Modal, Ripple });
    }, []);
    const { user } = useAuthContext();



    const handleImageSubmit = async (selectedImage) => {
        const formData = new FormData();
        formData.append('profile', selectedImage);
        setImageChoosed(selectedImage);
        
        try {
            setLoading(true);
            // console.log("profile token",user.token);
            const response = await axios.post(`${BASE_URL}/helpdesk/ProfilePicture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`
                },
            });

            // Handle the response from the backend here, if needed
            console.log("I mage uploaded successfully", response.data);
            setNewImage(selectedImage)
        } catch (error) {
            // Handle any errors that occurred during the upload
            console.error('Error uploading image:', error);
        }
        setLoading(false);
        setImageChoosed(null);
    }


    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    const [imageChoosed, setImageChoosed] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(name, password);
    }
    const onDrop = useCallback(acceptedFiles => {
        handleImageSubmit(acceptedFiles[0]);
    }, [])

    window.imageChoosed = imageChoosed;

    console.log("Image choosed", imageChoosed);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return RouterDOM.createPortal(
        <>
            <div
                data-te-modal-init=""
                className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="profile"
                tabIndex={-1}
                aria-labelledby="exampleModalCenterTitle"
                aria-modal="true"
                role="dialog"
            >
                <div
                    data-te-modal-dialog-ref=""
                    className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
                >
                    <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                        {/*Modal body*/}
                        <section className="bg-gray-50 dark:bg-gray-900 rounded-md">
                            <button
                                type="button"
                                id="profileCloseButton"
                                className="absolute right-5 top-5 dark:text-white box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                data-te-modal-dismiss=""
                                aria-label="Close"
                            >
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div
                                className="flex flex-col items-center px-6 py-8 "
                            >
                                <a
                                    href="#"
                                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                                >
                                    <img
                                        className="w-8 h-8 mr-2"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                                        alt="logo"
                                    />
                                    Flowbite
                                </a>



                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Sign in to your account
                                        </h1>

                                        <div {...getRootProps()} className="flex items-center justify-center w-full">
                                            <label
                                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg
                                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        />
                                                    </svg>
                                                    {imageChoosed != null ?

                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            {imageChoosed.path}
                                                        </p>
                                                        :

                                                        <>
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                            </p>
                                                        </>}
                                                </div>
                                            </label>
                                            <input {...getInputProps()} id="dropzone-file" className="hidden" />
                                        </div>

                                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }}
                                                    value={name}
                                                    id="name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Umesh Singh Verma"
                                                    required=""
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="passwordProfile"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="passwordProfile"
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                    value={password}
                                                    placeholder="••••••••"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    required=""
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                disabled={isLoading}
                                            >
                                                Sign in
                                            </button>
                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                Don't have an account yet?{" "}
                                                <button
                                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                >
                                                    Sign up
                                                </button>
                                            </p>
                                            {isLoading && <Loader />}
                                            {error && <div className="text-slate-900 dark:text-white text-sm">{error}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/*Modal footer*/}
                    </div>
                </div>
            </div>
        </>
        ,
        document.getElementById('portal')


    )
}
