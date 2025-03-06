function Frame({children}) {
    return (
        <>
            <div className="flex h-fit w-fit border-24 border-solid border-x-[#41B0E6dd] border-y-[#8ACA4Cdd] items-center justify-center">
                {children}
            </div>
        </>
    )
}

export default Frame