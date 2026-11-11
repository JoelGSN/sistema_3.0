import bd_produto from '../models/bd_produto.js'
import xlsx from 'xlsx';
import Produto from '../models/bd_produto.js'; // Ajuste o caminho do seu Model do Sequelize



export async function listarproduto() {
    return await bd_produto.findAll({ order: [['id', 'ASC']] })

}

export async function buscarcPornome(nome_produto/*nmproduto*/) {
    return await bd_produto.findOne({
        where: { nome_produto }
    })

}

export async function cadastrarproduto(dados) {
    const { nome_produto, tipo, cor, quantidade, preco } = dados
    return await bd_produto.create({ nome_produto, tipo, cor, quantidade, preco })

}

export async function removerproduto(nmproduto) {
    const produtoec = await buscarcPornome(nmproduto)
    if (produtoec) {
        produtoec.destroy()
        return produtoec
    }

    return null

}

export async function atualizarproduto(nmproduto, dados) {
    const { nome_produto, tipo, cor, quantidade, preco } = dados

    const produtoec = await buscarcPornome(nmproduto)
    if (produtoec) {
        produtoec.update({ nome_produto, tipo, cor, quantidade, preco })
        return produtoec
    }

}

export async function venderproduto(nmproduto, qtdvendida) {
    const produtovar = await buscarcPornome(nmproduto)
    const novaqtd = nmproduto.quantidade - qtdvendida
    await produtovar.update({ quantidade: novaqtd })
    return produtovar
}


export async function comprarproduto(nmproduto, qtdcomprada) {
    const produtovar = await buscarcPornome(nmproduto)
    const novaqtd = nmproduto.quantidade + qtdcomprada
    await produtovar.update({ quantidade: novaqtd })

    return produtovar
}


//add depois


export const importarPlanilhaService = async (caminhoArquivo) => {
    // 1. Lê a planilha usando a biblioteca xlsx
    const workbook = xlsx.readFile(caminhoArquivo);
    const sheetName = workbook.SheetNames[0];
    const dadosPlanilha = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    let contador = 0;

    // 2. Percorre as linhas e insere no banco via Sequelize
    for (let item of dadosPlanilha) {
        await Produto.create({
            nome_produto: item.Nome || item.nome_produto || item.nome,
            tipo: item.Tipo || item.tipo,
            cor: item.Cor || item.cor,
            preco: item.Preco || item.preco,
            quantidade: item.Quantidade || item.quantidade
        });
        contador++;
    }

    return { total: contador };
};
