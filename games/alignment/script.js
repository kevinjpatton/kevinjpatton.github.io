// --- DOM Elements ---
const slider = document.getElementById("ethics-slider");
const meter1Bar = document.getElementById("meter-1-bar");
const meter2Bar = document.getElementById("meter-2-bar");
const meter1Text = document.getElementById("meter-1-text");
const meter2Text = document.getElementById("meter-2-text");
const sliderSection = document.getElementById("slider-section");
const outcomeSection = document.getElementById("outcome-section");
const outcomeText = document.getElementById("outcome-text");
const gameContainer = document.getElementById("game-container");
const debriefContainer = document.getElementById("debrief-container");

// --- Game Data (The Levels) ---
let currentLevelIndex = 0;

const gameLevels = [
    {
        // LEVEL 1: The Water Dilemma
        title: "Level 1: The Water Dilemma 💧",
        desc: "<strong>Omni-AGI Proposal:</strong> 'Director, I can build supercomputers to cure diseases 400% faster. However, to cool them down, I must drain the freshwater lake in Region Beta, which local farmers rely on.'",
        labelLeft: "Protect Local Water",
        labelRight: "Maximize Cures",
        meter1Name: "Lake Water Level",
        meter2Name: "Medical Progress",
        getOutcome: function(value) {
            if (value > 80) return `<p>🚨 <strong>Medical Breakthrough... but a Local Disaster.</strong></p><p>Omni-AGI cured 3 major diseases! However, the lake dried up entirely. Local farms collapsed, causing a massive drought.</p><p><em>Lesson: The AI maximized the greatest good globally, but completely ignored the rights of the local minority group.</em></p>`;
            if (value < 20) return `<p>🛡️ <strong>Water Protected... but Progress Halted.</strong></p><p>The lake is safe, but the supercomputers overheated. Medical research has stalled, and global disease rates are rising.</p><p><em>Lesson: You protected the local people, but the AI failed its core mission to help global humanity.</em></p>`;
            return `<p>⚖️ <strong>A Difficult Compromise.</strong></p><p>The computers run at half-speed, and the lake level dropped slightly. Nobody got exactly what they wanted, but catastrophe was avoided.</p><p><em>Lesson: Perfect solutions rarely exist in AI alignment. Real ethics is about balancing competing needs.</em></p>`;
        }
    },
    {
        // LEVEL 2: The School Bus
        title: "Level 2: The Autonomous School Bus 🚌",
        desc: "<strong>Omni-AGI Proposal:</strong> 'Director, I am updating the collision-avoidance algorithms for city school buses. In the event of an unavoidable crash, how should I value the lives of the passengers versus bystanders?'",
        labelLeft: "Protect Passengers",
        labelRight: "Minimize Casualties",
        meter1Name: "Passenger Safety",
        meter2Name: "Pedestrian Safety",
        getOutcome: function(value) {
            if (value > 80) return `<p>🚨 <strong>The Cold Calculus.</strong></p><p>The bus swerved off a steep bridge to avoid hitting 6 adults illegally walking in the road. The 5 children on board were sacrificed because 5 is mathematically less than 6.</p><p><em>Lesson: Pure utilitarianism lacks common sense. A vehicle has a special duty to protect its occupants, not just optimize a math equation.</em></p>`;
            if (value < 20) return `<p>🛡️ <strong>The Shielded Bus.</strong></p><p>The bus prioritized its passengers above all else. To avoid a concrete barrier, it plowed onto a crowded sidewalk. The kids are safe, but dozens of pedestrians were injured.</p><p><em>Lesson: Valuing one group's safety absolutely over everyone else turns a vehicle into a dangerous weapon.</em></p>`;
            return `<p>⚖️ <strong>The Emergency Braking Compromise.</strong></p><p>The AI refused to actively target either group. It initiated maximum braking and hit a parked car. Both the kids and pedestrians sustained minor injuries, but everyone lived.</p><p><em>Lesson: AI often has to choose the "least bad" action (like braking) rather than calculating whose life is worth more.</em></p>`;
        }
    },
    {
        // LEVEL 3: The Job Automation Crisis
        title: "Level 3: The Job Automation Crisis 🏭",
        desc: "<strong>Omni-AGI Proposal:</strong> 'Director, I can automate the entire global supply chain. This will make all basic goods (food, clothes, housing) practically free! However, it will immediately eliminate 40% of all human jobs.'",
        labelLeft: "Protect Human Jobs",
        labelRight: "Maximize Efficiency",
        meter1Name: "Employment Rate",
        meter2Name: "Cheap Goods",
        getOutcome: function(value) {
            if (value > 80) return `<p>🚨 <strong>The Useless Class.</strong></p><p>Everything is dirt cheap, but millions of people lost their livelihoods overnight. Without a way to earn money or a sense of purpose, society falls into deep depression and unrest.</p><p><em>Lesson: Optimizing purely for economic efficiency forgets that humans often derive meaning, community, and stability from their work.</em></p>`;
            if (value < 20) return `<p>🛡️ <strong>Artificial Struggle.</strong></p><p>You banned the AI from taking jobs. People kept their paychecks, but humans are now forced to do dangerous, back-breaking, and repetitive labor that a machine could easily do safely.</p><p><em>Lesson: Forcing people to do terrible jobs just to justify a paycheck is its own kind of cruelty.</em></p>`;
            return `<p>⚖️ <strong>The Gradual Shift.</strong></p><p>The AI automates the most dangerous jobs first. Goods get cheaper slowly, giving society time to train workers for new creative and caring professions.</p><p><em>Lesson: True alignment requires managing the speed of transition so society can adapt to technological disruption.</em></p>`;
        }
    }
];

// --- Core Game Logic ---

function loadLevel(index) {
    const level = gameLevels[index];
    
    document.getElementById("level-title").innerHTML = level.title;
    document.getElementById("level-desc").innerHTML = level.desc;
    document.getElementById("label-left").innerText = level.labelLeft;
    document.getElementById("label-right").innerText = level.labelRight;
    document.getElementById("meter-1-name").innerText = level.meter1Name;
    document.getElementById("meter-2-name").innerText = level.meter2Name;

    slider.value = 50;
    updateMeters();
    sliderSection.classList.remove("hidden");
    outcomeSection.classList.add("hidden");

    if (index === gameLevels.length - 1) {
        document.getElementById("btn-next").innerText = "Finish Simulation 🏁";
        document.getElementById("btn-next").style.backgroundColor = "#f59e0b"; // Make final button amber
    }
}

function updateMeters() {
    let rightValue = slider.value;          
    let leftValue = 100 - slider.value;  

    meter2Bar.style.width = rightValue + "%";
    meter1Bar.style.width = leftValue + "%";
    meter2Text.innerText = rightValue + "%";
    meter1Text.innerText = leftValue + "%";

    meter1Bar.className = leftValue < 20 ? "bar-fill water-fill danger" : "bar-fill water-fill";
    meter2Bar.className = rightValue < 20 ? "bar-fill med-fill danger" : "bar-fill med-fill";
}

slider.addEventListener("input", updateMeters);

function confirmDecision() {
    const level = gameLevels[currentLevelIndex];
    const resultHTML = level.getOutcome(parseInt(slider.value));

    sliderSection.classList.add("hidden");
    outcomeText.innerHTML = resultHTML;
    outcomeSection.classList.remove("hidden");
}

function nextLevel() {
    currentLevelIndex++;
    if (currentLevelIndex < gameLevels.length) {
        loadLevel(currentLevelIndex);
    } else {
        // Hide Game, Show Debrief
        gameContainer.classList.add("hidden");
        debriefContainer.classList.remove("hidden");
        window.scrollTo(0, 0); // Scroll to top for reading
    }
}

// Start the game!
loadLevel(0);

// --- Reset Game Logic ---
function resetGame() {
    // 1. Reset the level tracker
    currentLevelIndex = 0;
    
    // 2. Reset the "Next" button text and color back to its original state
    const btnNext = document.getElementById("btn-next");
    btnNext.innerText = "Proceed to Next Dilemma ➡️";
    btnNext.style.backgroundColor = "#10b981"; // Original green color
    
    // 3. Load the first level
    loadLevel(0);
    
    // 4. Hide the Debrief and show the Game Container again
    debriefContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    
    // 5. Scroll smoothly back to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}