import express from 'express'
import cliente_routes from './routes/cliente_routes.js'
import produto_routes from './routes/produto_routes.js'
import venda_routes from './routes/venda_routes.js'
import sequelize from './config/database.js'
import './models/bd_cliente.js'
import './models/bd_produto.js'
import './models/bd_venda.js'
import cors from 'cors'
import fs from 'fs';
import path from 'path';
const porta = 3000
const UMA_HORA = 60 * 60 * 1000;


const app = express()


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200)
//   }
//   next()
// })

app.use(cors())
app.use(express.json())

app.use('/cliente', cliente_routes)
app.use('/produto', produto_routes)
app.use('/venda', venda_routes)

// try {
//   await sequelize.authenticate()
//   await sequelize.sync()
//   app.listen(3000, () => console.log('\x1b[1;4;36m', 'Server inicializado na porta 3000.'))
// } catch (erro) {
//   console.error('Falha ao Iniciar:', erro)
//   process.exit(1)
// }


try {
  await sequelize.authenticate()
  await sequelize.sync()
  app.listen(3000, () => {
    console.log('\x1b[36m%s\x1b[0m', '==========================================================')
    console.log('\x1b[33m', '                            (\\____/)')
    console.log('\x1b[33m', '                            (=^__^=) ')
    console.log('\x1b[33m', `                  (3 Server Online na porta ${porta} Ɛ)           `)
    console.log('\x1b[33m', "                          (''')____(''')")
    console.log('\x1b[36m%s\x1b[0m', '==========================================================')
  })
} catch (erro) {
  console.error('Falha ao Iniciar:', erro)
  process.exit(1)
}



const limparArquivosAntigos = () => {
    const pastaUploads = path.resolve('uploads');

    // Se a pasta não existir, não faz nada
    if (!fs.existsSync(pastaUploads)) return;

    fs.readdir(pastaUploads, (err, arquivos) => {
        if (err) {
            console.error('Erro ao ler a pasta de uploads:', err);
            return;
        }

        arquivos.forEach(arquivo => {
            // Ignora o arquivo .gitkeep se você o usar para manter a pasta no Git
            if (arquivo === '.gitkeep') return;

            const caminhoArquivo = path.join(pastaUploads, arquivo);

            fs.stat(caminhoArquivo, (err, stats) => {
                if (err) return;

                const agora = new Date().getTime();
                const tempoModificacao = new Date(stats.mtime).getTime();
                const horasPassadas = (agora - tempoModificacao) / (1000 * 60 * 60);

                // Se o arquivo tiver mais de 24 horas, apaga!
                if (horasPassadas > 10) {
                    fs.unlink(caminhoArquivo, (err) => {
                        if (!err) {
                            console.log(`[Faxina] Arquivo temporário antigo removido: ${arquivo}`);
                        }
                    });
                }
            });
        });
    });
};

// Configura o Node para rodar essa limpeza a cada 24 horas (em milissegundos)
setInterval(limparArquivosAntigos, UMA_HORA / 60);
