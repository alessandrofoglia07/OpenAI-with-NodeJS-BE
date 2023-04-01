import express, {Request, Response} from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 3002;
app.listen(port, () => {console.log(`Server running on port ${port}`)});

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

app.get('/api/completion', async (req: Request, res: Response) => {
    try {
        const prompt : string = req.query.prompt as string;
        console.log(prompt);
        const completion = await openai.createCompletion({
            model: 'gpt-3.5-turbo',
            prompt: prompt,
        });
        res.send(completion.data.choices[0].text);
        console.log('res sent')
    }
    catch (error : any) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
        } else {
            console.log(error.message);
        }
    }
}) 