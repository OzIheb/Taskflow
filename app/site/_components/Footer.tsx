import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full px-4 border-t  bg-slate-100 ">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between p-2">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size='sm' asChild variant="ghost">
                        <Link href="/">
                            Privacy Policy
                        </Link>
                    </Button>
                    <Button size='sm' variant="ghost">
                        <Link href="/" >
                            Terms of Service
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Footer