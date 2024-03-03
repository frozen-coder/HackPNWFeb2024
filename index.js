const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: '',
    dangerouslyAllowBrowser: true
});

const choreForm = document.getElementById('choreForm');
const choresList = document.getElementById('choresList');
let chores = ["Sweep the floor", "Wash the Dishes", "Cook breakfast"];


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
        choresList.innerHTML += `<div class="taskDiv"><button value=${chores[i]} class="popup">${chores[i]}</button></div><button value=${chores[i]} class="popup"></button>`
    }
    const listItems = document.getElementsByClassName('popup');
    for (let i = 0; i < listItems.length; i++)
    {
        listItems[i].addEventListener('click', () => {
            listItems[i].innerHTML += '<div class="spinwheel"></div>'
            showPopup(listItems[i]);
            
        })
    }

    

}
addNewChore(chores);


const showPopup = async (choreItem) => {

    let message = await getRes(choreItem.value);
    message = JSON.parse(message);
    console.log(message[0]);
    console.log("Recommended time: " + message[1]);
    localStorage.setItem('recTime', message[1]);
    localStorage.setItem('rec', message[0]);
    localStorage.setItem('chore', choreItem.value);

    choreItem.innerHTML = choreItem.innerHTML.replace('<div class="spinwheel"></div>', '');
    window.open("testTimer.html", "_blank")


}
const getRes = async (chore) => {
    const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `Return single layer array with fun way to ${chore} on index 0, recommended amount of time to take on index 1`,
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
