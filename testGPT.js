import OpenAI from 'openai'
const openai = new OpenAI({
    apiKey: '',
});

const getRes = async () => {
    const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: '',
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    })
    console.log(res.choices[0].message.content);

}

getRes();
