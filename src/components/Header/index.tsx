import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });

    return (
        <header className={ styles.header__wrapper }>
            <img className={ styles.header__logo } src="/logo.svg" alt="Podcastr"/>
            <p className={ styles.header__info }> O melhor para você ouvir, sempre </p>
            <span className={ styles.header__date }> { currentDate } </span> 
        </header>
    );
}