import PaginaDetalhes from '@/Componentes/PaginaDetalhes'
import ApiDeputados from '@/services/ApiDeputados'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Card, CardGroup, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const index = ({ deputado }) => {
  const { push } = useRouter()
  const { register, handleSubmit } = useForm()

  function salvar(dados) {
    window.localStorage.setItem('comparador', JSON.stringify(dados))
    push('/comparador/comp')
  }

  return (
    <>
      <PaginaDetalhes titulo='Comparador'>
        <CardGroup>
          <Card className='mt-5 text-center'>
            <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label >selecione deputado 1</Form.Label>
                    <Form.Select placehouder="Selecione o ID do deputado" {...register('id1')}>
                      {deputado.map(item => (
                        <option value={item.id} key={item.id}>{item.nome}</option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label >selecione deputado 2</Form.Label>
                    <Form.Select defaultValue="Selecione o ID do deputado" {...register('id2')}>
                      {deputado.map(item => (
                        <option value={item.id} key={item.id}>{item.nome}</option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label >selecione deputado 3</Form.Label>
                    <Form.Select {...register('id3')}>
                      {deputado.map(item => (
                        <option value={item.id} key={item.id}>{item.nome}</option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Button variant="success" onClick={handleSubmit(salvar)}>Comparar</Button>
                </Form>
            </Card.Body>
          </Card>
          <Card className='mt-5 bg-success text-center'>
            <Card.Body>
              <Card.Header>Esse é o comparador</Card.Header>
              Selecione os deputados que deseja compara ao lado e clique em comparar
               para analisar os gastos dos deputados selecionados
            </Card.Body>
          </Card>
        </CardGroup>
      </PaginaDetalhes>
    </>
  )
}
export async function getServerSideProps(context) {
  const deputados = await ApiDeputados.get('/deputados')
  const deputado = deputados.data.dados


  return {
    props: { deputado }, // will be passed to the page component as props
  }
}
export default index