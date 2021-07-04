import React, { useState, FormEvent,useEffect } from "react";
import { IoMdPin } from 'react-icons/io';
import { RiDeleteBinLine, RiFileEditLine} from 'react-icons/ri';
import { Link, useLocation  } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import api from '../../services/api';

import { Title, Form, CityRepository } from './styles';

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
      }, [repositories,params]);
    
     function useQuery() {
        const queryS = new URLSearchParams(useLocation().search);

        return { "id": queryS.get("id"), "state":queryS.get("state")};

      }  

      
    async function handleAddRepository(
        e: FormEvent<HTMLFormElement>,
      ): Promise<void> {
        e.preventDefault();
    
        try {
          const data = {
              "cities": newCity,
              "state_id": params.id
          };
           await api.post(`cities`,data);
          
          /*setRepositories([repository]);*/
          setNewCity('');
          /*setInputError('');*/
        } catch (err) {
          /* setInputError('Erro na busca por esse repositório');*/
        }
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
                <Link key={res.id} to={`/`}>
                     <FiChevronLeft size={20} />
                    <IoMdPin size={20} />
                    <div>
                        <strong>{res.cities}</strong>
                    </div>
                      <button type="submit">
                          <RiFileEditLine size={25} color={'#FF8250'}/>
                        </button>
                      <button type="submit"><RiDeleteBinLine size={25} color={'#DF362D'} /></button>
                </Link>
                
                ))}
            </CityRepository>

        </>
    );
};

export default Cities;