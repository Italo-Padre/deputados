import ApiDeputados from '@/services/ApiDeputados'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Table, Toast } from 'react-bootstrap'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import PaginaDetalhes from '@/Componentes/PaginaDetalhes';
import { useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai'
import validatorForm from '@/validator/validator';

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
const detalhes = ({ infPessoais,d }) => {
  const [comentarios, setComentarios] = useState([])

  useEffect(() => {
    setComentarios(getAll)
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem(infPessoais.id )) || []
  }

  const { register, handleSubmit, formState:{errors} } = useForm()

  function salvar(dados) {
    const coment = JSON.parse(window.localStorage.getItem(infPessoais.id )) || []
    coment.push(dados)
    window.localStorage.setItem(infPessoais.id , JSON.stringify(coment))
    window.location.reload()
  }
  function excluir(id) {
    if (confirm('Deseja realmente excluir ?')) {
      const comentarios = getAll()
      comentarios.splice(id, 1)
      window.localStorage.setItem(infPessoais.id, JSON.stringify(comentarios))
      setComentarios(comentarios)
    }
  }

  const totalJan = soma(d.despesas[0]).toFixed(2)
  const totalFev = soma(d.despesas[1]).toFixed(2)
  const totalMar = soma(d.despesas[2]).toFixed(2)
  const totalAbr = soma(d.despesas[3]).toFixed(2)
  const totalMai = soma(d.despesas[4]).toFixed(2)


  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'];
  const data = {
    labels,
    datasets: [
      {
        label: infPessoais.ultimoStatus.nomeEleitoral,
        data: [totalJan, totalFev, totalMar, totalAbr, totalMai],
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'green',
        borderWidth: 1
      },

    ],
  };

  return (
    <>
      <PaginaDetalhes titulo={infPessoais.ultimoStatus.nomeEleitoral} >

      
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
        <Row>
          {comentarios.map((item, i) => (
            <Col key={item.id} md={3}>
              <Toast className='mb-1 mt-3 bg-success' >
                <Toast.Header closeButton={false}>
                  <AiOutlineDelete onClick={() => excluir(i)} />
                  <strong className="me-auto">{item.nome}</strong>
                  <small>{item.data}</small>
                </Toast.Header>
                <Toast.Body>{item.comentario}</Toast.Body>
              </Toast>
            </Col>
          ))}
        </Row>
        <Card className='mb-3 mt-3'>
          <Card.Header className='bg-success text-center'>
            <h3>Deixe sua opinião sobre nossos deputados preenchendo o formulario a baixo</h3>
          </Card.Header>
          <Card.Body>
            <Form className="mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control {...register('nome')} type="email" placeholder="Seu nome:" />
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
                <Form.Control isInvalid={errors.comentario}   {...register('comentario', validatorForm.comentario)} as="textarea" rows={3} />
                {
                  errors.comentario &&
                    <small>{errors.comentario.message}</small>
                    }
              </Form.Group>
              <Button variant="success" onClick={handleSubmit(salvar)}>
                Publicar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </PaginaDetalhes>
    </>
  )
}
export async function getServerSideProps(context) {
  const id = context.params.id

  const deputados = await ApiDeputados.get('/deputados/' + id)
  const infPessoais = deputados.data.dados

  const d = {despesas:[]}

  for(let i=1; i<6; i++){

    const desp = await ApiDeputados.get(`/deputados/${id}/despesas?ano=2023&mes=${i}`)
    d['despesas'].push(desp.data.dados)
  }

  return {
    props: { infPessoais,d }
  }
}
export default detalhes