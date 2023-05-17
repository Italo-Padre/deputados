import ApiDeputados from "@/services/ApiDeputados";
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagina from "@/Componentes/Pagina";
import { Card, Container, Row } from "react-bootstrap";
import Link from "next/link";

const index = ({ deputado}) => {
 
  return (
    <>
      <Pagina titulo='Projeto Api Deputados' />
      <Container>
        <Row md={6}>
          {deputado.map(item => (
            <Link href={'/detalhes/' + item.id}><Card.Img key={item.id} title={item.nome} variant="top" src={item.urlFoto}></Card.Img></Link>
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