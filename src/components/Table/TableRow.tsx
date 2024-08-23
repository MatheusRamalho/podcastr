import { TableHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {}

export function TableRow({ className, ...props }: TableRowProps) {
    return (
        <tr
            className={twMerge(
                'border-b border-b-neutral-300 dark:border-b-neutral-700 transition-colors hover:bg-neutral-50 hover:dark:bg-neutral-800/50 data-[state=selected]:bg-neutral-800',
                className,
            )}
            {...props}
        />
    )
}
