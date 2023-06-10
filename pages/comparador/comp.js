import Pagina from '@/Componentes/Pagina'
import ApiDeputados from '@/services/ApiDeputados'
import React, { useEffect, useState } from 'react'
import { GrUpdate } from 'react-icons/gr'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import PaginaDetalhes from '@/Componentes/PaginaDetalhes'

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

  const [data, setData] = useState({})
  const [d, setD] = useState({})
  const [d2, setD2] = useState({})
  const [d3, setD3] = useState({})

  useEffect(() => {
    async function getDeputado(id1) {
      const d = { despesas: [] }
      const deputados1 = await ApiDeputados.get('/deputados/' + id1)
      d['infPessoais'] = deputados1.data.dados.ultimoStatus

      for (let i = 1; i < 6; i++) {

        const desp = await ApiDeputados.get(`/deputados/${id1}/despesas?ano=2023&mes=${i}`)
        d['despesas'].push(desp.data.dados)
      }

      const prof1 = await ApiDeputados.get(`/deputados/${id1}/profissoes`)
      d['profissoes'] = prof1.data.dados

      return d
    }

    const arrLocalStorage = JSON.parse(window.localStorage.getItem('comparador'))
    const promessas = []
    console.log(arrLocalStorage.id1);
    /*
    for(let id of arrLocalStorage){
      //promessas.push(arrLocalStorage[id])
      console.log(id);
    }
    console.log(promessas);
    */
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
      const totalMai = soma(d.despesas[4]).toFixed(2)
      

      const totalJan2 = soma(d2.despesas[0]).toFixed(2)
      const totalFev2 = soma(d2.despesas[1]).toFixed(2)
      const totalMar2 = soma(d2.despesas[2]).toFixed(2)
      const totalAbr2 = soma(d2.despesas[3]).toFixed(2)
      const totalMai2 = soma(d2.despesas[4]).toFixed(2)
     

      const totalJan3 = soma(d3.despesas[0]).toFixed(2)
      const totalFev3 = soma(d3.despesas[1]).toFixed(2)
      const totalMar3 = soma(d3.despesas[2]).toFixed(2)
      const totalAbr3 = soma(d3.despesas[3]).toFixed(2)
      const totalMai3 = soma(d3.despesas[4]).toFixed(2)
      

      const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'];
      const data = {
        labels,
        datasets: [
          {
            label: d.infPessoais.nomeEleitoral,
            data: [totalJan, totalFev, totalMar, totalAbr, totalMai],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'red',
            borderWidth: 1
          },
          {
            label: d2.infPessoais.nomeEleitoral,
            data: [totalJan2, totalFev2, totalMar2, totalAbr2, totalMai2],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderColor: 'blue',
            borderWidth: 1
          },
          {
            label: d3.infPessoais.nomeEleitoral,
            data: [totalJan3, totalFev3, totalMar3, totalAbr3, totalMai3],
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            borderColor: 'gren',
            borderWidth: 1
          },

        ],

      };

      setData(data)
    });

  }, [])

  //primeiro comentario




  return (
    <>
      <PaginaDetalhes titulo='Comparador' />
      <Container>

        {
          data.datasets &&
          <Row>
            <Col md={6}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td><Button href='/comparador' className='mb-5'>Trocar <GrUpdate className='text-danger font-size-50px' /></Button></td>
                    <td ><Card.Img src={d.infPessoais.urlFoto}></Card.Img></td>
                    <td ><Card.Img src={d2.infPessoais.urlFoto}></Card.Img></td>
                    <td ><Card.Img src={d3.infPessoais.urlFoto}></Card.Img></td>
                  </tr>
                </thead>
                <tbody>
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

      </Container>
    </>
  )
}

export default index