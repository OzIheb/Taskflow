"use client"

import { List } from "@prisma/client"
import { ListWithCards } from "@/types"
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { toast } from "sonner";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {

    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success("List reordered")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    useEffect(() => {
        setOrderedData(data)
    }, [data])

    function reorder<T>(list: T[], startIndex: number, endIndex: number) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const onDragEnd = (result : any) => {
        const {destination, source, type} = result;

        if (!destination) {
            return
        }

        // dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        // user moves a list

        if (type === "list") {
            const items = reorder(
                orderedData,
                source.index,
                destination.index
                
            ).map((item, index) => ({...item, order: index}))

            setOrderedData(items)

            // TODO: Trigger server action
            executeUpdateListOrder({items, boardId})

        }

        // user moves a card

        if (type === "card") {
            let newOrderedData = [...orderedData]

            // source and destination list
            const sourceList = newOrderedData.find(list => list.id === source.droppableId)
            const destList = newOrderedData.find(list => list.id === destination.droppableId)
            
            if (!sourceList || !destList) {
                return
            }

            // check if cards exist on the source list

            if (!sourceList.cards) {
                sourceList.cards= []
            }

            // check if cards exist on the destination list
            if (!destList.cards) {
                destList.cards = []
            }

            // Moving the card in the same list

            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                )
                reorderedCards.forEach((card, idx) => {
                    card.order = idx
                } )

                sourceList.cards = reorderedCards

                setOrderedData(newOrderedData)

                // Trigger server action

            // user moves the card to another list 
            } else {
                const [movedCard] = sourceList.cards.splice(source.index, 1)

                // assign the new listId to the moved card 
                movedCard.listId = destination.droppableId

                // add card to the destination list
                destList.cards.splice(destination.index, 0, movedCard)

                sourceList.cards.forEach((card, idx) => {
                    card.order = idx
                })

                // update card order for the destination list
                destList.cards.forEach((card, idx) => {
                    card.order = idx
                })

                setOrderedData(newOrderedData)

                //TODO: Trigger server action

            }
        }
    
    }


    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full "
                    >
                        {orderedData.map((list, index) => {
                            return (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    data={list}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex-shrink-0 w-1"/>
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    )
}