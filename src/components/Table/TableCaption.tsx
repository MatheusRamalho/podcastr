import { TableHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableCaptionProps
    extends TableHTMLAttributes<HTMLTableCaptionElement> {}

export function TableCaption({ className, ...props }: TableCaptionProps) {
    return (
        <caption
            className={twMerge(
                'mt-4 text-sm text-neutral-300 dark:text-neutral-500',
                className,
            )}
            {...props}
        />
    )
}
