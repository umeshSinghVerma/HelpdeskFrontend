import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import RouterDOM from 'react-dom'
// Initialization for ES Users
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";
import useSignup from "../hooks/useSignup";
import Loader from './Loader'
export default function Signup() {
    useEffect(() => {
        initTE({ Modal, Ripple });
    }, []);
    // has number
    const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

    // has mix of small and capitals
    const hasSmall = (number) => new RegExp(/[a-z]/).test(number);
    const hasCapital = (number) => new RegExp(/[A-Z]/).test(number);

    // has special chars
    const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

    const [length, setLength] = useState(0);

    useEffect(() => {
        const passwordInput = document.getElementById("password");
        const updateLength = () => {
            setLength(passwordInput.value.length);
        };

        passwordInput.addEventListener("input", updateLength);

        return () => {
            passwordInput.removeEventListener("input", updateLength);
        };
    }, []);

    // set color based on password strength
    const strengthColor = (count) => {
        if (count < 2) return { label: 'Poor', color: 'Red' };
        if (count < 3) return { label: 'Weak', color: 'yellow' };
        if (count < 4) return { label: 'Normal', color: 'dark-yellow' };
        if (count < 5) return { label: 'Good', color: 'Green' };
        if (count < 6) return { label: 'Strong', color: 'DarkGreen' };
        return { label: 'Poor', color: 'Red' };
    };
    function passwordStrength() {
        let password = document.getElementById("password").value;
        if (length > 0) {
            let colorDiv = document.getElementById("passwordStrengthColor");
            let Strength = document.getElementById("passwordStrengthValue");
            let count = strengthIndicator(password);
            let obj = strengthColor(count);
            colorDiv.style.backgroundColor = obj.color;
            Strength.innerHTML = `${obj.label}`;
        }
    }

    // password strength indicator
    const strengthIndicator = (number) => {
        let strengths = 0;
        if (number.length > 7) strengths += 1;
        if (hasNumber(number)) strengths += 1;
        if (hasSpecial(number)) strengths += 1;
        if (hasCapital(number)) strengths += 1;
        if (hasSmall(number)) strengths += 1;
        if (number.length < 8) strengths = 1;

        return strengths;
    };

    function ConfirmPassword() {
        if (document.getElementById('password').value !== (document.getElementById('confirm_password').value) || document.getElementById('password').value === "") {
            document.getElementById('confirm_password').classList.add('focus:border-red-600')
            document.getElementById('confirm_password').classList.remove('focus:border-green-600')
        } else {
            document.getElementById('confirm_password').classList.add('focus:border-green-600')
            document.getElementById('confirm_password').classList.remove('focus:border-red-600')
        }
    }
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {signup,isLoading,error} = useSignup();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await signup(email,password);
    }

    return RouterDOM.createPortal(
        <div
            data-te-modal-init=""
            className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="signup"
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
                            id="signupCloseButton"
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
                                        Sign up to your account
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Your email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                onChange={(e)=>{
                                                    setEmail(e.target.value);
                                                }}
                                                value={email}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="name@company.com"
                                                required=""
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="text"
                                                name="password"
                                                id="password"
                                                onChange={(e)=>{
                                                    setPassword(e.target.value);
                                                }}
                                                // value={password}
                                                placeholder="••••••••"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required=""
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            Sign up
                                        </button>
                                        {!isLoading && <Loader/>}
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
        ,
        document.getElementById('portal')


    )
}
