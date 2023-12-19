const ClerkLayout = ({ children }: {
    children: React.ReactNode

}) => {
    return (
        <div className="flex items-center justify-center h-full bg-slate-100">
            {children}
        </div>
    )
}

export default ClerkLayout