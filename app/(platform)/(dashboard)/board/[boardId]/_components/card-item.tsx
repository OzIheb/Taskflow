"use client"

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemsProps {
    data: Card;
    index: number;
}

export const CardItem = ({
    data,
    index,
}: CardItemsProps) => {

    const cardModal = useCardModal()

    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} 
                    role="button"
                    onClick={() => cardModal.onOpen(data.id)}
                    className="mt-2 truncate border-2 border-transparent hover:border-black px-3 py-2 text-sm bg-white rounded-md shadow-sm"
                >
                    {data.title}
                </div>
            )}
        </Draggable>
    )
}