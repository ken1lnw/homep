import SignInClient from "@/components/Login/LoginComponent";

export default function page() {
    return (
        <div className="relative max-h-screen overflow-hidden">
            <div className="relative z-10 grid h-screen grid-cols-1  place-items-center ">
                <div className="container">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 px-6 sm:w-[500px] md:px-0">
                        <>
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-3xl font-semibold tracking-tight text-black">
                                    Sign In to APP TYC TH
                                </h1>
                                <p className="text-md text-content-subtle">
                                    Enter your email below to sign in
                                </p>
                            </div>
                            <div className="grid gap-6">
                                <SignInClient />
                            </div>
                        </>
                    </div>
                </div>
            </div>
            <div className="absolute left-1/2 top-4 z-0 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0">
                <svg
                    viewBox="0 0 1026 1026"
                    fill="none"
                    aria-hidden="true"
                    className="animate-spin-slow absolute inset-0 h-full w-full"
                >
                    <path
                        d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
                        stroke="#D4D4D4"
                        strokeOpacity="0.7"
                    ></path>
                    <path
                        d="M513 1025C230.23 1025 1 795.77 1 513"
                        stroke="url(#gradient-1)"
                        strokeLinecap="round"
                    ></path>
                    <defs>
                        <linearGradient
                            id="gradient-1"
                            x1="1"
                            y1="513"
                            x2="1"
                            y2="1025"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#06b6d4"></stop>
                            <stop offset="1" stopColor="#06b6d4" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <svg
                    viewBox="0 0 1026 1026"
                    fill="none"
                    aria-hidden="true"
                    className="animate-spin-reverse-slower absolute inset-0 h-full w-full"
                >
                    <path
                        d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
                        stroke="#D4D4D4"
                        strokeOpacity="0.7"
                    ></path>
                    <path
                        d="M913 513c0 220.914-179.086 400-400 400"
                        stroke="url(#gradient-2)"
                        strokeLinecap="round"
                    ></path>
                    <defs>
                        <linearGradient
                            id="gradient-2"
                            x1="913"
                            y1="513"
                            x2="913"
                            y2="913"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#06b6d4"></stop>
                            <stop offset="1" stopColor="#06b6d4" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}