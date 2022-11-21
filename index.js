const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const output = document.querySelector('#output');
const [nameBot, nameUser] = ['James', 'Dayvid'];

const miniConfig = {
    lang: ['en-PT', 'pt-PT']
};
const commandEnglie = {
    takeRest: `${nameBot} take a break`,
    activeBot: `hey ${nameBot}`,
};
function takeCommandPT (command) {
    
    const commandPT = {
        0: () => output.textContent = command,
        1: () => output.textContent = `Olá, ${nameUser}!`,
    };

    return commandPT[command]?.() ?? console.log(command);

};

function scoreComamandsWords(command) {
    return command == `olá ${nameBot}` ? 1 : 0
};

function start() {
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = miniConfig.lang[1];
    recognition.continuous = true;
    recognition.start();

    recognition.onresult = function (event) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                const content = event.results[i][0].transcript.trim();

                takeCommandPT(
                    scoreComamandsWords(content)
                );
                
                
                stopBtn.addEventListener('click', () => recognition.stop());
            };
        };
    };
};


start()
startBtn.addEventListener('click', () => start());