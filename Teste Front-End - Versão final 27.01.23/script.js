


const url='https://windelweb.windel.com.br:3000/teste-front'
async function pegarDados(){
    const resposta= await fetch(url)
    const data= await resposta.json()
    console.log('data:'+data)
    // alert('Importando')
    return data
}

async function importar(){

    let arrayProdutos=[]

    let dados= await pegarDados()

    for(let elemento of dados) {
        let index= dados.indexOf(elemento)
        let id= elemento.id
        let createdAt= elemento.createdAt
        let nome= elemento.nome
        let valorVenda= parseInt(elemento.valorVenda,10)
        let referencia= elemento.referencia
        let unidade= elemento.unidade
        let fabricante= elemento.fabricante
        let estoque= elemento.estoque
        let imagem= elemento.imagem
        
        console.log(`Index: ${index}, ID: ${id}, createdAt: ${createdAt}, nome:${nome}, valorVenda:${valorVenda}, referencia:${referencia}, unidade:${unidade}, fabricante:${fabricante}, estoque:${estoque}, imagem:${imagem}`
        )

        let produtoCadastrado={
            "index": index,
            "id": id,
            "nome": nome ,
            "createdAt":createdAt,
            "valorVenda":valorVenda,
            "referencia":referencia,
            "unidade":unidade,
            "fabricante":fabricante,
            "estoque":estoque,
            "imagem":imagem
        }

        arrayProdutos.push(produtoCadastrado)
        idBotao=id

        console.log('Criando os divs')

        if (dados.lenght!=arrayProdutos.length){
            console.log('sla')
        }else{
            console.log('foi todos')
        }

        function criaDiv(){
    
            //Criar div principal do produto
            let div= document.querySelector('.produtosCadastrados')
            let divNova= document.createElement('div')
            divNova.value=idBotao
            divNova.className='produto'
            div.appendChild(divNova)

            //Criar div para a imagem
            // document.querySelector('.produto')
            let divImagem=document.createElement('div')
            divImagem.id='infoImagem'
            divImagem.value=idBotao
            divNova.appendChild(divImagem)
            // divImagem.innerHTML=produtoCadastrado.imagem
        
            //Nome
            // document.querySelector('.produto')
            let divNome=document.createElement('div')
            divNome.id='infoNomeProduto'
            divNome.value=index
            divNome.class='infoNomeProduto'+id
            divNova.appendChild(divNome)
            divNome.innerHTML=produtoCadastrado.nome
            // divNome.title=produtoCadastrado.nome

            //Referencia
            // document.querySelector('.produto')
            let divReferencia=document.createElement('div')
            divReferencia.id='infoReferencia'
            divReferencia.value=idBotao
            divNova.appendChild(divReferencia)
            divReferencia.innerHTML=produtoCadastrado.referencia
            
            //Valor de venda
            // document.querySelector('.produto')
            let divVlrVenda=document.createElement('div')
            divVlrVenda.id="infoVlrVenda"
            divVlrVenda.value=idBotao
            divNova.appendChild(divVlrVenda)
            let valorVenda= produtoCadastrado.valorVenda
            divVlrVenda.innerHTML='R$'+valorVenda.toFixed(2)
        
            //Fabricante
            // document.querySelector('.produto')
            let divFabricante=document.createElement('div')
            divFabricante.id='infoFabricante'
            divFabricante.value=idBotao
            divNova.appendChild(divFabricante)
            divFabricante.innerHTML=produtoCadastrado.fabricante
        
            //Estoque
            // document.querySelector('.produto')
            let divEstoque=document.createElement('div')
            divEstoque.id='infoEstoque'
            divEstoque.value=idBotao
            divNova.appendChild(divEstoque)
            divEstoque.innerHTML=produtoCadastrado.estoque

            // Delete
            let divDelete=document.createElement('div')
            divDelete.id='infoDelete'
            divNova.appendChild(divDelete)
            let buttonDelete= document.createElement('button')
            buttonDelete.class='buttonDelete'
            buttonDelete.onclick=deletar
            buttonDelete.id=idBotao
            buttonDelete.value=index
            buttonDelete.innerHTML='<i class="fa-solid fa-trash"></i>'
            // let textNode= document.createTextNode('x')
            // buttonDelete.appendChild(textNode)
            divDelete.appendChild(buttonDelete)
        }
        criaDiv()
    }
    return dados
}

importar()
async function array(){
    arrayProdutos= await importar
    console.log(arrayProdutos)
    return arrayProdutos    
}
array()

function salvar(){

    let nome= document.querySelector('#nome').value
    let valorVenda= parseFloat(document.querySelector('#vlrVenda').value)
    let referencia= document.querySelector('#referencia').value
    let unidade= document.querySelector('#unidade').value
    let fabricante= document.querySelector('#fabricante').value
    let estoque= parseInt((document.querySelector('#estoque').value),10)
    let imagem= document.querySelector('#imagem').value
    
    if (nome=='', valorVenda=='', unidade==''){
        alert('Verifique as informações de cadastro')
    }else{

    const produtoNovo={
        nome: nome ,
        valorVenda:valorVenda,
        referencia: referencia,
        unidadeMedida: unidade,
        fabricante:fabricante,
        estoque:estoque,
        imagemProduto:imagem
    }
    
    console.log(produtoNovo)

    async function enviar(){
        console.log('chegou no enviar')
        const novoEnviado= produtoNovo
        const options={
            method: 'POST',
            body: JSON.stringify(novoEnviado),
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        console.log('Enviando os produto novo:'+options)
        try{
        fetch(url, options).then(response=>{
            console.log(response)
        })
        alert('Produto cadastrado')
        }
        catch(error){
            console.error(error)
            alert("Ocorreu um erro, tente novamente: "+error)
        };
        
        
        recarregar()
    }

    enviar()
    }
}

function deletar(botao){
    let idDelete= botao.target.id
    
    console.log('delete:' +idDelete)
    if (idDelete==''){
        idDelete='?'
        alert(`ID do produto não encontrado, tente novamente ID: ${idDelete}`)
    }else{
        const nomeClass= botao.target.value
        console.log(nomeClass)
        async function enviarDelete(){
            urlDelete= url+'/'+idDelete
            options={
                method: "DELETE"
            }
            fetch(urlDelete, options).then((response)=>console.log(response))
            
            console.log(novoProduto)
        }
        enviarDelete()
    alert(`Produto ${idDelete} deletado`)
    recarregar()
     }
}

function limpaCampo(){

    let nome= document.querySelector('#nome')
    let valorVenda= document.querySelector('#vlrVenda')
    let referencia= document.querySelector('#referencia')
    let unidade= document.querySelector('#unidade')
    let fabricante= document.querySelector('#fabricante')
    let estoque= document.querySelector('#estoque')
    let imagem= document.querySelector('#imagem')

    nome.value=''
    valorVenda.value=''
    referencia.value=''
    unidade.value=''
    fabricante.value=''
    estoque.value=''
    imagem.value=''
}

function recarregar(){
    location.reload()
}


