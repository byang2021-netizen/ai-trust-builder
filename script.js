
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


// Track explored answers separately for each scenario.
// This prevents the same answer from adding trust again
// when the learner returns to a scenario.

let exploredChoicesByScenario = scenarios.map(() => []);


// Start the simulation

startBtn.addEventListener("click", function() {

    landing.style.display = "none";

    if (accordion) {
        accordion.style.display = "none";
    }

    app.style.display = "block";

    currentScenario = 0;

    loadScenario();

});


// Load the selected scenario

function loadScenario() {

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

            ${scenario.choices.map((choice, index) => `

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


// Create clickable scenario navigation

function generateJourneyDots() {

    return scenarios.map((scenario, index) => {

        const isCurrent = index === currentScenario;

        const isCompleted = index < currentScenario;

        const className =

            isCurrent

                ? "journey-dot active"

                : isCompleted

                    ? "journey-dot completed"

                    : "journey-dot";


        const label = isCompleted ? "✓" : index + 1;

        return `

            <button

                type="button"

                class="${className}"

                onclick="navigateToScenario(${index})"

                aria-label="Go to scenario ${index + 1}"

                aria-current="${isCurrent ? "step" : "false"}">

                ${label}

            </button>

        `;

    }).join("");

}


// Navigate directly to any scenario

function navigateToScenario(scenarioIndex) {

    if (

        scenarioIndex < 0 ||

        scenarioIndex >= scenarios.length

    ) {

        return;

    }


    currentScenario = scenarioIndex;

    loadScenario();

}


// Select an answer

function selectChoice(choiceIndex) {

    const scenario = scenarios[currentScenario];

    const choice = scenario.choices[choiceIndex];

    const selectedButton =

        document.getElementById(`choice-${choiceIndex}`);


    selectedButton.classList.add("selected");


    const exploredChoices =

        exploredChoicesByScenario[currentScenario];


    // Only add trust the first time this answer is selected

    if (!exploredChoices.includes(choiceIndex)) {

        exploredChoices.push(choiceIndex);

        trustScore += choice.trust;

        updateTrustMeter();

    }


    selectedButton.innerHTML =

        "✓ Explored: " + choice.text;


    showFeedback(choice);

}


// Show coaching feedback

function showFeedback(choice) {

    const feedback = document.getElementById("feedback");

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

                    ? "Trust Building: +" + choice.trust

                    : "Trust Decrease: " + choice.trust

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


// Update the Trust Meter

function updateTrustMeter() {

    const status = document.getElementById("trustStatus");

    const fill = document.getElementById("trustFill");

    const score = document.getElementById("trustScore");


    if (trustScore < 0) {

        trustScore = 0;

    }

    if (trustScore > maxTrust) {

        trustScore = maxTrust;

    }


    let label = "";


    if (trustScore < 10) {

        label = "🌱 Starting";

    }

    else if (trustScore < 25) {

        label = "🌿 Building Rapport";

    }

    else if (trustScore < 35) {

        label = "🤝 Collaborative Partner";

    }

    else {

        label = "⭐ Trusted Partner";

    }


    status.textContent = label;

    score.textContent = trustScore;


    fill.style.width =

        (trustScore / maxTrust * 100) + "%";

}


// Continue to the next scenario

function nextScenario() {

    if (currentScenario < scenarios.length - 1) {

        currentScenario++;

        loadScenario();

    }

    else {

        showCompletion();

    }

}


// Completion page

function showCompletion() {

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

        <button

            class="replay-btn"

            onclick="restartSimulation()">

            Replay

        </button>

    </section>

    `;

}


// Restart the simulation

function restartSimulation() {

    currentScenario = 0;

    trustScore = 0;

    exploredChoicesByScenario = scenarios.map(() => []);

    updateTrustMeter();

    loadScenario();

}
