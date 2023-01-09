import express, {json} from "express"
import cors from "cors"

const users = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    }
]

const tweets = [
    // {
    //     username: "bobesponja",
    //     tweet: "eu amo o hub"
    // }
]

const app = express()

app.use(cors())
app.use(express.json())

app.post("/sign-up", (req, res) => {
    const user = req.body

    if(!user.username || !user.avatar){
        return res.status(401).send("Todos os campos são obrigatórios!")
    }
    users.push(req.body)
    res.status(201).send('OK')

    console.log(users)
})

app.get("/tweets", (req, res) => {
    if(tweets.length === 0){
        return res.send([])
    }
    res.send(users[1])
})

app.post("/tweets", (req, res) => {
    const tweet = req.body
    const { user } = req.headers

    const userIsRegistered = users.find(item => item.username === tweet.username)
    
    if(!userIsRegistered){
        return res.status(401).send("UNAUTHORAZED")
    }

    tweets.push(tweet)
    return res.status(201).send("OK")
})



const PORT = 5000

app.listen(PORT, () => {console.log(`SERVIDOR RODANDO NA PORTA: ${PORT}`)})


// 200: Ok => Significa que deu tudo certo com a requisição
// 201: Created => Sucesso na criação do recurso
// 301: Moved Permanently => Significa que o recurso que você está tentando acessar foi movido pra outra URL
// 401: Unauthorized => Significa que você não tem acesso a esse recurso
// 404: Not Found => Significa que o recurso pedido não existe
// 409: Conflict => Significa que o recurso que você está tentando inserir já foi inserido
// 422: Unprocessable Entity => Significa que a requisição enviada não está no formato esperado
// 500: Internal Server Error => Significa que ocorreu algum erro desconhecido no servidor