const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const output = document.querySelector('#output');
const [nameBot, nameUser] = ['James', 'Dayvid']

const miniConfig = {
    lang: ['en-PT', 'pt-PT']
}
const command = {
    takeRest: `${nameBot} take a break`,
    activeBot: `hey ${nameBot}`,
}


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
                
                output.textContent = content;
                stopBtn.addEventListener('click', () => recognition.stop());
            }
        }
    }
}


start()
startBtn.addEventListener('click', () => start());