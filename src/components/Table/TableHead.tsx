import { TableHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableHeadProps extends TableHTMLAttributes<HTMLTableCellElement> {}

export function TableHead({ className, ...props }: TableHeadProps) {
    return (
        <th
            className={twMerge(
                'h-12 px-4 text-left align-middle font-medium text-neutral-600 dark:text-neutral-400 text-sm [&:has([role=checkbox])]:pr-0',
                className,
            )}
            {...props}
        />
    )
}
