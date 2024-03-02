const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: '',
    dangerouslyAllowBrowser: true
});

const choreForm = document.getElementById('choreForm');
const choresList = document.getElementById('choresList');
let chores = ["Sweep the floor", "Wash the Dishes", "Take out the trash", "Cook breakfast", "Cook lunch", "Cook dinner", "Vacuum the floor", "Mop the floor"];


choreForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const chore = document.getElementById('customChore').value;

    chores.push(chore);
    addNewChore(chores);
    choreForm.reset();
    
})
const addNewChore = (chores) => {
    choresList.innerHTML = "";
    for (let i = 0; i < chores.length; i++)
    {
        choresList.innerHTML += `<li><button class="popup">${chores[i]}</button></li>`
    }
    const listItems = document.getElementsByClassName('popup');
    for (let i = 0; i < listItems.length; i++)
    {
        listItems[i].addEventListener('click', () => {
            listItems[i].innerHTML += '<div class="spinwheel"></div>'
            showPopup(listItems[i]);
            
        })
    }

    console.log(chores);

}
addNewChore(chores);


const showPopup = async (choreItem) => {

    const message = await getRes(choreItem.textContent);
    console.log(message);
    choreItem.innerHTML = choreItem.innerHTML.replace('<div class="spinwheel"></div>', '');

}
const getRes = async (chore) => {
    const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `Give me a fun way to ${chore}`,
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    })

    return res.choices[0].message.content;

}
