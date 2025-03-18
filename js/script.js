// To-do list variables
const taskBoard = document.querySelector(".task-board");
const taskList = document.createElement("ul");
taskBoard.appendChild(taskList);
const addTaskBtn = document.querySelector(".btn-add-task");
let list_index=0;
// End of to-d- list variables

// Timer variables
let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const timerDisplay = document.querySelector(".count");
const startTimerBtn = document.querySelector(".btn-start-timer");
const stopTimerBtn = document.querySelector(".btn-stop-timer");
const resetTimerBtn = document.querySelector(".btn-restart-timer");
const soundTimerEnd = new Audio("sounds/alarm-clock.mp3")
// End of timer variables

//Quote Variables
const quoteDisplay = document.querySelector(".quote");
const generateQuoteBtn = document.querySelector(".btn-generate");
// End of quote variables

//Calendar Variables
const displayHolidaysBtn = document.querySelector(".btn-display-holidays");
const displayHol = document.querySelector(".display-holidays");
// An object with the supported countrys of naget API which
// match the country (user input) with the corresponding country code.
const countryCodes = {
    "Albania": "AL",
    "Andorra": "AD",
    "Argentina": "AR",
    "Armenia": "AM",
    "Australia": "AU",
    "Austria": "AT",
    "Bahamas": "BS",
    "Barbados": "BB",
    "Belarus": "BY",
    "Belgium": "BE",
    "Belize": "BZ",
    "Benin": "BJ",
    "Bolivia": "BO",
    "Bosnia and Herzegovina": "BA",
    "Botswana": "BW",
    "Brazil": "BR",
    "Bulgaria": "BG",
    "Canada": "CA",
    "Chile": "CL",
    "China": "CN",
    "Colombia": "CO",
    "Costa Rica": "CR",
    "Croatia": "HR",
    "Cuba": "CU",
    "Cyprus": "CY",
    "Czechia": "CZ",
    "Denmark": "DK",
    "Dominican Republic": "DO",
    "Ecuador": "EC",
    "Egypt": "EG",
    "El Salvador": "SV",
    "Estonia": "EE",
    "Faroe Islands": "FO",
    "Finland": "FI",
    "France": "FR",
    "Georgia": "GE",
    "Germany": "DE",
    "Greece": "GR",
    "Greenland": "GL",
    "Guatemala": "GT",
    "Honduras": "HN",
    "Hong Kong": "HK",
    "Hungary": "HU",
    "Iceland": "IS",
    "India": "IN",
    "Indonesia": "ID",
    "Ireland": "IE",
    "Isle of Man": "IM",
    "Israel": "IL",
    "Italy": "IT",
    "Jamaica": "JM",
    "Japan": "JP",
    "Kazakhstan": "KZ",
    "Kenya": "KE",
    "Kuwait": "KW",
    "Latvia": "LV",
    "Lesotho": "LS",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Macedonia": "MK",
    "Madagascar": "MG",
    "Malawi": "MW",
    "Malaysia": "MY",
    "Malta": "MT",
    "Mexico": "MX",
    "Moldova": "MD",
    "Mongolia": "MN",
    "Montenegro": "ME",
    "Namibia": "NA",
    "Netherlands": "NL",
    "New Zealand": "NZ",
    "Nicaragua": "NI",
    "Nigeria": "NG",
    "Norway": "NO",
    "Panama": "PA",
    "Paraguay": "PY",
    "Peru": "PE",
    "Philippines": "PH",
    "Poland": "PL",
    "Portugal": "PT",
    "Puerto Rico": "PR",
    "Romania": "RO",
    "Russia": "RU",
    "Saint Kitts and Nevis": "KN",
    "San Marino": "SM",
    "Saudi Arabia": "SA",
    "Serbia": "RS",
    "Singapore": "SG",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "South Africa": "ZA",
    "South Korea": "KR",
    "Spain": "ES",
    "Suriname": "SR",
    "Sweden": "SE",
    "Switzerland": "CH",
    "Taiwan": "TW",
    "Tanzania": "TZ",
    "Thailand": "TH",
    "Trinidad and Tobago": "TT",
    "Turkey": "TR",
    "Ukraine": "UA",
    "United Arab Emirates": "AE",
    "United Kingdom": "GB",
    "United States": "US",
    "Uruguay": "UY",
    "Venezuela": "VE",
    "Vietnam": "VN",
    "Zambia": "ZM",
    "Zimbabwe": "ZW"
};
// End of holiday tracker variables

document.addEventListener("DOMContentLoaded", loadTasks);


// Event listener to add a task when the button clicks. Saves
// the task to the local storage through the saveTask function.
addTaskBtn.addEventListener("click", function(e){
   
   const addTaskText = document.getElementById("task").value;

   if (addTaskText === "") return; // Prevent adding empty tasks
    
    saveTask(addTaskText, false);
    document.getElementById("task").value = ""; // Clear input

})

// Function to save task to localStorage
function saveTask(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = {text: taskText, completed: completed }; 
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Function to load the tasks on the UI
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    // For each task creates a checkbox, a list element and
    // a label which is the text of the task, the user typed.
    // Creates a button so the user can delete the task.
    tasks.forEach((task, index) => {
        const list = document.createElement("li");
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.completed;
        checkBox.dataset.index = index;
        
        checkBox.addEventListener("change", function () {
            updateTaskStatus(index, checkBox.checked);
            label.style.textDecoration = checkBox.checked ? "line-through" : "none";
        });

        const label = document.createElement("label");
        label.innerText = task.text;
        label.style.wordBreak = "break-all";

        if(task.completed){
            label.style.textDecoration = "line-through"
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.style.borderRadius = "20px"
        deleteBtn.style.background = "transparent";
        deleteBtn.addEventListener("click", function () {
            removeTask(index);
        });



        list.appendChild(checkBox);
        list.appendChild(label);
        list.appendChild(deleteBtn);
        taskList.appendChild(list);
    });
}


// Function to update task status in localStorage
function updateTaskStatus(index, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove a task from the UI(refresh the UI) and localStorage
function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index,1);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated list
    loadTasks(); // Refresh UI
}


// Timer functions

// Update the timer UI
function UpdateDisplayTimer(){

    timerDisplay.innerText = String(minutes).padStart(2,"0") 
    + ":" + String(seconds).padStart(2,"0");
}

//Starts the countdown from 25 minutes to 0
startTimerBtn.addEventListener("click", function(e){
    if (!isRunning){
        isRunning = true;
        timer = setInterval(() => {
            if (seconds === 0){
                if(minutes === 0){
                    clearInterval(timer);
                    isRunning = false;
                    soundTimerEnd.play();
                    return;
                }
                minutes --;
                seconds = 59;
            }
            else{
                seconds--;
            }
            UpdateDisplayTimer();
        },1000)
    }
})

//Stops the timer without reseting the time, and when
// the user clicks the start button, the countdown
// starts from where it left
stopTimerBtn.addEventListener("click",function(e){
    clearInterval(timer);
    isRunning = false;
})

// Resets the timer back to 25 minutes
resetTimerBtn.addEventListener("click",function(e){
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    UpdateDisplayTimer();
})

// Calls the function to update the UI
UpdateDisplayTimer();

// End of timer functions

// Quote function
// Quotable API
generateQuoteBtn.addEventListener("click",function(e){

    fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => (quoteDisplay.innerHTML = "\"" +data.content + "\""
        + "<br> ~ " + data.author
    )); 
})
// End of quote functions

// Holiday tracker functions
// Nager.at API
displayHolidaysBtn.addEventListener("click", function(e){
    const country = document.getElementById("enter-country").value;
    const countryCode = countryCodes[country];
    const year = new Date().getFullYear();

    if(!countryCode){
        alert("This country is not supported, please enter another country");
        return;
    }

    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
    .then((response) => response.json())
    .then((data) => Holidays(data));

    function Holidays(hol){
        displayHol.innerHTML = "";
        if(hol.lenght === 0){
            displayHol.innerHTML = "<li>No holidays found.</li>";
        }

        hol.forEach(hol => {
            const listItem = document.createElement("li");
            listItem.textContent = `${hol.date}: local name: ${hol.localName}, name: ${hol.name}`;
            displayHol.appendChild(listItem);
            listItem.style.marginTop = "10px";
        })
    }
})
// End of holidays tracker functions

