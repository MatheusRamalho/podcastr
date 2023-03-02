### Formas de consumir API (SPA / SSR / SSG).

<br /><br />

#### SPA - Single Page Aplication. (Em projeto React)
<br />

```
import { useEffect } from "react"

export default function Home() {
    // Função do React que dispara algo sempre que a aplicação sofrer alteração.
    // O primeiro parâmetro é o que quer executar e o segundo parâmetro é quando, que é um array.
    // Para executar um component assim que estiver em tela uma única vez, é só passar o array vazio.

    useEffect(() => {
        fetch('http://localhost:3333/episodes') // Busca os dados nesse endereço.
            .then(response => response.json()) // Convertendo a resposta em json.
            .then(data => console.log(data)) // Para ver os dados sendo exibidos.
    }, [])

    // Problema dessa forma, é a indexação dos mecanismos de busca.
    // Se precisa que já estejam disponíveis assim que acessar a página, não é o método indicado.

    return (
        <h1> Index </h1>
    )
}
```

<br /><br />

#### SSR - Server Siding Render. (Só em projeto Next)
#### SSG - Static Side Generation. (Só em projeto Next) - SÓ FUNCIONA EM PRODUÇÃO

<br />

Para usar SSR no Next precisa apenas em qualquer arquivo da pasta pages e exporte uma função chamada <br />
```getServerSideProps()```

<br />

Para usar SSR no Next precisa apenas em qualquer arquivo da pasta pages e exporte uma função chamada <br />
```getStaticProps()```

<br /><br />

A DIFERENÇA entre os dois tipos fica apenas no nome da função. <br />
``` getServerSideProps() ``` - Executa todas as vezes que alguém acessa a home da aplicação. <br />
``` getStaticProps() ``` - Executa de x tempos em x tempo de acordo passado no revalidate no return da função. <br /><br />

```
export default function Home(props) {
    return (
        <div>
            <h1> Index </h1>
            <p> { JSON.stringify(props.episodes) } </p>
        </div>
    )
}
```

<br /><br />

#### async - transforma a função em uma função assíncrona.
<br />

```
    export async function getServerSideProps() { // SSR
    export async function getStaticProps() { // SSG
        const response = await fetch('http://localhost:3333/episodes') // Busca os dados nesse endereço.
        const data = await response.json();

        // retorna um objeto de props.
        // sempre precisa retornar props.
        return {
            props: {
                episodes: data,
            },

            // Esse é só no SSG, ele recebe um número em segundos que é responsável por de quanto em quanto tempo eu quero gerar uma nova versão da página.
            revalidate: 60 * 60 * 8, // A cada 8 horas é feita uma chamada nova, quem acessar durante esse meio tempo, vai acessar uma página estática.
        }
		}
```
