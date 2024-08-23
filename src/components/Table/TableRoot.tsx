import { TableHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableRootProps extends TableHTMLAttributes<HTMLTableElement> {}

export function TableRoot({ className, ...props }: TableRootProps) {
    return (
        <div className="relative w-full overflow-auto rounded-md border border-neutral-300 dark:border-neutral-700">
            <table
                className={twMerge(
                    'w-full caption-bottom text-sm text-neutral-700 dark:text-neutral-300',
                    className,
                )}
                {...props}
            />
        </div>
    )
}
