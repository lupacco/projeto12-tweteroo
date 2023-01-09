import express, {json} from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())


const users = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    },
    {
        username: "eaibebe",
        avatar: "https://series.band.uol.com.br/wp-content/uploads/2014/05/queixo-rubro-300x300-1.jpg"
    }
]

const tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    },
    {
        username: "eaibebe",
        tweet: "eu amo o bebeeeeeee"
    }
    ,
    {
        username: "eaibebe",
        tweet: "eu amo o bebeeeeeee3"
    }
    ,
    {
        username: "eaibebe",
        tweet: "eu amo o bebeeeeeee4"
    }
    // ,
    // {
    //     username: "eaibebe",
    //     tweet: "eu amo o bebeeeeeee5"
    // }
    // ,
    // {
    //     username: "eaibebe",
    //     tweet: "eu amo o bebeeeeeee6"
    // }
    // ,
    // {
    //     username: "eaibebe",
    //     tweet: "eu amo o bebeeeeeee7"
    // }
    // ,
    // {
    //     username: "eaibebe",
    //     tweet: "eu amo o bebeeeeeee8"
    // },
    // {
    //     username: "eaibebe",
    //     tweet: "eu amo o bebeeeeeee9"
    // },
    // {
    //     username: "eaibebe",
    //     tweet: "eu amo o bebeeeeeee10"
    // },
    // {
    //     username: "eaibebe",
    //     tweet: "eu amo o bebeeeeeee11"
    // }
]

function getLastTweets(arr, quantity){
    let lastTweets = arr.reverse()
    lastTweets = lastTweets.slice(0, 10)

    return lastTweets
}

function addAvatarToTweets(tweets){
    if(!tweets) return []

    const tweetsWithAvatar = []

    tweets.forEach(item => {
        const userAvatar = users.find(user => user.username === item.username)
        tweetsWithAvatar.push({
            username: item.username,
            avatar: userAvatar.avatar,
            tweet: item.tweet
        })
    })
    
    return tweetsWithAvatar
}

app.post("/sign-up", (req, res) => {
    const user = req.body

    if(!user.username || !user.avatar) return res.status(400).send("Todos os campos são obrigatórios!")


    if(typeof(user.username) !== "string" || typeof(user.avatar) !== "string") return res.sendStatus(400)

    users.push(req.body)
    res.status(201).send('OK')

    console.log(users)
})

app.get("/tweets", (req, res) => {
    if(tweets.length > 10){
        const lastTweets = getLastTweets(tweets, 10)
        const tweetsWithAvatar = addAvatarToTweets(lastTweets)
        console.log(tweetsWithAvatar)
        return res.send(tweetsWithAvatar)
    }
    res.send(addAvatarToTweets(tweets.reverse()))
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

app.listen(PORT, () => {console.log(`RUNNING ON PORT: ${PORT}`)})


// 200: Ok => Significa que deu tudo certo com a requisição
// 201: Created => Sucesso na criação do recurso
// 301: Moved Permanently => Significa que o recurso que você está tentando acessar foi movido pra outra URL
// 401: Unauthorized => Significa que você não tem acesso a esse recurso
// 404: Not Found => Significa que o recurso pedido não existe
// 409: Conflict => Significa que o recurso que você está tentando inserir já foi inserido
// 422: Unprocessable Entity => Significa que a requisição enviada não está no formato esperado
// 500: Internal Server Error => Significa que ocorreu algum erro desconhecido no servidor