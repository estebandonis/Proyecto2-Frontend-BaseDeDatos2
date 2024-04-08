const user = store => {
    store.on('@init', () => ({ user: { correo: '', nombre: '', apellido: '', edad: 0, pais: '', genero: '', preferencias: [] } }))
    store.on('user/login', (state, newUser) => {
      return { user: { correo: newUser.correo, nombre: newUser.nombre, apellido: newUser.apellido, edad: newUser.edad, pais: newUser.pais, genero: newUser.genero, preferencias: newUser.preferencias } }
    })
    store.on('user/logout', (state) => ({ user: { correo: '', nombre: '', apellido: '', edad: 0, pais: '', genero: '', preferencias: [] } }))
  }
  
  export default user