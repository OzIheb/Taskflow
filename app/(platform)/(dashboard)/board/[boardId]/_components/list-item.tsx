"use client"

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { useRef, useState, ElementRef } from "react";
import { CardForm } from "./card-form";

interface ListItemProps {
    data: ListWithCards;
    index: number;
}

export const ListItem = ({
    data,
    index,
}: ListItemProps) => {

    const textareaRef = useRef<ElementRef<"textarea">>(null)

    const [isEditing, setIsEditing] = useState(false)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        }, 0)
    }

    const disableEditing = () => {
        setIsEditing(false)
    }


    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                <ListHeader 
                    data={data} 
                    onAddCard={enableEditing}
                />
                <CardForm 
                    ref={textareaRef}
                    isEditing={isEditing}
                    enableEditing={enableEditing}
                    disableEditing={disableEditing}
                    listId={data.id}
                />
            </div>
        </li>
    )
}