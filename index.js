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
        choresList.innerHTML += `<li><button>${chores[i]}</button></li>`
    }
    
    console.log(chores);

}
addNewChore(chores);
