'use server';

import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { CreateBoard } from './schema';
import { InputType, ReturnType } from './types';
import { createSafeAction } from '@/lib/create-safe-action';

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized Access"
        }
    }

    const { title, image } = data;

    let board;
    
    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHtml,
        imageUserName,
    ] = image.split("|")


    // console.log({
    //             imageId,
    //             imageThumbUrl,
    //             imageFullUrl,
    //             imageLinkHtml,
    //             imageUserName,
    // })

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHtml || !imageUserName) {
        return {
            error: "Missing field. Failed to create board."
        };
    }


    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHtml,
                imageUserName,

            }
        })
    } catch(e) {
        return {
            error: "Failed to create board."
        }
    }

    revalidatePath(`/board/${board.id}`);
    return { data: board }

}

export default createSafeAction(CreateBoard, handler);