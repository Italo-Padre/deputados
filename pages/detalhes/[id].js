import Pagina from '@/Componentes/Pagina'
import ApiDeputados from '@/services/ApiDeputados'
import React, { useState } from 'react'
import { Accordion, Card, Col, Container, Row, Table } from 'react-bootstrap'

function soma(desDeputado) {
  let soma = 0
  {
    desDeputado.map(item => {
      soma +=  item.valorLiquido
      
    })
    return soma
  }
}
const detalhes = ({ infPessoais, desDeputado }) => {
  const total = soma(desDeputado)

  return (
    <>
      <Pagina titulo={infPessoais.ultimoStatus.nomeEleitoral} />
      <Container>
        <Row>
          <Col md={4}><Card.Img variant="top" src={infPessoais.ultimoStatus.urlFoto}></Card.Img></Col>
          <Col>
            <h2>Informações Pessoais</h2>
            <p><strong>Nome: </strong>{infPessoais.nomeCivil}</p>
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
        </Row>
        <h2>Dados Adicionais</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Despesas</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Local da Compra</th>
                    <th>Valor</th>
                    <th>Tipo de Despesa</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {desDeputado.map(item => (
                    <tr>
                      <td>{item.nomeFornecedor}</td>
                      <td>R${item.valorLiquido}</td>
                      <td>{item.tipoDespesa}</td>
                      <td>{item.dataDocumento}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
                    <div>{total}</div>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  )
}
export async function getServerSideProps(context) {
  const id = context.params.id

  const deputados = await ApiDeputados.get('/deputados/' + id)
  const infPessoais = deputados.data.dados

  const despesas = await ApiDeputados.get('/deputados/' + id + '/despesas?ano=2023')
  const desDeputado = despesas.data.dados

  return {
    props: { infPessoais, desDeputado }
  }
}
export default detalhes