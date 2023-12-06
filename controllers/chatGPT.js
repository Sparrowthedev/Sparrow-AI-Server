const  OpenAIApi  = require("openai");
require('dotenv').config();

const openai = new OpenAIApi({
    apiKey: process.env.apiKey,
});

const chatGptClone = async (req, res) =>{
    try {
        const prompt = req.body.prompt
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
            // max_tokens: 4000,
            // n: 1,
            // temperature: 0,
            // top_p: 0.7,
            // frequency_penalty: 0.5,
            // presence_penalty: 0,
        });

        const data = completion.choices[0]
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Oops!! something went wrong"
        })
        console.log(error.message)
    }
}

const imageGeneration = async (req, res) => {
    const prompt = req.body.prompt
    try {
        const generateImage = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        })

        const data = generateImage.data[0].url
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Oopps something went wrong"
        })
        console.log(error)
    }
}

module.exports ={
    chatGptClone,
    imageGeneration
}