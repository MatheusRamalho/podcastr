import { TableHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableHeaderProps
    extends TableHTMLAttributes<HTMLTableSectionElement> {}

export function TableHeader({ className, ...props }: TableHeaderProps) {
    return (
        <thead className={twMerge('[&_tr]:border-b', className)} {...props} />
    )
}
