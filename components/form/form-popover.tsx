"use client"

import { toast } from "sonner"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose,
} from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import CreateBoard  from "@/actions/create-board"

import { FormPicker } from "./form-picker"
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { ElementRef, useRef } from "react"
import { useRouter } from "next/navigation"


interface FormPopoverProps {
    children : React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side= "bottom",
    align,
    sideOffset = 0
} : FormPopoverProps) => {

    const router = useRouter()
    const closeRef = useRef<ElementRef<"button">>(null)

    const {execute, fieldErrors } = useAction(CreateBoard, {
        onSuccess: (data) => {
            toast.success('Board created!')
            closeRef.current?.click()
            router.push(`/board/${data.id}`)
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const image = formData.get('image') as string
        
        execute({ title, image });
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-xs font-medium text-center text-neutral-600 pb-4">
                    Create board.
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button 
                        className="h-auto w-auto p-2 absolute top-2 right-2"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form className="space-y-4" action={onSubmit}>
                    <div className="space-y-4">
                        <FormPicker 
                            id="image"
                            errors={fieldErrors}
                        />
                        <FormInput 
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}
