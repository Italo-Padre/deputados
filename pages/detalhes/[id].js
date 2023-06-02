import Pagina from '@/Componentes/Pagina'
import ApiDeputados from '@/services/ApiDeputados'
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, Container, Form, Row, Table, Toast } from 'react-bootstrap'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import PaginaDetalhes from '@/Componentes/PaginaDetalhes';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

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
const detalhes = ({ infPessoais, despesaJan, despesaFev, despesaMar, despesaAbr, despesaMai }) => {
  const [comentarios, setComentarios] = useState([])

  useEffect(() => {
    setComentarios(getAll)
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('comentarios')) || []
  }

  const { register, handleSubmit } = useForm()

  function salvar(dados) {
    const coment = JSON.parse(window.localStorage.getItem('comentarios')) || []
    coment.push(dados)
    window.localStorage.setItem('comentarios', JSON.stringify(coment))
    window.location.reload()

  }

  const totalJan = soma(despesaJan).toFixed(2)
  const totalFev = soma(despesaFev).toFixed(2)
  const totalMar = soma(despesaMar).toFixed(2)
  const totalAbr = soma(despesaAbr).toFixed(2)
  const totalMai = soma(despesaMai).toFixed(2)


  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'];
  const data = {
    labels,
    datasets: [
      {
        label: infPessoais.ultimoStatus.nomeEleitoral,
        data: [totalJan, totalFev, totalMar, totalAbr, totalMai],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'red',
        borderWidth: 1
      },

    ],
  };

  return (
    <>
      <PaginaDetalhes titulo={infPessoais.ultimoStatus.nomeEleitoral} />
      <Container>
        <Row>
          <Col md={4}><Card.Img variant="top" src={infPessoais.ultimoStatus.urlFoto}></Card.Img></Col>
          <Col md={3}>
            <h2>Informações Pessoais</h2>
            <p><strong>Nome: </strong>{infPessoais.ultimoStatus.nome}</p>
            <p><strong>Município de Nascimento: </strong>{infPessoais.municipioNascimento}</p>
            <p><strong>Data de Nascimento: </strong>{infPessoais.dataNascimento}</p>
            {
              infPessoais.escolaridade ?
                <p><strong>Escolaridade: </strong>{infPessoais.escolaridade}</p> :
                <p><strong>Escolaridade: </strong>*Não informado*</p>
            }
            <h2>Informações Profissionais</h2>
            <p><strong>Nome Eleitoral: </strong>{infPessoais.ultimoStatus.nomeEleitoral}</p>
            <p><strong>Situação: </strong>{infPessoais.ultimoStatus.situacao}</p>
            <p><strong>Email: </strong>{infPessoais.ultimoStatus.email}</p>
            <p><strong>Condição Eleitoral: </strong>{infPessoais.ultimoStatus.condicaoEleitoral}</p>
            <p><strong>Partido: </strong>{infPessoais.ultimoStatus.siglaPartido}</p>
          </Col>
          <Col md={5}>
            <h2>Grafico de Gastos de 2023</h2>
            <Bar options={options} data={data} />
          </Col>
        </Row>
        <h3>Confira o que as pessoas comentaram sobre os deputados</h3>
        <Row>
          {comentarios.map(item => (
            <Col md={3}>
              <Toast className='mb-1' >
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">{item.nome}</strong>
                  <small>{item.data}</small>
                </Toast.Header>
                <Toast.Body>{item.comentario}</Toast.Body>
              </Toast>
            </Col>
          ))}
        </Row>
        <h3>Deixe sua opinião sobre nossos deputados</h3>
        <Form className="mb-3">
          <Row>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control  {...register('nome')} type="email" placeholder="Seu nome:" />
          </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Data</Form.Label>
            <Form.Control  {...register('data')} type="date" placeholder="Seu nome:" />
          </Form.Group>
          </Col>
          </Row>
          <Form.Group className="mb-3" controlId="comentario">
            <Form.Label>Deixe sua Opinião sobre os Deputados</Form.Label>
            <Form.Control {...register('comentario')} as="textarea" rows={3} />
          </Form.Group>
          <Button variant="success" onClick={handleSubmit(salvar)}>
            Publicar
          </Button>
        </Form>

      </Container>
    </>
  )
}
export async function getServerSideProps(context) {
  const id = context.params.id

  const deputados = await ApiDeputados.get('/deputados/' + id)
  const infPessoais = deputados.data.dados

  const despesas = await ApiDeputados.get('/deputados/' + id + '/despesas?ano=2023&mes=1')
  const despesaJan = despesas.data.dados

  const despesasF = await ApiDeputados.get('/deputados/' + id + '/despesas?ano=2023&mes=2')
  const despesaFev = despesasF.data.dados

  const despesasM = await ApiDeputados.get('/deputados/' + id + '/despesas?ano=2023&mes=3')
  const despesaMar = despesasM.data.dados

  const despesasA = await ApiDeputados.get('/deputados/' + id + '/despesas?ano=2023&mes=4')
  const despesaAbr = despesasA.data.dados

  const despesasMa = await ApiDeputados.get('/deputados/' + id + '/despesas?ano=2023&mes=5')
  const despesaMai = despesasMa.data.dados

  return {
    props: { infPessoais, despesaJan, despesaFev, despesaMar, despesaAbr, despesaMai }
  }
}
export default detalhes