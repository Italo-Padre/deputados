import Apideputados from '@/services/ApiDeputados'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, SSRProvider, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginaDetalhes from '@/Componentes/PaginaDetalhes';
import ApiDeputados from '@/services/ApiDeputados';

const index = ({ deputadosTodos }) => {

  function recarregarAPagina() {
    window.location.reload();
  }

  const names = []
  const depAleatorios = []
  for (let i = 0; i < 10; i++) {
    names.push(Math.floor(Math.random() * deputadosTodos.length))
    depAleatorios.push(deputadosTodos[Math.floor(Math.random() * deputadosTodos.length)])
  }


  let indiceEscolhido = Math.floor(Math.random() * depAleatorios.length)
  const escolhido = depAleatorios[indiceEscolhido]
  console.log(depAleatorios, indiceEscolhido, escolhido);

  //console.log(escolhido, escolhido.nome, escolhido.urlFoto);

  const questions = []
  const answerOption = []

  depAleatorios.map(item => {
    const correct = item.id == escolhido.id
    answerOption.push({ answerText: item.nome, isCorrect: correct },)
  })

  console.log(answerOption);

  depAleatorios.map(item => {
    const obj = {
      questionText:
        <Card style={{ width: '19rem', margin: 'auto' }}>
          <Card.Img key={item.id} variant="top" title={escolhido.nome} src={escolhido.urlFoto} />
        </Card>,
      answerOption: answerOption,
    }
    questions.push(obj)
  })


  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }

  // resultado aleatório
  //names.map(item => {

  // console.log(item, deputadosTodos[item].nome);
  //})
  
  return (
    
    <>
      <PaginaDetalhes titulo='Quiz'>
            {showScore ? (
                <Card className='text-center'>
                 <Card.Body>
                <Card.Header>Gotou do nosso questionario? Tente Novamente</Card.Header>
                  <h2>Sua Pontuação foi</h2> {score} de {questions.length}<br></br>
                <Button onClick={recarregarAPagina}>Tentar Novamente</Button>
                  </Card.Body>
                </Card>
              
            ) : (
                  <Row>
              <Card className='text-center'>
                 <Card.Body>
                <Card.Header>Tente advinhar o nome de cada deputado</Card.Header>
                  <span><h2>Questão</h2> {currentQuestion + 1}</span> de {questions.length}
                  <h2>Você pontuou</h2> {score} de {questions.length}
                  </Card.Body>
                </Card>
              
                <Col md={6}>
                  {questions[currentQuestion].questionText}
                </Col>
                <Col md={6}>
                  {questions[currentQuestion].answerOption.map((answerOption, index) => (
                    <Button className='m-1' variant="danger" onClick={() => handleAnswer(answerOption.isCorrect)}>
                      {answerOption.answerText}
                    </Button>
                  ))}
                </Col>
              
                  </Row>
      )}
      </PaginaDetalhes>
    </>
  )
}

export default index
export async function getServerSideProps(context) {

  const res = await ApiDeputados.get('/deputados')
  const deputadosTodos = res.data.dados


  return {
    props: { deputadosTodos }, // will be passed to the page component as props
  }
}