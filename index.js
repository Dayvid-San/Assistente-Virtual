const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const output = document.querySelector('#output');
const [nameBot, nameUser] = ['panda', 'Dayvid'];

const langConfig = {
    language: ['en-EN', 'pt-PT']
};

function takeCommand (event, command, message, callback) {
    
    const commandPT = {
        0: () => message,
        1: () => `Olá, ${nameUser}!`,
        2: () => `Estou testando o meu reconhecimento de voz.\n \nVeja só, funciona!`,
    };
    
    const commandEN = {
        0: () => message,
        1: () => `hey ${nameBot}`,
        2: () => `${nameBot} take a break`,
    };
    callback()
    return commandPT[command]()
    //return event.lang == 'pt-PT' ? commandPT[command]() : event.lang == 'en-EN' ? commandEN[command]() : console.error('Not language config');

};

function scoreComamandsWords(command) {
    return command == `${nameBot}` ? 1 : `${nameBot} desligar` ? 2 : 0
};

const filterMessage = (message) => message.charAt(0).toUpperCase() + string.slice(1);

function startRecognition() {
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = langConfig.language[1];
    recognition.continuous = true;
    recognition.start();

    recognition.onresult = function (event) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                const content = event.results[i][0].transcript.trim();

                output.textContent = takeCommand(recognition, scoreComamandsWords(content), content, () => {
                    console.log('Read'),
                    console.log(event),
                    console.log(recognition)
                })
                
                stopBtn.addEventListener('click', () => recognition.stop());
                
            };
        };
    };
};


startRecognition()
startBtn.addEventListener('click', () => start());