import React, { useState, FormEvent, useEffect } from "react";
import { IoMdPin } from 'react-icons/io';
import { FiChevronRight } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AsyncSelect from "react-select/async";

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Title, Form, Repository, Error } from './styles';

interface Repository {
  id: string;
  state: string;
}


const State: React.FC = () => {

  const { addToast } = useToast();

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
        "state": newState
      };
      const response = await api.post(`state`, data);

      addToast({
        type: 'success',
        title: 'O item froi removido!',
        description: '',
      });

      setNewState('');
      setInputError('');
    } catch (err) {
       setInputError('Erro ao gravar dados');
    }
  }

  async function deleteState(e:any) {

    await api.delete(`state?id=${e}`);

   /*addToast({
      type: 'success',
      title: 'O item froi removido!',
      description: '',
   });*/

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
            <Link
              key={repository.id}
              to={`/cities?id=${repository.id}&state=${repository.state}`}

            >
              <IoMdPin size={20} />
              <div>
                <strong>{repository.state}</strong>
              </div>
              <FiChevronRight size={20} />
            </Link>
            <div className="buttonDel">
              <button type="submit" onClick={e => deleteState(repository.id)}>
                <RiDeleteBinLine size={25} color={'#DF362D'} />
              </button>
            </div>
          </>
        ))}
      </Repository>

    </>
  );

}

export default State;
