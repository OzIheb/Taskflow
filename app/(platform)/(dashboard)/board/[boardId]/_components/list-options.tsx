"use client"

import { List } from "@prisma/client"

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, X } from "lucide-react"
import { FormSubmit } from "@/components/form/form-submit"
import { Separator } from "@/components/ui/separator"
import { useAction } from "@/hooks/use-action"
import { deleteList } from "@/actions/delete-list"
import { toast } from "sonner"
import { ElementRef, useRef } from "react"
import { copyList } from "@/actions/copy-list"



interface ListOptionsProps {
    data: List
    onAddCard: () => void
}

export const ListOptions = ({
    data,
    onAddCard,
}: ListOptionsProps) => {

    const closeRef = useRef<ElementRef<"button">>(null)


    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: () => {
            toast.success(`List ${data.title} deleted`)
            closeRef.current?.click()
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })
    
    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: () => {
            toast.success(`List ${data.title} successfully copied`)
            closeRef.current?.click()
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeDelete({ id, boardId })
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeCopy({ id, boardId })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                   <MoreHorizontal className="h-4 w-4"/> 
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600">
                    List Actions
                </div>
                <PopoverClose
                    ref={closeRef}
                    asChild
                >
                    <Button className="absolute text-neutral-600 top-1 right-2" variant="ghost">
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-small"
                    variant="ghost"
                >
                    Add Card...
                </Button>
                <form 
                    action={onCopy}
                >
                    <input 
                        hidden
                        name="id"
                        id="id"
                        value={data.id}
                    />
                    <input 
                        hidden
                        name="boardId"
                        id="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Copy list
                    </FormSubmit>
                </form>
                <Separator />
                <form 
                    action={onDelete}
                >
                    <input 
                        hidden
                        name="id"
                        id="id"
                        value={data.id}
                    />
                    <input 
                        hidden
                        name="boardId"
                        id="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Delete list
                    </FormSubmit>
                </form>
                

            </PopoverContent>
        </Popover>
    )
}