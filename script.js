document.addEventListener("DOMContentLoaded", function() {
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const retryButton = document.getElementById('retryButton');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const guessList = document.getElementById('guessList');

    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 5;
    let guesses = [];

    function resetGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 5;
        guesses = [];
        message.textContent = '';
        attemptsDisplay.textContent = '';
        guessList.innerHTML = '';
        guessInput.value = '';
        guessInput.disabled = false;
        guessButton.disabled = false;
        retryButton.classList.add('hidden');
        guessButton.classList.remove('hidden');
    }

    guessButton.addEventListener('click', function() {
        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            message.textContent = "Veuillez entrer un nombre valide entre 1 et 100.";
            message.classList.remove("text-green-500", "text-red-500");
            message.classList.add("text-yellow-500");
            return;
        }

        attempts--;
        guesses.push(userGuess);

        const guessItem = document.createElement('li');
        guessItem.textContent = `Nombre entré : ${userGuess}`;
        guessList.appendChild(guessItem);

        if (userGuess === randomNumber) {
            message.textContent = "Félicitations ! Vous avez deviné le bon nombre !";
            message.classList.remove("text-yellow-500", "text-red-500");
            message.classList.add("text-green-500");
            guessButton.disabled = true;
            guessInput.disabled = true;
            retryButton.classList.remove('hidden');
            guessButton.classList.add('hidden');
        } else if (userGuess < randomNumber) {
            message.textContent = "Le nombre est plus grand.";
            message.classList.remove("text-green-500", "text-yellow-500");
            message.classList.add("text-red-500");
        } else {
            message.textContent = "Le nombre est plus petit.";
            message.classList.remove("text-green-500", "text-yellow-500");
            message.classList.add("text-red-500");
        }

        attemptsDisplay.textContent = `Il vous reste ${attempts} tentatives.`;

        if (attempts === 0 && userGuess !== randomNumber) {
            message.textContent = `Désolé, vous avez épuisé vos tentatives. Le nombre était ${randomNumber}.`;
            message.classList.remove("text-green-500", "text-yellow-500");
            message.classList.add("text-red-500");
            guessButton.disabled = true;
            guessInput.disabled = true;
            retryButton.classList.remove('hidden');
            guessButton.classList.add('hidden');
        }

        guessInput.value = '';
    });

    retryButton.addEventListener('click', resetGame);
});
