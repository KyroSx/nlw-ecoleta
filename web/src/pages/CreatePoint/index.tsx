import  React, { useEffect, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowDownLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'

import './styles.css'
import logo from '../../assets/logo.svg'
import api from '../../services/api'

interface Item {
  id: number,
  title: string,
  image_url: string
}

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const CreatePoint = () => {

  const [items, setItems] = useState<Item[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [citys, setCitys] = useState<string[]>([])

  const [ufSelected, setUfSelected] = useState('0')
  const [citySelected, setCitySelected] = useState('0')

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    const baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
    axios.get<IBGEUFResponse[]>(baseUrl).then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)
      
      setUfs(ufInitials)
    })
  }, [])

  useEffect( () => {
    if (ufSelected === '0') { return }

    const baseUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`
    
    axios.get<IBGECityResponse[]>(baseUrl).then(response => {
      const cityNames = response.data.map(city => city.nome)

      setCitys(cityNames)
    })

  }, [ufSelected])

  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value

    setUfSelected(uf)
  }

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value

    setCitySelected(city)
  }

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
            <select
              name="uf"
              id="uf"
              value={ufSelected} 
              onChange={handleSelectUf}
            >
              <option value="0">Selecione uma uf</option>
              {
                ufs.map(uf => (
                  <option
                    key={uf}
                    value={uf}
                  >
                    {uf}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="field">
            <label htmlFor="city">Cidade</label>
            <select
              name="city"
              id="city"
              value={citySelected}
              onChange={handleSelectCity}
            >
              <option value="0">Selecione uma cidade</option>
              {
                citys.map(city => (
                  <option
                    key={city}
                    value={city}
                  >
                    {city}
                  </option>
                ))
              }
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