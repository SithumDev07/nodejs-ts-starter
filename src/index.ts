import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";

const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hello TS"
    })
})

app.post("/post", async (req: Request, res: Response):Promise<Response> => {
    console.log(req.body)
    return res.status(200).send({
        message: "Hey from POST Request"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    })
})

const PORT = 5005;

try {
    app.listen(PORT, (): void => {
        console.log(`Server Connected Successfully on PORT -> ${PORT}`)
    })
} catch (err: any) {
    console.error( `Error occured: ${err.message}`)
}