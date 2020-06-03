import  React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowDownLeft } from 'react-icons/fi'

import './styles.css'
import logo from '../../assets/logo.svg'

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to="/">
          <FiArrowDownLeft />
          Voltar para home
        </Link>
      </header>

      <form >
        <h1>Cadatro do <br /> Ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da Entidade</label>
            <input 
              type="text"
              name="name"
              id="name"
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                name="email"
                id="email"
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
              />
            </div>
          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>selecione o endereço no mapa</span>
          </legend>

          <div className="field">
            <label htmlFor="uf">Estado (UF)</label>
            <select name="uf" id="uf">
              <option value="0">Selecione uma uf</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="city">Cidade</label>
            <select name="city" id="city">
              <option value="0">Selecione uma cidade</option>
            </select>
          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>Items de coleta</h2>
            <span>selecione um ou mais items abaixo</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg " alt="oleo"/>
              <span>oleo de cozinha</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta.
        </button>
      </form>
    </div>
  )
}

export default CreatePoint