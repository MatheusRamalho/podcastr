export function convertDurationToTimeString(duration: number) {
    // Math.floor - arredonda para baixo.
    // Para transformar segundos em horas é preciso dividir por 60 para transformar em minutos e dois por 60 de novo para transformar em segundos.
    const hours = Math.floor(duration / 3600); // Duration é dividido por 3600.
    const minutes = Math.floor((duration % 3600) / 60); // Resto da divisão de duration por 3600 é dividido por 60.
    const seconds = duration % 60; // Resto da divisão de duration por 60.

    // Percorre o array com map e pra cada uma das unidades, converte pra string e se o retorno for de apenas 1 caracteres, o padStart adiciona o zero.
    const timeString = [ hours, minutes, seconds ]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')

    return timeString;
}
