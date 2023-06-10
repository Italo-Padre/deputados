import ApiDeputados from "@/services/ApiDeputados";
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagina from "@/Componentes/Pagina";
import { Button, Card, Container, Pagination, Row } from "react-bootstrap";
import Link from "next/link";

const index = ({ deputado}) => {
  const [busca, setBusca] = useState('')
  const deputadosFiltrados = deputado.filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <Pagina titulo='Projeto Api Deputados' value={busca} onChange={(ev) => setBusca(ev.target.value)}/>
      <Container>
        <Row md={6}>
          {deputadosFiltrados.map(item => (
            <Link key={item.id} href={'/detalhes/' + item.id}><Card.Img  title={item.nome} variant="top" src={item.urlFoto}></Card.Img></Link>
          ))}
        </Row>
      </Container>
    </>
  )
}
export async function getServerSideProps(context) {
  const deputados = await ApiDeputados.get('/deputados')
  const deputado = deputados.data.dados

  
  return {
    props: { deputado}, // will be passed to the page component as props
  }
}

export default index