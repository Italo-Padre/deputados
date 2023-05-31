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

const index = ({ infPessoais, profissoes, desDeputadoJan, desDeputadoFev, desDeputadoMar, desDeputadoAbr, desDeputadoMai,
  segundo, desDeputadoJan2, desDeputadoFev2, desDeputadoMar2, desDeputadoAbr2, desDeputadoMai2, profissoes2,
  terceiro, desDeputadoJan3, desDeputadoFev3, desDeputadoMar3, desDeputadoAbr3, desDeputadoMai3, profissoes3 }) => {
  /*
      const [deputados, setDeputados] = useState([])
  
      console.log(deputados);
  
      useEffect( ()=>{
  
        carregarDeputado(220593)
        
        // carregarDeputado(204379)
        // carregarDeputado(74646)
      }, [])
      
      async function carregarDeputado(idDeputado){
        const deputado = {despesas: []}
        
        const dep = await ApiDeputados.get(`/deputados/${idDeputado}`)
        deputado.infPessoais = dep.data.dados.ultimoStatus
        
        const prof = await ApiDeputados.get(`/deputados/${idDeputado}/profissoes`)
        deputado.profissoes = prof.data.dados  
        
        const despesasj = await ApiDeputados.get(`/deputados/${idDeputado}/despesas?ano=2023&mes=1`)
        deputado.despesas.push([{jan: despesasj.data.dados}])
        
        const despesas = await ApiDeputados.get(`/deputados/${idDeputado}/despesas?ano=2023&mes=2`)
        deputado.despesas.push([{fev: despesas.data.dados}])
        
        const despesasM = await ApiDeputados.get(`/deputados/${idDeputado}/despesas?ano=2023&mes=3`)
        deputado.despesas.push([{mar: despesasM.data.dados}])
        
        const despesasA = await ApiDeputados.get(`/deputados/${idDeputado}/despesas?ano=2023&mes=4`)
        deputado.despesas.push([{abr: despesasA.data.dados}])
        
        const despesasMa = await ApiDeputados.get(`/deputados/${idDeputado}/despesas?ano=2023&mes=5`)
        deputado.despesas.push([{mai: despesasMa.data.dados}])
        
        
        setDeputados(deputados.concat(deputado))
        return deputado
      }
      */

  const totalJan = soma(desDeputadoJan).toFixed(2)
  const totalFev = soma(desDeputadoFev).toFixed(2)
  const totalMar = soma(desDeputadoMar).toFixed(2)
  const totalAbr = soma(desDeputadoAbr).toFixed(2)
  const totalMai = soma(desDeputadoMai).toFixed(2)

  const totalJan2 = soma(desDeputadoJan2).toFixed(2)
  const totalFev2 = soma(desDeputadoFev2).toFixed(2)
  const totalMar2 = soma(desDeputadoMar2).toFixed(2)
  const totalAbr2 = soma(desDeputadoAbr2).toFixed(2)
  const totalMai2 = soma(desDeputadoMai2).toFixed(2)

  const totalJan3 = soma(desDeputadoJan3).toFixed(2)
  const totalFev3 = soma(desDeputadoFev3).toFixed(2)
  const totalMar3 = soma(desDeputadoMar3).toFixed(2)
  const totalAbr3 = soma(desDeputadoAbr3).toFixed(2)
  const totalMai3 = soma(desDeputadoMai3).toFixed(2)

  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'];
  const data = {
    labels,
    datasets: [
      {
        label: infPessoais.nomeEleitoral,
        data: [totalJan, totalFev, totalMar, totalAbr, totalMai],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'red',
        borderWidth: 1
      },
      {
        label: segundo.nomeEleitoral,
        data: [totalJan2, totalFev2, totalMar2, totalAbr2, totalMai2],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'blue',
        borderWidth: 1
      },
      {
        label: terceiro.nomeEleitoral,
        data: [totalJan3, totalFev3, totalMar3, totalAbr3, totalMai3],
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'gren',
        borderWidth: 1
      },

    ],
    
  };
  return (
    <>
      <PaginaDetalhes titulo='Comparador' />
      <Container>
        <Row>
          <Col md={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td><Button>Trocar <GrUpdate className='text-danger font-size-50px' /></Button></td>
                  <td ><Card.Img src={infPessoais.urlFoto}></Card.Img></td>
                  <td ><Card.Img src={segundo.urlFoto}></Card.Img></td>
                  <td ><Card.Img src={terceiro.urlFoto}></Card.Img></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Nome</th>
                  <td>{infPessoais.nomeEleitoral}</td>
                  <td>{segundo.nomeEleitoral}</td>
                  <td>{terceiro.nomeEleitoral}</td>
                </tr>
                <tr>
                  <th>Partido</th>
                  <td>{infPessoais.siglaPartido}</td>
                  <td>{segundo.siglaPartido}</td>
                  <td>{terceiro.siglaPartido}</td>
                </tr>
                <tr>
                  <th>Condição Eleitoral</th>
                  <td>{infPessoais.condicaoEleitoral}</td>
                  <td>{segundo.condicaoEleitoral}</td>
                  <td>{terceiro.condicaoEleitoral}</td>
                </tr>
                <tr>
                  <th>Profissões</th>
                  <td>
                    {profissoes.map(item => (
                      <li key={item.id}>{item.titulo}</li>
                    ))}</td>
                  <td>
                    {profissoes2.map(item => (
                      <li key={item.id}>{item.titulo}</li>
                    ))}
                  </td>
                  <td>
                    {profissoes3.map(item => (
                      <li key={item.id}>{item.titulo}</li>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>Valor gasto 01/2023</th>
                  <td>R$ {totalJan}</td>
                  <td>R$ {totalJan2}</td>
                  <td>R$ {totalJan3}</td>
                </tr>
                <tr>
                  <th>Valor gasto 02/2023</th>
                  <td>R$ {totalFev}</td>
                  <td>R$ {totalFev2}</td>
                  <td>R$ {totalFev3}</td>
                </tr>
                <tr>
                  <th>Valor gasto 03/2023</th>
                  <td>R$ {totalMar}</td>
                  <td>R$ {totalMar2}</td>
                  <td>R$ {totalMar3}</td>
                </tr>
                <tr>
                  <th>Valor gasto 04/2023</th>
                  <td>R$ {totalAbr}</td>
                  <td>R$ {totalAbr2}</td>
                  <td>R$ {totalAbr3}</td>
                </tr>
                <tr>
                  <th>Valor gasto 05/2023</th>
                  <td>R$ {totalMai}</td>
                  <td>R$ {totalMai2}</td>
                  <td>R$ {totalMai3}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <h2>Grafico de Gastos de 2023</h2>
            <Bar options={options} data={data} />
          </Col>
        </Row>
      </Container>
    </>
  )
}
export async function getServerSideProps(context) {

  //Primeiro deputado
  
  const prof = await ApiDeputados.get('/deputados/220593/profissoes')
  const profissoes = prof.data.dados

  const deputados = await ApiDeputados.get('/deputados/220593')
  const infPessoais = deputados.data.dados.ultimoStatus

  const despesasj = await ApiDeputados.get('/deputados/220593/despesas?ano=2023&mes=1')
  const desDeputadoJan = despesasj.data.dados

  const despesas = await ApiDeputados.get('/deputados/220593/despesas?ano=2023&mes=2')
  const desDeputadoFev = despesas.data.dados

  const despesasM = await ApiDeputados.get('/deputados/220593/despesas?ano=2023&mes=3')
  const desDeputadoMar = despesasM.data.dados

  const despesasA = await ApiDeputados.get('/deputados/220593/despesas?ano=2023&mes=4')
  const desDeputadoAbr = despesasA.data.dados

  const despesasMa = await ApiDeputados.get('/deputados/220593/despesas?ano=2023&mes=5')
  const desDeputadoMai = despesasMa.data.dados

  //Segundo deputado

  const deputados2 = await ApiDeputados.get('/deputados/204379')
  const segundo = deputados2.data.dados.ultimoStatus

  const despesasJ2 = await ApiDeputados.get('/deputados/204379/despesas?ano=2023&mes=1')
  const desDeputadoJan2 = despesasJ2.data.dados

  const despesasF2 = await ApiDeputados.get('/deputados/204379/despesas?ano=2023&mes=2')
  const desDeputadoFev2 = despesasF2.data.dados

  const despesasM2 = await ApiDeputados.get('/deputados/204379/despesas?ano=2023&mes=3')
  const desDeputadoMar2 = despesasM2.data.dados

  const despesasA2 = await ApiDeputados.get('/deputados/204379/despesas?ano=2023&mes=4')
  const desDeputadoAbr2 = despesasA2.data.dados

  const despesasMa2 = await ApiDeputados.get('/deputados/204379/despesas?ano=2023&mes=5')
  const desDeputadoMai2 = despesasMa2.data.dados

  const prof2 = await ApiDeputados.get('/deputados/204379/profissoes')
  const profissoes2 = prof2.data.dados

  //Terceiro Deputado id 74646

  const deputados3 = await ApiDeputados.get('/deputados/74646')
  const terceiro = deputados3.data.dados.ultimoStatus

  const despesasJ3 = await ApiDeputados.get('/deputados/74646/despesas?ano=2023&mes=1')
  const desDeputadoJan3 = despesasJ3.data.dados

  const despesasF3 = await ApiDeputados.get('/deputados/74646/despesas?ano=2023&mes=2')
  const desDeputadoFev3 = despesasF3.data.dados

  const despesasM3 = await ApiDeputados.get('/deputados/74646/despesas?ano=2023&mes=3')
  const desDeputadoMar3 = despesasM3.data.dados

  const despesasA3 = await ApiDeputados.get('/deputados/74646/despesas?ano=2023&mes=4')
  const desDeputadoAbr3 = despesasA3.data.dados

  const despesasMa3 = await ApiDeputados.get('/deputados/74646/despesas?ano=2023&mes=5')
  const desDeputadoMai3 = despesasMa3.data.dados

  const prof3 = await ApiDeputados.get('/deputados/74646/profissoes')
  const profissoes3 = prof3.data.dados

  return {
    props: {
      infPessoais, profissoes, desDeputadoJan, desDeputadoFev, desDeputadoMar, desDeputadoAbr, desDeputadoMai,
      segundo, desDeputadoJan2, desDeputadoFev2, desDeputadoMar2, desDeputadoAbr2, desDeputadoMai2, profissoes2,
      terceiro, desDeputadoJan3, desDeputadoFev3, desDeputadoMar3, desDeputadoAbr3, desDeputadoMai3, profissoes3
    }
  }
}
export default index