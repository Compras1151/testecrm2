//function mostrarToast(mensagem, tipo = "erro") {

//    const container = document.getElementById('toast-container');

 //   const toast = document.createElement('div');

//    toast.className = `toast ${tipo}`;
//    toast.innerText = mensagem;

//    container.appendChild(toast);

//    setTimeout(() => {
//        toast.remove();
//    }, 3000);

// }

//   document.addEventListener('DOMContentLoaded', () => {

  //  let usuarios = JSON.parse(localStorage.getItem('usuariosCRM'));

    // Cria usuário admin caso não exista nenhum
  //  if (!usuarios || usuarios.length === 0) {

     // usuarios = [];

      //  localStorage.setItem(
     //       'usuariosCRM',
       //     JSON.stringify(usuarios)
   //     );
//    }

 //   const btnEntrar = document.getElementById('btnEntrar');

 //   btnEntrar.addEventListener('click', () => {

   //     const nome = document.getElementById('usuario').value.trim();
    //    const senha = document.getElementById('senha').value.trim();

    //    if (!nome || !senha) {
      //      mostrarToast("Preencha usuário e senha!");
      //      return;
   //     }

    //    const usuario = usuarios.find(u =>
        //    u.nome.toLowerCase() === nome.toLowerCase() &&
       //     u.senha === senha
  //      );

 //       console.log("Digitado:", nome, senha);
  //      console.log("Usuários:", usuarios);
  //      console.log("Encontrado:", usuario);

    //   if (!usuario) {
      //      mostrarToast("Usuário ou senha inválidos!");
   //         return;
   //     }

    //    localStorage.setItem(
    //        'usuarioLogado',
       //     JSON.stringify(usuario)
     //   );

       // mostrarToast("Login realizado com sucesso!", "sucesso");

    //    setTimeout(() => {
     //       window.location.href = 'index.html';
       // }, 1000);
 //   });

//});
