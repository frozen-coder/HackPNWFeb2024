const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: '',
    dangerouslyAllowBrowser: true
});


const counter = document.querySelector('.counter');
const btn = document.querySelector('.buttons');
const secondsInput = document.getElementById('seconds');
const title = document.querySelector('.title');
title.innerHTML += (localStorage.getItem('chore') || "Activity");



var seconds;
var minuts;
var remseconds;
var toCount;

function subm(){
    display("submit", "start");
    seconds = Number(secondsInput.value);
	seconds = seconds*60;

    secondsInput.style.display = "none";
    counting();
}

function display(first, second){
	document.getElementById(first).style.display = "none";
	document.getElementById(second).style.display = "block";
}

function check(stat){
	toCount = stat.value;
	if(stat.id == "start"){
		display("start", "stop");
	}
	else if(stat.id == "stop"){
		display("stop", "continue");
	}
	else{
		display('continue', "stop");
	}
}

function count(){
	if(seconds > 0){
       if(toCount == true){
            seconds--;
            remseconds = seconds % 60;
            minuts = Math.floor(seconds / 60);

            if(remseconds < 10){
       	        remseconds = "0" + remseconds;
            }

            if(minuts < 10){
       	        minuts = "0" + minuts;
            }

            counter.innerHTML = minuts + " : " + remseconds;
       }
	}
	else{
		counter.innerHTML = "Done!";
		btn.style.opacity = '0';
	}
}

function counting(){
	remseconds = seconds % 60;
minuts = Math.floor(seconds / 60);

if(remseconds < 10){
    remseconds = "0" + remseconds;
}

if(minuts < 10){
    minuts = "0" + minuts;
}

counter.innerHTML = minuts + " : " + remseconds;
   setInterval(count, 1000);
}

const start = document.getElementById('start');
const stop = document.getElementById('stop');
const cont = document.getElementById('continue');
const submit = document.getElementById('submit');
stop.addEventListener('click', () => {
	check(stop);
})
cont.addEventListener('click', () => {
	check(cont);
})
start.addEventListener('click', () => {
	check(start);
})
submit.addEventListener('click', () =>{
	subm()
})


const rec = document.getElementById('rec');
rec.innerHTML += `${localStorage.getItem('rec')}`;
const recTime = document.getElementById('recTime');
recTime.innerHTML += `${localStorage.getItem('recTime')}`;
const changeRec = (way) => {
	rec.innerHTML = '';
	rec.innerHTML += `Make it fun! ${way}`;
}

const getDiff = async () => {
    const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'Give a list of fun ways to mop in a JSON array',
            },
        ],
        temperature: 0.8,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    })
    
    const processed = JSON.parse(res.choices[0].message.content);
    
    const key = Object.keys(processed)[0];
    
	return processed[key];

}


const more = document.getElementById('more');
let ways = []
let curr = 1;
more.addEventListener('click', async () => {
	if (ways.length == 0)
	{
		ways = await getDiff();
		console.log(ways)
	}
	
		
	localStorage.setItem('rec', ways[curr]);
	curr++;
	if (curr == ways.length)
	{
		curr = 0;
	}	
	
	changeRec(ways[curr]);
})
