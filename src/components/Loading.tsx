export function Loading() {
    return (
        <div className="size-full flex items-center justify-center gap-4 flex-col">
            <div className="size-14 rounded-full bg-gradient-primary animate-spin shadow" />

            <span className="text-zinc-600 dark:text-zinc-600">
                Carregando...
            </span>
        </div>
    )
}
