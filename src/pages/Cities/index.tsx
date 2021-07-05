import React, { useState, FormEvent, useEffect } from "react";
import { GiModernCity } from 'react-icons/gi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';

import api from '../../services/api';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Title, Form, CityRepository, Error, Container } from './styles';

interface CityRepository {
  id: string;
  cities: string;
  state_id: string;
}


const Cities: React.FC = () => {

  const [newCity, setNewCity] = useState('');
  const [repositories, setRepositories] = useState<CityRepository[]>([]);
  const [inputError, setInputError] = useState('');
  const [params,] = useState(useQuery());

  useEffect(() => {
    api.get(`cities?id=${params.id}`).then(response => {
      setRepositories(response.data);
    });
  }, [repositories, params]);

  function useQuery() {
    const queryS = new URLSearchParams(useLocation().search);

    return { "id": queryS.get("id"), "state": queryS.get("state") };

  }


  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (!newCity) {
      setInputError('Digite um nome para a cidade');
      return;
    }

    try {
      const data = {
        "id": uuid(),
        "cities": newCity,
        "state_id": params.id
      };
      await api.post(`cities`, data);

      setNewCity('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca dos dados');
    }
  }

  async function deleteCity(e: any) {
    confirmAlert({
      title: 'Deseja remover o item',
      message: 'Esta ação irá remover em definitivo.',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => await api.delete(`cities?id=${e}`)
        },
        {
          label: 'Não',
          onClick: () => ''
        }
      ]
    });
   
  }



  return (
    <>
      <Title>Cadastrar cidades {params.state}</Title>
      <Form onSubmit={handleAddRepository}>
        <input
          value={newCity}
          onChange={e => setNewCity(e.target.value)}
          placeholder="Digitar a cidade" />
        <button type="submit">Adicionar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <CityRepository>
        {repositories.map(res => (
          <>
            <Container>
              <Link key={res.id} to={`/`}>
                <FiChevronLeft size={30} />
              </Link>
              <GiModernCity size={20} color={"#0e7dfc"} />
              <div>
                <strong>{res.cities}</strong>
              </div>
              <button type="submit" onClick={e => deleteCity(res.id)}><RiDeleteBinLine size={25} color={'#DF362D'} /></button>
            </Container>


          </>
        ))}
      </CityRepository>

    </>
  );
};

export default Cities;
