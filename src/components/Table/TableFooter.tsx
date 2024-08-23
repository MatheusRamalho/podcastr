import { TableHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableFooterProps
    extends TableHTMLAttributes<HTMLTableSectionElement> {}

export function TableFooter({ className, ...props }: TableFooterProps) {
    return (
        <tfoot
            className={twMerge(
                'border-t border-t-neutral-300 bg-neutral-100 dark:border-t-neutral-700 dark:bg-neutral-800/50 font-medium [&>tr]:last:border-b-0',
                className,
            )}
            {...props}
        />
    )
}
