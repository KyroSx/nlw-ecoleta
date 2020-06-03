import  React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowDownLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'

import './styles.css'
import logo from '../../assets/logo.svg'
import api from '../../services/api'

interface Item {
  id: number,
  title: string,
  image_url: string
}

const CreatePoint = () => {

  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, [])

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

          <Map center={[-24.8343557, -51.3050986]} zoom={13}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-24.8343557, -51.3050986]}/>
          </Map>

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
            {
              items.map((item) => (
                <li key={item.id}>
                  {console.log(item.image_url)}
                  <img src={item.image_url} alt={item.title}/>
                  <span>{item.title}</span>
                </li>
              ))
            }
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