export function PlayerEmpty() {
    return (
        <div className="size-16 lg:w-full lg:h-80 lg:p-16 border border-primary-300 rounded-md lg:rounded-3xl bg-gradient-primary text-center flex items-center justify-center">
            <strong className="hidden lg:block text-xs lg:text-base text-zinc-100">
                Selecione um podcast para ouvir
            </strong>
        </div>
    )
}
