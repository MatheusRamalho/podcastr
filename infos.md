## Conceitos do React

### Componente
É uma função que retorna html.
É um elemento para ser reutilizado, como por exemplo, criar um component Button, evitando criar o mesmo código html varias vezes, pode-se apenas chamar o componente Button criado.

```
export default function Button(props) {
    return (
        <> //
            <span></span>
            <button> {props.children} </button>
        </>
    )
}
```

### Propriedade

É uma informação que é passada de um componente para outro.
Elemento html possui atributo / No React chama-se de propriedade.

No React *não pode criar vários elementos repetidos se não possuírem algo em volta*, como uma div por exemplo. Para contornar esse "problema" e não criar uma div apenas para isso, é utilizado a tag em branco chamada de *Fragment (Fragmento)* 

O component possui parâmetros padrão *props*. Através dele é possível acessar atributos (propriedades). 
Como por exemplo o title="botão 01". 
``` <button> {props.title} </button> ```

Ou pegando informação de dentro do elemento, considerado um filho.
Como por exemplo o Botão 02 escrito dentro da tag button.
``` <button> {props.cildren} </button> ```

```
function App() {
	return (
        <>
            <Button title="Botão 01"/>
            <Button title="Botão 02" />
        </>

		<>
           <Button> Botão 01 </Button>
           <Button> Botão 02 </Button>
        </>
	);
}
```

### Estado

É uma informação armazenada no componente. Como por exemplo a variável e a função descritas antes do return.
O react por padrão não fica monitorando as variáveis para saber se elas receberam novos valores e alterar no browser, para isso é necessário utilizar do "estado" por isso precisa do import useState.

```
import { useState } from 'react';

export default function Button(props) {
    // useState - devolve um array onde a primeira informação é o estado e a segunda é uma função que vai alterar o valor do estado. O nome da função "setCounter" pode ter o nome que desejar, mas é legal manter um padrão.
    const [counter, setCounter] = useState(1);

    function increments() {
       setCounter(counter + 1);
    }

    return (
        <>
            <span> {counter} </span>
            <button onClick={increments}> {props.children} </button>
        </>
    )
}
```


Arquivos tsx => typescript + jsx (html/xml no javascript)