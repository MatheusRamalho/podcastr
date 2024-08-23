import { TableHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {}

export function TableBody({ className, ...props }: TableBodyProps) {
    return (
        <tbody
            className={twMerge('[&_tr:last-child]:border-0', className)}
            {...props}
        />
    )
}
