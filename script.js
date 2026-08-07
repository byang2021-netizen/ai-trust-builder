const startBtn = document.getElementById("startBtn");

const landing = document.getElementById("landing");

const accordion = document.querySelector(".accordion-section");

const app = document.getElementById("app");


let currentScenario = 0;

let trustScore = 0;
const maxTrust = scenarios.reduce((total, scenario) => {

    return total +

        Math.max(...scenario.choices.map(choice => choice.trust));

}, 0);

let exploredChoices = [];





startBtn.addEventListener("click", function(){

    landing.style.display = "none";

    accordion.style.display = "none";

    loadScenario();

});







function loadScenario(){


    exploredChoices = [];


    const scenario = scenarios[currentScenario];


    app.innerHTML = `


    <section class="simulation-card">



        <div class="journey-header">


            <div class="journey-title">

                AI Trust Journey

            </div>



            <div class="journey-progress">

                ${generateJourneyDots()}

            </div>



            <div class="scenario-stage">

                ${scenario.theme.icon}

                ${scenario.theme.stage}

            </div>


        </div>





        <h2>

            ${scenario.title}

        </h2>





        <div class="faculty-card">


            <div class="faculty-name">

                👩‍🏫 ${scenario.faculty.name}

            </div>


            <div class="faculty-role">

                ${scenario.faculty.role}

            </div>



            <p>

                "${scenario.message}"

            </p>


        </div>





        <h3 class="response-title">

            🤝 Explore Your Responses

        </h3>





        <div class="choices">


            ${scenario.choices.map((choice,index)=>`


                <button

                    class="choice"

                    id="choice-${index}"

                    onclick="selectChoice(${index})">


                    ${choice.text}


                </button>


            `).join("")}


        </div>





        <div id="feedback"></div>



    </section>


    `;


}








function generateJourneyDots(){


    return scenarios.map((scenario,index)=>{


        if(index < currentScenario){


            return `

            <span class="journey-dot completed">

                ✓

            </span>

            `;


        }


        else if(index === currentScenario){


            return `

            <span class="journey-dot active">

                ${index + 1}

            </span>

            `;


        }


        else{


            return `

            <span class="journey-dot">

                ${index + 1}

            </span>

            `;


        }


    }).join("");

}









function selectChoice(choiceIndex){



    const scenario = scenarios[currentScenario];


    const choice = scenario.choices[choiceIndex];


    const selectedButton =
    document.getElementById(`choice-${choiceIndex}`);





    selectedButton.classList.add("selected");





    if(!exploredChoices.includes(choiceIndex)){



        exploredChoices.push(choiceIndex);



        // Add both positive and negative values

        trustScore += choice.trust;



        // Trust cannot go below zero

        if(trustScore < 0){

            trustScore = 0;

        }



        updateTrustMeter();


    }




    selectedButton.innerHTML =

    "✓ Explored: " + choice.text;




    showFeedback(choice);



}









function showFeedback(choice){



    const feedback =
    document.getElementById("feedback");



    feedback.innerHTML = `



    <div class="feedback-card">


        <h3>

            ${choice.feedbackTitle}

        </h3>



        <p>

            ${choice.feedback}

        </p>




        <div class="trust-change">


            ${
                choice.trust >= 0

                ?

                "Trust Building: +" + choice.trust

                :

                "Trust Decrease: " + choice.trust

            }


        </div>




        <button

            class="continue-btn"

            onclick="nextScenario()">


            Continue to Next Scenario


        </button>



    </div>



    `;



}









function updateTrustMeter(){



    const status =
    document.getElementById("trustStatus");


    const fill =
    document.getElementById("trustFill");




    if(trustScore < 0){

        trustScore = 0;

    }



    if(trustScore > maxTrust){

        trustScore = maxTrust;

    }





    let label = "";





    if(trustScore < 10){


        label = "🌱 Starting";


    }

    else if(trustScore < 25){


        label = "🌿 Building Rapport";


    }

    else if(trustScore < 35){


        label = "🤝 Collaborative Partner";


    }

    else{


        label = "⭐ Trusted Partner";


    }





    status.textContent = label;



    fill.style.width =

    (trustScore / maxTrust * 100) + "%";



}









function nextScenario(){



    currentScenario++;



    if(currentScenario < scenarios.length){


        loadScenario();


    }

    else{


        showCompletion();


    }



}









function showCompletion(){



    app.innerHTML = `



    <section class="simulation-card completion-card">


        <h2>

            🎉 Simulation Complete

        </h2>



        <p>

            You explored different approaches to building trust with faculty.

        </p>




        <h3>

            Your Trust-Building Result

        </h3>



        <p>

            ${document.getElementById("trustStatus").textContent}

        </p>



        <button class="replay-btn"

        onclick="restartSimulation()">

        Replay

        </button>



    </section>



    `;


}









function restartSimulation(){



    currentScenario = 0;


    trustScore = 0;


    exploredChoices = [];


    updateTrustMeter();


    loadScenario();


}