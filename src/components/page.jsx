function Page({children}) {
    return (
        <>
            <div className="p-4 flex min-h-screen min-w-screen items-center justify-center">
                <div className="max-w-[50rem] bg-black flex flex-col items-center justify-center p-8 rounded-xl gap-4 border-2 border-solid border-white">
                    <a href="/">
                        <img className="w-128" src="omnivimtitle.png"></img>
                    </a>
                    <h1>Global vim motions. Any app, any OS.</h1>
                    <hr className="bg-white w-full"/>
                    {children}
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <a href="/" className="text-[0.8rem] text-underline text-[#aaa] hover:text-[#ccc] transition-all cursor-pointer">Home</a>
                        <p className="text-[0.8rem] pointer-events-none">|</p>
                        <a href="/download" className="text-[0.8rem] text-underline text-[#aaa] hover:text-[#ccc] transition-all cursor-pointer">V0</a>
                        <p className="text-[0.8rem] pointer-events-none">|</p>
                        <a href="/about" className="text-[0.8rem] text-underline text-[#aaa] hover:text-[#ccc] transition-all cursor-pointer">About</a>
                        <p className="text-[0.8rem] pointer-events-none">|</p>
                        <a href="https://github.com/Omnivim/omnivim" target='_blank' className="text-[0.8rem] text-underline text-[#aaa] hover:text-[#ccc] transition-all cursor-pointer">Github</a>
                    </div>
                </div>
            </div>
            <div className="bgimg"></div>
        </>
    )
}

export default Page