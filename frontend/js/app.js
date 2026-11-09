const nomec = document.getElementById("js_nomec")
const cpf = document.getElementById("js_cpf")
const rua = document.getElementById("js_rua")
const numero = document.getElementById("js_numero")
const uf = document.getElementById("js_uf")
const clientes = JSON.parse(localStorage.getItem("clientes")) || []
const dadoscl = document.getElementById("lista-cliente")
//\\
//\\
const nomep = document.getElementById("js_nomep")
const tipo = document.getElementById("js_tipo")
const cor = document.getElementById("js_cor")
const preco = document.getElementById("js_preco")
const quantidade = document.getElementById("js_quantidade")
const produtos = JSON.parse(localStorage.getItem("produtos")) || []
const dadospd = document.getElementById("lista-produto")
//\\
//\\
const nmcv = document.getElementById("nomecv")
const qtdcv = document.getElementById("quantidadecv")
//\\
//\\
const campo = document.getElementById('js_filtro');
const dadosrl = document.getElementById("listar")
const dadosts = document.getElementById("teste")
//\\
//\\
const vendas = JSON.parse(localStorage.getItem("vendas")) || []
const nomev = document.getElementById("nomecv")
const quantidadev = document.getElementById("quantidadecv")

buscar_cliente()
buscar_produto()
buscar_venda();

//ABA DE RELATÓRIOS INICIO
//PARTE DOS BOTÕES INICIO
let nomeRelatorio = "";
function cadcl() {
    campo.value = "cadcl";
    nomeRelatorio = "De Cadastro de Clientes";
    relatorio();
}
function cadp() {
    campo.value = "cadp";
    nomeRelatorio = "De Cadastro de Produtos";
    relatorio();
}
function comp() {
    campo.value = "compra";
    nomeRelatorio = "De Compras";
    relatorio();
}
function vend() {
    campo.value = "venda";
    nomeRelatorio = "De Vendas Executadas";
    relatorio();
}
//PARTE DOS BOTÕES FIM
//PARTE DO INNER INICIO
function relatorio() {
    if (campo.value === "cadcl") {
        let i = 1
        function listarcli() {
            // dadosrl.innerHTML = 'Relatório de Cadastro de Clientes'
            dadosrl.innerHTML = `<span style="color: red;"> => <span style="color: black; font-size: 1.8rem;"> Relatório ${nomeRelatorio} <span style="color: red;"> <= <span style="color: black;">`;
            for (let cliente of clientes) {
                dadosrl.innerHTML += `<p><br>${i++}º <span style="color: red;"> => <span style="color: black;"> Nome do Cliente: ${cliente.nome}   ||   CPF: ${cliente.cpfoucnpj}<span style="color: red;"> <= <span style="color: black;"></p>`
            }
        }
        listarcli()
    } else {
        if (campo.value === "cadp") {
            let i = 1
            let total_estoque = 0
            function listarpdi() {
                // dadosrl.innerHTML = 'Relatório de Cadastro de Produtos'
                dadosrl.innerHTML = `<span style="color: red;"> => <span style="color: black; font-size: 1.8rem;">Relatório ${nomeRelatorio}<span style="color: red;"> <= <span style="color: black;">`;
                for (let produto of produtos) {
                    let totale = produto.preco * produto.quantidade
                    total_estoque += totale
                    dadosrl.innerHTML += `<p><br>${i++}º <span style="color: red;"> => <span style="color: black;"> Nome do Produto: ${produto.nome_produto}   ||   Quantidade: ${produto.quantidade}  || Valor Produto: ${produto.preco} || Total em Estoque: R$${(produto.quantidade * produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span style="color: red;"> <= <span style="color: black;"></p>`
                }
                dadosrl.innerHTML += `<br><hr><p><strong> <span style="color: blue;"> => <span style="color: black;">Valor Total Do Estoque: R$ ${total_estoque.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="color: Blue;"> <= <span style="color: black;"> </strong></p>`;

            }
            listarpdi()
        } else {
            if (campo.value === "venda") {
                let i = 1
                let somatorio = 0;
                let somaestoque = 0
                function listarvd() {
                    // dadosrl.innerHTML = 'Relatório de Vendas'
                    dadosrl.innerHTML = `<span style="color: red;"> => <span style="color: black; font-size: 1.8rem;">Relatório ${nomeRelatorio}<span style="color: red;"> <= <span style="color: black;">`;
                    for (let venda of vendas) {
                        let total = venda.quantidade_vendida * venda.preco;
                        let totalqtd = venda.quantidade_vendida;
                        somatorio += total;
                        somaestoque += totalqtd
                        dadosrl.innerHTML += `<p><br>${i++}º <span style="color: red;"> => <span style="color: black;"> Nome do Produto: ${venda.nome_produto}  ||  Quantidade: ${venda.quantidade_vendida}  ||  Preço: ${venda.preco} || Total Vendido: R$ ${venda.quantidade_vendida * venda.preco} <span style="color: red;"> <= <span style="color: black;"> </p>`
                    }
                    dadosrl.innerHTML += `<br><hr><p><strong> <span style="color: blue;"> => <span style="color: black;">Valor Total Geral de Vendas: R$ ${somatorio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="color: Blue;"> <= <span style="color: black;"> </strong></p>`;
                    dadosrl.innerHTML += `<br><hr><p><strong> <span style="color: blue;"> => <span style="color: black;">Quantidade Total Vendida: ${somaestoque} <span style="color: Blue;"> <= <span style="color: black;"> </strong></p>`;
                }
                listarvd()
            } else {
                dadosrl.innerHTML = '<p>Selecione uma opção nos botões acima</p>';
            }
        }
    }
}
//PARTE DO INNER FIM
//ABA DE RELATÓRIOS FIM
//ABA DE CLIENTES INICIO
async function cli() {
    if (nomec.value.trim() && cpf.value.trim() && rua.value.trim() && numero.value.trim() && uf.value.trim) {
        if (/^[A-Za-zÁ-ý\s]+$/.test(nomec.value)) {
            if (/^\d{11}$/.test(cpf.value) || /^\d{14}$/.test(cpf.value) || /^\d{18}$/.test(cpf.value)) {
                let existe = false
                for (let cliente of clientes) {
                    if (cliente.cpf == cpf.value)
                        existe = true
                }
                if (!existe) {
                    const cliente = {
                        nome: nomec.value,
                        cpfoucnpj: cpf.value,
                        rua: rua.value,
                        numero: numero.value,
                        uf: uf.value
                    }
                    clientes.push(cliente)

                    await fetch('http://localhost:3000/cliente', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(cliente)
                    })

                    localStorage.setItem("clientes", JSON.stringify(clientes))

                    alert("Cadastro Efetuado com Sucesso!!")
                } else alert("Cliente já foi cadastrado!")
            } else alert("deve conter apenas 11 digitos caso for CPF ou 14 digitos caso for CNPJ")
        } else alert("Nome so Aceita Letras , acentos e Espaço!")
    } else alert("Preencha todos os campos!")
    listar()
}
// function listarcl() {
//     dadoscl.innerHTML = '<== Cadastrados ==>'
//     for (let cliente of clientes) {
//         dadoscl.innerHTML += `<p>Nome: ${cliente.nome} || CPF: ${cliente.cpf}</p>`
//     }
// }
//ABA DE CLIENTES FIM
//ABA DE PRODUTOS INICIO
async function pro() {
    // console.log("testando")
    if (nomep.value.trim() &&
        tipo.value.trim() &&
        cor.value.trim() &&
        preco.value.trim() &&
        quantidade.value.trim()) {
        if (preco.value > 0) {
            if (quantidade.value >= 0) {
                let existe = false
                for (let p of produtos) {
                    if (p.nome_produto == nomep.value)
                        existe = true
                }
                if (!existe) {
                    const produto = {
                        nome_produto: nomep.value,
                        tipo: tipo.value,
                        cor: cor.value,
                        preco: preco.value,
                        quantidade: quantidade.value
                    }
                    produtos.push(produto)

                    await fetch('http://localhost:3000/produto', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(produto)
                    })

                    localStorage.setItem("produtos", JSON.stringify(produtos))
                    alert("Produto Cadastrado com sucesso!")
                } else alert("Produto ja Cadastrado!")
            } else alert("Quantidade não pode ser negativa")
        } else alert("Valor não pode ser 0 ou negativo")
    } else alert("Preencha todos os campos do produto")
    // listar()
}

//Movimentação Clientes inicio
function buscliente() {
    let existe = false
    let cliente = null
    for (let c of clientes) {
        if (c.cpfoucnpj == cpf.value) {
            cliente = c
            existe = true
            break;
        }
    }
    if (existe) {
        alert("Cliente " + cliente.nome + " Localizado")
        nomec.value = cliente.nome
        cpf.value = cliente.cpf
        rua.value = cliente.rua
        numero.value = cliente.numero
        uf.value = cliente.uf
    } else alert("Cliente Não encontrado")
}
function alterarcl() {
    let existe = false;
    for (let cliente of clientes) {
        if (cliente.cpfoucnpj === cpf.value) {
            existe = true
            cliente.nome = nomec.value
            cliente.rua = rua.value
            cliente.numero = numero.value
            cliente.uf = uf.value
            break;
        }
    }
    localStorage.setItem("clientes", JSON.stringify(clientes))
    alert("Alteração do Cliente " + nomec.value + " Efetuada Com Sucesso!!!")

}
function clidelete() {
    let ind = clientes.findIndex(cliente => cliente.cpfoucnpj === cpf.value);
    if (ind !== -1) {
        clientes.splice(ind, 1);
        localStorage.setItem("clientes", JSON.stringify(clientes));
        alert("Cliente excluído com sucesso!");
    } else {
        alert("Cliente não encontrado!");
    }
    listar();
}
//Movimentação Clientes fim
//Movimentação Produtos inicio
function comprapd() {
    let existe = false
    let vlrsoma = Number(qtdcv.value)
    let qtd_novo = 0
    if (vlrsoma > 0) {
        for (let produto of produtos) {
            if (produto.nome_produto === nmcv.value) {
                existe = true
                produto.quantidade = Number(produto.quantidade) + vlrsoma
                qtd_novo = produto.quantidade
                break
            }
        }
        if (existe) {
            localStorage.setItem("produtos", JSON.stringify(produtos))
            // alert("Alterado de "+qtd_antiga+" para "+ idpd.value+" ou "+produto.quantidade);
            alert("Compra Executada!! Novo Estoque: " + qtd_novo)
        } else {
            alert("Produto não encontrado!")
        }
    } else {
        alert("Impossível Comprar Valor negativo!!")
    }
}
function venderpd() {

    let existe = false;
    let vlrsoma = Number(qtdcv.value)
    let qtd_novo = 0;
    if (vlrsoma > 0) {
        for (let produto of produtos) {
            if (produto.nome_produto === nmcv.value) {
                existe = true;
                if (produto.quantidade > vlrsoma) {

                    produto.quantidade = produto.quantidade - vlrsoma
                    qtd_novo = produto.quantidade;
                    break;

                } else {
                    alert("Quantidade Indisponível para venda")
                    return;
                }

                //
            }
        }
        if (existe) {
            const venda = {
                nome: nomev.value,
                quantidade: quantidadev.value
            }

            vendas.push(venda)
            localStorage.setItem("vendas", JSON.stringify(vendas))
            produtos.push(produto)
            localStorage.setItem("produtos", JSON.stringify(produtos));
            // alert("Alterado de "+qtd_antiga+" para "+ idpd.value+" ou "+produto.quantidade);
            alert("Venda Executada!! Novo Estoque: " + qtd_novo);
        } else {
            alert("Produto não encontrado!");
        }

    } else {
        alert("Impossível Vender Valor negativo!")
    }





}
//Movimentação Produtos FIM
//FUNÇÕES GERAIS FIM




async function buscar_cliente() {
    const busca = await fetch('http://localhost:3000/cliente')
    const dados = await busca.json()
    clientes.length = 0
    clientes.push(...dados)
}

async function buscar_venda() {
    const busca = await fetch('http://localhost:3000/venda')
    const dados = await busca.json()
    vendas.length = 0
    vendas.push(...dados)
}




async function encontrar_cliente() {
    // buscar_cliente()
    const c = await clientes.find(item => item.cpfoucnpj === cpf.value)
    console.log(c)
    if (c) {
        nomec.value = c.nome
        cpf.value = c.cpfoucnpj
        rua.value = c.rua
        numero.value = c.numero
        uf.value = c.uf
    }
}
async function editar_cliente() {
    const c = await clientes.find(item => item.cpfoucnpj === cpf.value)
    if (c) {
        let cliente_atualizado = {
            nome: nomec.value ?? c.nome,
            cpfoucnpj: cpf.value ?? c.cpfoucnpj,
            numero: numero.value ?? c.numero,
            rua: rua.value ?? c.rua,
            uf: uf.value ?? c.uf
        }
        let resposta = await fetch(`http://localhost:3000/cliente/${c.cpfoucnpj}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente_atualizado)
        })
    }

}

async function deletar_cliente() {

    const c = await clientes.find(item => item.cpfoucnpj === cpf.value)

    if (c) {

        let resposta = await fetch(`http://localhost:3000/cliente/${c.cpfoucnpj}`, {
            method: "DELETE"

        })
        alert("O Cliente => " + c.nome + " <=foi deletado com sucesso")
    }

}


async function buscar_produto() {
    const busca = await fetch('http://localhost:3000/produto')
    const dados = await busca.json()
    produtos.length = 0
    produtos.push(...dados)
}

async function comp_produto() {
    let vlrsoma = Number(qtdcv.value)

    if (!nmcv.value || nmcv.value.trim() === "") {
        return;
    }

    const pd = await produtos.find(prod => (prod.nome_produto === nmcv.value))

    if (!pd) {
        alert("Produto não encontrado na lista local!");
        return;

    }
    let produto_compra = {
        nome_produto: pd.nome_produto,
        tipo: pd.tipo,
        cor: pd.cor,
        preco: pd.preco,
        quantidade: Number(pd.quantidade) + vlrsoma
    }

    produtos.push(produto_compra)
    localStorage.setItem("produtos", JSON.stringify(produtos));
    let resposta = await fetch(`http://localhost:3000/produto/${pd.nome_produto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto_compra)
    })
    if (resposta.ok) {
        alert(`Compra do produto {[ ${produto_compra.nome_produto} de ${produto_compra.quantidade} un  ]} realizada com Sucesso! `)
        pd.quantidade = produto_compra.quantidade;
    }
}



async function vend_produto() {

    let qtdvenda = Number(qtdcv.value)

    if (!nmcv.value || nmcv.value.trim() === "") {
        return;
    }

    const pd = await produtos.find(prod => (prod.nome_produto === nmcv.value))

    if (!pd && qtdvenda) {
        alert("Produto não encontrado!");
        return;
    }

    if (qtdvenda > Number(pd.quantidade)) {
        alert("Quantidade superior ao estoque")
        return
    }
    let produto_venda = {
        nome_produto: pd.nome_produto,
        tipo: pd.tipo,
        cor: pd.cor,
        preco: pd.preco,
        quantidade: Number(pd.quantidade) - qtdvenda
    }

    let registro_venda = {
        nome_produto: pd.nome_produto,
        tipo: pd.tipo,
        cor: pd.cor,
        preco: pd.preco,
        quantidade_vendida: qtdvenda
    };

    vendas.push(registro_venda)
    localStorage.setItem("vendas", JSON.stringify(vendas))
    produtos.push(produto_venda)
    localStorage.setItem("produtos", JSON.stringify(produtos));

    let resposta = await fetch(`http://localhost:3000/produto/${pd.nome_produto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto_venda)
    })
    alert("Venda de => " + qtdvenda + " <= unidade(s) do produto => " + pd.nome_produto + " <= executada com sucesso, estoque final de => " + (pd.quantidade - qtdvenda))


    let respostaVenda = await fetch('http://localhost:3000/venda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registro_venda)
    });


}
vend_produto()



