import { TdHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableCellProps extends TdHTMLAttributes<HTMLTableDataCellElement> {}

export function TableCell({ className, ...props }: TableCellProps) {
    return (
        <td
            className={twMerge(
                'p-4 align-middle [&:has([role=checkbox])]:pr-0',
                className,
            )}
            {...props}
        />
    )
}
