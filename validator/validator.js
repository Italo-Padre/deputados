const validatorForm = {
    comentario: {
        required:'O campo é obrigátorio',
    minLength:{
      value: 3,
      message: 'Minimo 3 caracteres'
    },
      maxLength:{
        value: 80,
        message: 'Maximo 80 caracteres'
      }
    }
   

}
export default validatorForm