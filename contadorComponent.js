const BTN_REINICIAR = 'btnReiniciar';
const ID_CONTADOR = 'contador';
const VALOR_CONTADOR = 10;
const INTERVALO = 1000;

class ContadorComponent {

    constructor() {

        this.inicializar();
    }

    prepararContadorProxy() {

        const handler = {
            set: (currentContext, propertyKey, newValue) => {
                console.log({ currentContext, propertyKey, newValue });

                //interceptando o objeto para parar o fluxo dele
                //para parar tudo
                if (!currentContext.valor) {

                    currentContext.efeturarParada();
                }

                //basicamente esta interceptando o que o js faz por de baixo dos panos
                currentContext[propertyKey] = newValue;
                return true;
            }
        };

        //Proxy Object - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Proxy
        //O objeto proxy vai observar uma instância, e cada vez q ele for alterado ele vai executar uma função.
        //ou seja, o proxy é um eventlistner..

        const contador = new Proxy({
            valor: VALOR_CONTADOR,

            //função customizada
            efeturarParada: () => {

            }
        }, handler);

        return contador;
    }

    //mais sobre closures
    //ou nossa função que vai ser delegada
    //na primeira vez que for chamada vai executar normalmente, no exemplo abaixo so vai guardar os params..
    //so que no resultado dessa primerira chamada é outra função => () => {}

    atualizarTexto = ({ elementoContador, contador }) => () => {

        const identificadorTexto = '$$contador';
        const textPadrao = `Começando em <strong>${identificadorTexto}</strong> segundos...`;

        elementoContador.innerHTML = textPadrao.replace(identificadorTexto, contador.valor--);
    }

    //tb pode ser escrito como no exemplo a baixo, na primeira guarda os valores, e a partir da segunda vez vai chamar a funçao q esta no retorno
    //

    agendarParadaContador({ elementoContador, idIntervalo }) {

        console.log('agendarParadaContador');
        console.log(`idIntervalo ${idIntervalo}`);

        return () => {

            clearInterval(idIntervalo);

            elementoContador.innerHTML = '';
            this.desabilitarBotao();
        }
    }

    inicializar() {

        console.log('inicializou!!');
        const elementoContador = document.getElementById(ID_CONTADOR);

        const contador = this.prepararContadorProxy();
        // contador.valor = 80;
        // contador.valor = 90;
        // contador.valor = 100;

        const argumentos = {
            elementoContador,
            contador
        };

        const fn = this.atualizarTexto(argumentos);
        const idIntervalo = setInterval(fn, INTERVALO);

        {
            const argumentos = { elementoContador, idIntervalo };
            const desabilitarBotao = () => console.log('desabilitou ....');
            
            //apply subistitui o contexto, no exemplo vai subistituir o this. la de dentro do agendarParadaContador pelo primeiro argumento
            const pararContadorFn = this.agendarParadaContador(argumentos).apply({ desabilitarBotao }, [argumentos]);
            contador.efeturarParada = pararContadorFn;
        }
    }

}