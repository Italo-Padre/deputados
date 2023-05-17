import Pagina from '@/Componentes/Pagina'
import ApiDeputados from '@/services/ApiDeputados'
import React from 'react'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function soma(desDeputado) {
    let soma = 0
    {
      desDeputado.map(item => {
        soma +=  item.valorLiquido
        
      })
      return soma
    }
  }
  function soma2(desDeputado2) {
    let soma2 = 0
    {
      desDeputado2.map(item => {
        soma2 +=  item.valorLiquido
        
      })
      return soma2
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

const labels = ['1', '2'];
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset vermelho',
            data:[1,2,3,4,5,6],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'red',
            borderWidth: 1
        },
        {
            label: 'Dataset azul',
            data:[1,2,3,4,5,6],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderColor: 'blue',
            borderWidth: 1
        },
    ],
};

const index = ({infPessoais, desDeputado, segundo, desDeputado2, ocupDep, ocupDep2, profissoes, profissoes2}) => {
    const total = soma(desDeputado)
    const total2 = soma2(desDeputado2)
    
  return (
    <>
        <Pagina titulo='Comparador'/>
        <Container>
            <Row>
                <Col md={3}>
                <Card.Img variant="top" src={infPessoais.urlFoto}></Card.Img>
                <h2>Profissões</h2>
                    {profissoes.map(item=>(
                      <li>{item.titulo}</li>
                    ))}
                 <h2>Ocupações</h2>
                  {ocupDep.map(item=>(
                    <li>{item.titulo}</li>
                  ))}
                  <h2>Gastos</h2>
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Valores Gastos</th>
                    <th>Tipo de Despesa</th>
                  </tr>
                </thead>
                <tbody>
                  {desDeputado.map(item => (
                    <tr>
                      <td>R${item.valorLiquido}</td>
                      <td>{item.tipoDespesa}</td>
                    </tr>
                  ))}
                   <tr>
                      <th colSpan={2}>Total</th>
                    </tr>
                    <tr>
                      <td>{total}</td>
                    </tr>
                </tbody>
              </Table>
                </Col>
                <Col md={3}>
                <Card.Img variant="top" src={segundo.urlFoto}></Card.Img>
                <h2>Profissões</h2>
                    {profissoes2.map(item=>(
                      <li>{item.titulo}</li>
                    ))}
                <h2>Ocupações</h2>
                    {ocupDep2.map(item=>(
                      <li>{item.titulo}</li>
                    ))}
                    <h2>Gastos</h2>
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Valores Gastos</th>
                    <th>Tipo de Despesa</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {desDeputado2.map(item => (
                    <tr>
                      
                      <td>R${item.valorLiquido}</td>
                      <td>{item.tipoDespesa}</td>
                    </tr>
                  ))}
                    <tr>
                      <th colSpan={2}>Total</th>
                    </tr>
                    <tr>
                      <td >{total2}</td>
                    </tr>
                </tbody>
              </Table> 
                </Col>
                <Col md={6}>
                  <h2>Grafico de Gastos</h2>
                <Bar options={options} data={data} />
                </Col>
            </Row>
        </Container>
    </>
  )
}
export async function getServerSideProps(context) {
    
    const deputados = await ApiDeputados.get('/deputados/220593')
    const infPessoais = deputados.data.dados.ultimoStatus

    const despesas = await ApiDeputados.get('/deputados/220593/despesas?ano=2023')
    const desDeputado = despesas.data.dados

    const ocupacoes = await ApiDeputados.get('/deputados/220593/ocupacoes')
    const ocupDep = ocupacoes.data.dados

    const prof = await ApiDeputados.get('/deputados/220593/profissoes')
    const profissoes = prof.data.dados

    const deputados2 = await ApiDeputados.get('/deputados/204379')
    const segundo = deputados2.data.dados.ultimoStatus

    const despesas2 = await ApiDeputados.get('/deputados/204379/despesas?ano=2023')
    const desDeputado2 = despesas2.data.dados

    const ocupacoes2 = await ApiDeputados.get('/deputados/204379/ocupacoes')
    const ocupDep2 = ocupacoes2.data.dados

    const prof2 = await ApiDeputados.get('/deputados/204379/profissoes')
    const profissoes2 = prof2.data.dados
  
  
    return {
      props: {infPessoais, desDeputado, segundo, desDeputado2, ocupDep, ocupDep2, profissoes, profissoes2}
    }
}
export default index