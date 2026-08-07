/* =========================================================
   AI TRUST BUILDER
   v0.6 Visual Refresh
   ========================================================= */


const startBtn = document.getElementById("startBtn");

const landing = document.getElementById("landing");

const app = document.getElementById("app");

const trustMeter = document.getElementById("trustMeter");

const trustStatus = document.getElementById("trustStatus");

const trustFill = document.getElementById("trustFill");

const trustScoreDisplay =
    document.getElementById("trustScore");

const maxTrustDisplay =
    document.getElementById("maxTrustDisplay");


let currentScenario = 0;

let trustScore = 0;

let exploredChoices = [];



/* =========================================================
   MAXIMUM POSSIBLE TRUST
   ========================================================= */

const maxTrust = scenarios.reduce(

    (total, scenario) => {

        const bestChoice =
            Math.max(
                ...scenario.choices.map(
                    choice => choice.trust
                )
            );

        return total + Math.max(bestChoice, 0);

    },

    0

);


maxTrustDisplay.textContent = maxTrust;


/* =========================================================
   START SIMULATION
   ========================================================= */

startBtn.addEventListener(

    "click",

    function(){

        landing.style.display = "none";

        app.style.display = "block";

        trustMeter.style.display = "block";

        currentScenario = 0;

        trustScore = 0;

        exploredChoices = [];

        updateTrustMeter();

        loadScenario();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

);


/* =========================================================
   LOAD SCENARIO
   ========================================================= */

function loadScenario(){

    exploredChoices = [];

    const scenario =
        scenarios[currentScenario];


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
                    ${scenario.message}
                </p>


            </div>


            <h3 class="response-title">
                How would you respond?
            </h3>


            <div class="choices">


                ${scenario.choices.map(

                    (choice, index) => `

                        <button
                            class="choice"
                            id="choice-${index}"
                            data-letter="${String.fromCharCode(65 + index)}"
                            onclick="selectChoice(${index})">

                            ${choice.text}

                        </button>

                    `

                ).join("")}


            </div>


            <div id="feedback"></div>


        </section>

    `;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   JOURNEY INDICATOR
   ========================================================= */

function generateJourneyDots(){

    return scenarios.map(

        (scenario, index) => {

            if(index < currentScenario){

                return `

                    <span class="journey-dot completed">
                        ✓
                    </span>

                `;

            }


            if(index === currentScenario){

                return `

                    <span class="journey-dot active">
                        ${index + 1}
                    </span>

                `;

            }


            return `

                <span class="journey-dot">
                    ${index + 1}
                </span>

            `;

        }

    ).join("");

}


/* =========================================================
   SELECT RESPONSE
   ========================================================= */

function selectChoice(choiceIndex){

    const scenario =
        scenarios[currentScenario];

    const choice =
        scenario.choices[choiceIndex];

    const selectedButton =
        document.getElementById(
            `choice-${choiceIndex}`
        );


    selectedButton.classList.add("selected");


    /*
       Each response can affect trust only once.
       Learners can still revisit any response
       to read its feedback again.
    */

    if(!exploredChoices.includes(choiceIndex)){

        exploredChoices.push(choiceIndex);

        trustScore += choice.trust;


        /*
           Trust cannot fall below zero.
        */

        if(trustScore < 0){

            trustScore = 0;

        }


        /*
           Trust cannot exceed the maximum
           possible score.
        */

        if(trustScore > maxTrust){

            trustScore = maxTrust;

        }


        updateTrustMeter();

    }


    selectedButton.classList.add("explored");

    selectedButton.innerHTML =
        "✓ " + choice.text;


    showFeedback(choice);

}


/* =========================================================
   FEEDBACK
   ========================================================= */

function showFeedback(choice){

    const feedback =
        document.getElementById("feedback");


    const impactText =
        choice.trust >= 0

            ? `Trust Building: +${choice.trust}`

            : `Trust Decrease: ${choice.trust}`;


    feedback.innerHTML = `

        <div class="feedback-card">


            <h3>
                💡 Coaching Insight
            </h3>


            <p>
                ${choice.feedback}
            </p>


            <div class="trust-change">
                ${impactText}
            </div>


            <button
                class="continue-btn"
                onclick="nextScenario()">

                ${
                    currentScenario <
                    scenarios.length - 1

                        ? "Continue to Next Scenario →"

                        : "Complete Simulation →"
                }

            </button>


        </div>

    `;


    feedback.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/* =========================================================
   UPDATE TRUST METER
   ========================================================= */

function updateTrustMeter(){

    if(trustScore < 0){

        trustScore = 0;

    }


    if(trustScore > maxTrust){

        trustScore = maxTrust;

    }


    let label;


    if(trustScore === 0){

        label = "🌱 Starting";

    }

    else if(
        trustScore <
        maxTrust * 0.5
    ){

        label = "🌿 Building Rapport";

    }

    else if(
        trustScore <
        maxTrust * 0.85
    ){

        label = "🤝 Collaborative Partner";

    }

    else{

        label = "⭐ Trusted Partner";

    }


    trustStatus.textContent = label;

    trustScoreDisplay.textContent =
        trustScore;


    const percentage =
        maxTrust === 0

            ? 0

            : (trustScore / maxTrust) * 100;


    trustFill.style.width =
        percentage + "%";

}


/* =========================================================
   NEXT SCENARIO
   ========================================================= */

function nextScenario(){

    currentScenario++;


    if(
        currentScenario <
        scenarios.length
    ){

        loadScenario();

    }

    else{

        showCompletion();

    }

}


/* =========================================================
   COMPLETION
   ========================================================= */

function showCompletion(){

    let result;


    if(
        trustScore >=
        maxTrust * 0.85
    ){

        result = "⭐ Trusted Partner";

    }

    else if(
        trustScore >=
        maxTrust * 0.5
    ){

        result = "🤝 Collaborative Partner";

    }

    else if(trustScore > 0){

        result = "🌿 Building Rapport";

    }

    else{

        result = "🌱 Starting Point";

    }


    app.innerHTML = `

        <section class="simulation-card completion-card">


            <div class="completion-icon">
                ✦
            </div>


            <h2>
                Simulation Complete
            </h2>


            <p>

                You explored different approaches
                to building trust with faculty.

            </p>


            <h3>
                Your Trust-Building Result
            </h3>


            <p>

                <strong>
                    ${result}
                </strong>

            </p>


            <button
                class="replay-btn"
                onclick="restartSimulation()">

                ↻ &nbsp; Replay

            </button>


        </section>

    `;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   RESTART
   ========================================================= */

function restartSimulation(){

    currentScenario = 0;

    trustScore = 0;

    exploredChoices = [];


    updateTrustMeter();

    loadScenario();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}