localStorage.removeItem('formulas_v1');
localStorage.removeItem('propriedades_v1');

class formula{
    constructor(name,value){
        this.name = name;
        this.value = value;
    }
}

class instancia_calculadora{

    formulas_cadastradas = [];
    propriedades = [];

    setBasePadraoDeTestes(){
        const props = {
            n1 : 10,
            n2 : 2,
            n3 : 3,
            n4 : 2
        }

        localStorage.setItem('propriedades_v1', JSON.stringify(props));
    }

    getPropriedades(){
        this.propriedades = JSON.parse(localStorage.getItem('propriedades_v1'));
        if(!this.propriedades){
            this.propriedades = [];
        }
        return this.propriedades;
    }

    getFormulasCadastradas(){
        this.formulas_cadastradas = JSON.parse(localStorage.getItem('formulas_v1'));
        return this.formulas_cadastradas;
    }

    getValores(){
        this.propriedades = JSON.parse(localStorage.getItem('propriedades_v1'));
        return this.propriedades;    
    }

    cadastrarFormula(formula){
        let formulas = this.getFormulasCadastradas();

        if(!formulas){
            formulas = [];
        }
        const objFormula = {
            name: formula.name,
            value: formula.value
        }

        formulas.push(objFormula);

        localStorage.setItem('formulas_v1', JSON.stringify(formulas));
        return this.getFormulasCadastradas();
    }

    calcular(formula = null){
        const props = this.propriedades;
        Object.keys(props).forEach((element) => {
            const index = formula.indexOf('$'+element);
            if(index > -1){
                formula = formula.replace('$'+element, props[element])
            }
        });
        return math.evaluate(formula);
    }

}

const calculadora = new instancia_calculadora();
calculadora.setBasePadraoDeTestes();
calculadora.getPropriedades();
calculadora.getFormulasCadastradas();

const newFormula = new formula('soma normal','($n1 + $n2) * $n3 / $n4');

const lista_formulas = calculadora.cadastrarFormula(newFormula);
const formula_selecionada = lista_formulas[0];

const resultado = calculadora.calcular(formula_selecionada.value);
console.log(resultado);