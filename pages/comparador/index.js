import Pagina from '@/Componentes/Pagina'
import ApiDeputados from '@/services/ApiDeputados'
import React, { useEffect, useState } from 'react'
import { GrUpdate } from 'react-icons/gr'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import PaginaDetalhes from '@/Componentes/PaginaDetalhes'
import { Form, useForm } from 'react-hook-form'

function soma(despesas) {
  let soma = 0
  {
    despesas.map(item => {
      soma += item.valorLiquido

    })
    return soma
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Dataset',
    },
  },
};

const index = () => {

  const [r, setR] = useState(0)
  const [data, setData] = useState({})
  const [d, setD] = useState({})
  const [d2, setD2] = useState({})
  const [d3, setD3] = useState({})
  const [deputado, setDeputado] = useState([])

  const { register, handleSubmit } = useForm()

  
  useEffect(() => {

    ApiDeputados.get(`/deputados`).then(resultado => {
      setDeputado(resultado.data.dados)
    })

  }, [])

  useEffect(() => {


    async function getDeputado(id1) {
      const d = { despesas: [] }
      const deputados1 = await ApiDeputados.get('/deputados/' + id1)
      d['infPessoais'] = deputados1.data.dados.ultimoStatus

      for (let i = 1; i < 5; i++) {

        const desp = await ApiDeputados.get(`/deputados/${id1}/despesas?ano=2023&mes=${i}`)
        d['despesas'].push(desp.data.dados)
      }

      const prof1 = await ApiDeputados.get(`/deputados/${id1}/profissoes`)
      d['profissoes'] = prof1.data.dados

      return d
    }

    const arrLocalStorage = JSON.parse(window.localStorage.getItem('comparador')) || {id1: '74646', id2: '204379', id3: '160541'}
    const promessas = []
    
    promessas.push(getDeputado(arrLocalStorage.id1))
    promessas.push(getDeputado(arrLocalStorage.id2))
    promessas.push(getDeputado(arrLocalStorage.id3))

    Promise.all(promessas).then((values) => {
      console.log(values);

      const d = values[0]
      const d2 = values[1]
      const d3 = values[2]
      setD(d)
      setD2(d2)
      setD3(d3)


      const totalJan = soma(d.despesas[0]).toFixed(2)
      const totalFev = soma(d.despesas[1]).toFixed(2)
      const totalMar = soma(d.despesas[2]).toFixed(2)
      const totalAbr = soma(d.despesas[3]).toFixed(2)
     // const totalMai = soma(d.despesas[4]).toFixed(2)


      const totalJan2 = soma(d2.despesas[0]).toFixed(2)
      const totalFev2 = soma(d2.despesas[1]).toFixed(2)
      const totalMar2 = soma(d2.despesas[2]).toFixed(2)
      const totalAbr2 = soma(d2.despesas[3]).toFixed(2)
     // const totalMai2 = soma(d2.despesas[4]).toFixed(2)


      const totalJan3 = soma(d3.despesas[0]).toFixed(2)
      const totalFev3 = soma(d3.despesas[1]).toFixed(2)
      const totalMar3 = soma(d3.despesas[2]).toFixed(2)
      const totalAbr3 = soma(d3.despesas[3]).toFixed(2)
     // const totalMai3 = soma(d3.despesas[4]).toFixed(2)


      const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];
      const data = {
        labels,
        datasets: [
          {
            label: d.infPessoais.nomeEleitoral,
            data: [totalJan, totalFev, totalMar, totalAbr ],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'red',
            borderWidth: 1
          },
          {
            label: d2.infPessoais.nomeEleitoral,
            data: [totalJan2, totalFev2, totalMar2, totalAbr2],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderColor: 'blue',
            borderWidth: 1
          },
          {
            label: d3.infPessoais.nomeEleitoral,
            data: [totalJan3, totalFev3, totalMar3, totalAbr3],
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            borderColor: 'gren',
            borderWidth: 1
          },

        ],

      };

      setData(data)
    });

  }, [r])

  //primeiro comentario

  function salvar(dados) {
    window.localStorage.setItem('comparador', JSON.stringify(dados))
    setR(r+1)
  }


  return (
    <>
      <PaginaDetalhes titulo='Comparador' >
    

        {
          data.datasets &&
          <Row>
            <Col md={6}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th><Button variant="success" onClick={handleSubmit(salvar)}>Comparar</Button></th>
                    <td>
                      <select className='form-control' placeholder="Selecione o ID do deputado" {...register('id1')}>
                        {deputado.map(item => (
                          <option value={item.id} key={item.id}>{item.nome}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select className='form-control' placeholder="Selecione o ID do deputado" {...register('id2')}>
                        {deputado.map(item => (
                          <option value={item.id} key={item.id}>{item.nome}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select className='form-control' placeholder="Selecione o ID do deputado" {...register('id3')}>
                        {deputado.map(item => (
                          <option value={item.id} key={item.id}>{item.nome}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>#</td>
                    <td ><Card.Img style={{ width: '9rem' }} src={d.infPessoais.urlFoto}></Card.Img></td>
                    <td ><Card.Img style={{ width: '9rem' }} src={d2.infPessoais.urlFoto}></Card.Img></td>
                    <td ><Card.Img style={{ width: '9rem' }} src={d3.infPessoais.urlFoto}></Card.Img></td>
                  </tr>
                  <tr>
                    <th>Nome</th>
                    <td>{d.infPessoais.nomeEleitoral}</td>
                    <td>{d2.infPessoais.nomeEleitoral}</td>
                    <td>{d3.infPessoais.nomeEleitoral}</td>
                  </tr>
                  <tr>
                    <th>Partido</th>
                    <td>{d.infPessoais.siglaPartido}</td>
                    <td>{d2.infPessoais.siglaPartido}</td>
                    <td>{d3.infPessoais.siglaPartido}</td>
                  </tr>
                  <tr>
                    <th>Condição Eleitoral</th>
                    <td>{d.infPessoais.condicaoEleitoral}</td>
                    <td>{d2.infPessoais.condicaoEleitoral}</td>
                    <td>{d3.infPessoais.condicaoEleitoral}</td>
                  </tr>
                  <tr>
                    <th>Profissões</th>
                    <td>
                      {d.profissoes.map(item => (
                        <li key={item.id}>{item.titulo}</li>
                      ))}</td>
                    <td>
                      {d2.profissoes.map(item => (
                        <li key={item.id}>{item.titulo}</li>
                      ))}
                    </td>
                    <td>
                      {d3.profissoes.map(item => (
                        <li key={item.id}>{item.titulo}</li>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
              <h2>Grafico de Gastos de 2023</h2>
              <Bar options={options} data={data} />
            </Col>
          </Row> 
}
</PaginaDetalhes>
    </>
  )
}

export default index
