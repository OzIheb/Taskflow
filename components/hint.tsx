import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface TooltipProps {
    children : React.ReactNode;
    description: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    sideOffset?: number;

}

export const Hint = ({ children, description, side = 'bottom', sideOffset = 0 }: TooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    sideOffset={sideOffset}
                    side={side}
                    className="text-xs max-w-[200px] break-words"
                >
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}