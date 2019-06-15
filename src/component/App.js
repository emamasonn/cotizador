import React, { Component } from 'react';
import Header from './Header'
import Formulario from './Formulario'
import Resumen from './Resumen'
import Resultado from './Resultado'
import { obtenerDiferenciaAnio, calcularMarca, obtenerPlan } from '../Helper'

class App extends Component {

  constructor(props){
    super();
    this.state = {
      resultado: '',
      datos: {}
    }
  }

  cotizarSeguro = (datos) => {
    
    const {marca, plan, year} = datos;
    //agregar una base de 2000
    let resultado = 2000;

    //obtener la diferencia de años y por cada año restarle 3% al valor del seguro
    const diferencia = obtenerDiferenciaAnio(year);
    resultado -= ((diferencia * 3) * resultado )/ 100;
    //Americano 15% asiatico 5% y europeo 30% de incremento del valor actual
    resultado = calcularMarca(marca) * resultado;
    //el plan del auto, el basico incrementa el valor 20% i el cobertura completa 50%
    let incrementoPlan = obtenerPlan(plan);
    //dependiendo del plan incrementar 
    resultado = parseFloat( incrementoPlan * resultado).toFixed(2);
    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    }
    this.setState({
      resultado: resultado,
      datos: datosAuto
    });
  }

  render(){
    return (
      <div className="contenedor">
        <Header titulo = "Cotizador de Seguro de auto"/>
        <div className = "contenedor-formulario">
          <Formulario 
            cotizarSeguro = { this.cotizarSeguro }
          />
          <Resumen 
            datos = { this.state.datos }
                      
          />
          <Resultado 
            resultado = { this.state.resultado }
          />
        </div>
      </div>
    );
  }
}

export default App;
