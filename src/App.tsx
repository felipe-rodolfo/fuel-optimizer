import { FormEvent, useState } from 'react'
import './App.css'

import logoImg from './assets/logo.png';

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {

  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  function calculate(event: FormEvent){
    event.preventDefault();
    let calc = (gasolinaInput / alcoolInput)

    if(calc <= 0.7){
      setInfo({
        title: "Compensa usar álcool",
        gasolina: currencyFormat(gasolinaInput),
        alcool: currencyFormat(alcoolInput)
      })
    } else {
      setInfo({
        title: "Compensa usar gasolina",
        gasolina: currencyFormat(gasolinaInput),
        alcool: currencyFormat(alcoolInput)
      })
    }
  }

  function currencyFormat(value: number){
    const formattedValue = value.toLocaleString("pt-br", {
      style: "currency", 
      currency: "BRL"
    });
    return formattedValue;
  }

  return (
   <div>
    <main className='container'>
      <img src={logoImg} alt="Logo da calculadora de gasolina ou alcool" />
      <h1 className='title'>Qual melhor opção?</h1>

      <form onSubmit={calculate} className="form" action="">
        <label htmlFor="">Álcool (preço por litro)</label>
        <input 
          className='input'
          type="number"
          placeholder='4,90'
          min='1'
          step='0.01'
          required
          value={alcoolInput}
          onChange={(e) => setAlcoolInput(Number(e.target.value))}
          />

<label htmlFor="">Gasolina (preço por litro)</label>
        <input 
          className='input'
          type="number"
          placeholder='4,90'
          min='1'
          step='0.01'
          required
          value={gasolinaInput}
          onChange={(e) => setGasolinaInput(Number(e.target.value))}
          />

          <input className='button' type='submit' value='Calcular' />
      </form>

      {info && Object.keys(info).length > 0 && (
        <section className='result'>
          <h2 className='resultTitle'>{info.title}</h2>
          <span>Álcool {info.alcool}</span>
          <span>Gasolina {info.gasolina}</span>
        </section>
      )}

    </main>
   </div>
  )
}

export default App
