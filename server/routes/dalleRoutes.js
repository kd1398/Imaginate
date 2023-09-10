import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

router.route('/').get((req, res) => {
    res.send("Hello from Dall - E!");
});

router.route('/').post(async (req, res) => {
    try{
        const { prompt } = req.body; 
        console.log(prompt)
        const aiResponse = await openai.images.generate({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        console.log(aiResponse.data);
        // const image = aiResponse.data;

        // res.status(200).json({ photo: image });
    }catch(error){
        console.log(error)
        res.status(500).send(error?.response.data.error.message);
    }
});

export default router;