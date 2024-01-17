import { Suspense } from "react";
import { BoardList } from "./_components/board-list";
import { Info } from "./_components/info";
import { Separator } from "@/components/ui/separator";

const organizationIdPage = async () => {


    return (
        <div className="w-full mb-20">
            <Info />
            <Separator className="my-4" />
            <Suspense fallback={<BoardList.Skeleton />}>
                <BoardList />
            </Suspense>

        </div>
    );
}

export default organizationIdPage;