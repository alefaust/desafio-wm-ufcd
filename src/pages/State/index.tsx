import React, { useState, FormEvent, useEffect } from "react";
import { IoMdPin } from 'react-icons/io';
import { FiChevronRight } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import api from '../../services/api';

import { Title, Form, Repository, Error, Container } from './styles';

interface Repository {
  id: string;
  state: string;
}


interface Options {
  label: string;
  value: string;
}

const State: React.FC = () => {

  const [newState, setNewState] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    api.get(`state/`).then(response => {
      setRepositories(response.data);
    });
  }, [repositories]);

  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (!newState) {
      setInputError('Digite um nome para o estado');
      return;
    }

    try {
      const data = {
        "id": uuid(),
        "state": newState
      };
      await api.post(`state`, data);
      setNewState('');
      setInputError('');
    } catch (err) {
      setInputError('Erro ao gravar dados');
    }
  }

  async function deleteState(e: any) {
    confirmAlert({
      title: 'Deseja remover o Estado',
      message: 'Esta ação irá remover em definitivo.',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => await api.delete(`state?id=${e}`)
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
      <Title>Cadastrar Estados</Title>
      <Form onSubmit={handleAddRepository}>

        <input
          value={newState}
          onChange={e => setNewState(e.target.value)}
          placeholder="Digita o Estado" />
        <button type="submit">Adicionar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repository>
        {repositories.map(repository => (
          <>
            <Container>

              <IoMdPin size={20} color={'#0e7dfc'} />
              <div>
                <strong>{repository.state}</strong>
              </div>
              <button type="submit" onClick={e => deleteState(repository.id)}>
                <RiDeleteBinLine size={25} color={'#DF362D'} />
              </button>
              <Link
                key={repository.id}
                to={`/cities?id=${repository.id}&state=${repository.state}`}
              >
                <FiChevronRight size={30} />
              </Link>
            </Container>
          </>
        ))}
      </Repository>

    </>
  );

}

export default State;
