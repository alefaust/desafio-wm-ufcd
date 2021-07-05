import React, { useState, FormEvent, useEffect } from "react";
import { GiModernCity } from 'react-icons/gi';
import { RiDeleteBinLine, RiFileEditLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';

import api from '../../services/api';

import { Title, Form, CityRepository, Container } from './styles';

interface CityRepository {
  id: string;
  cities: string;
  state_id: string;
}


const Cities: React.FC = () => {

  const [newCity, setNewCity] = useState('');
  const [repositories, setRepositories] = useState<CityRepository[]>([]);

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

    try {
      const data = {
        "id": uuid(),
        "cities": newCity,
        "state_id": params.id
      };
      await api.post(`cities`, data);

      /*setRepositories([repository]);*/
      setNewCity('');
      /*setInputError('');*/
    } catch (err) {
      /* setInputError('Erro na busca por esse repositório');*/
    }
  }

  async function deleteCity(e: any) {

    await api.delete(`cities?id=${e}`);

    /*addToast({
       type: 'success',
       title: 'O item froi removido!',
       description: '',
    });*/

  }

  async function editCity(params: any) {
    setNewCity("teste");
    console.log(repositories);
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
              <button type="submit" onClick={e => editCity(res.id)}><RiFileEditLine size={25} color={'#FF8250'} /></button>
              <button type="submit" onClick={e => deleteCity(res.id)}><RiDeleteBinLine size={25} color={'#DF362D'} /></button>
            </Container>


          </>
        ))}
      </CityRepository>

    </>
  );
};

export default Cities;
