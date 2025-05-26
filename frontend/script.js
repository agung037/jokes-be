const API_BASE_URL = 'http://localhost:3001';

// Get random joke
async function getRandomJoke() {
    showLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/jokes`);
        const data = await response.json();
        
        if (data.question && data.answer) {
            document.getElementById('jokeQuestion').textContent = data.question;
            document.getElementById('jokeAnswer').textContent = data.answer;
            document.getElementById('jokeAnswer').style.display = 'none';
            document.getElementById('showAnswerBtn').style.display = 'block';
        }
    } catch (error) {
        showToast('Gagal mengambil joke: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Show answer
function showAnswer() {
    document.getElementById('jokeAnswer').style.display = 'block';
    document.getElementById('showAnswerBtn').style.display = 'none';
}

// Add new joke
document.getElementById('addJokeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();
    
    if (!question || !answer) {
        showToast('Pertanyaan dan jawaban harus diisi!', 'error');
        return;
    }
    
    showLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/jokes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Joke berhasil ditambahkan!', 'success');
            document.getElementById('addJokeForm').reset();
        } else {
            showToast('Gagal menambahkan joke: ' + data.message, 'error');
        }
    } catch (error) {
        showToast('Gagal menambahkan joke: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
});

// Get joke inspiration from AI
async function getJokeInspiration() {
    const btn = document.getElementById('inspirationBtn');
    const resultsDiv = document.getElementById('inspirationResults');
    
    btn.disabled = true;
    btn.textContent = '🤖 Meminta inspirasi...';
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE_URL}/jokes/inspiration`);
        const data = await response.json();
        
        if (data.success && data.jokes) {
            resultsDiv.innerHTML = '';
            
            data.jokes.forEach((joke, index) => {
                const jokeDiv = document.createElement('div');
                jokeDiv.className = 'inspiration-joke';
                jokeDiv.innerHTML = `
                    <div class="question">${joke.question}</div>
                    <div class="answer">${joke.answer}</div>
                    <button class="add-joke-btn" onclick="addInspirationJoke('${joke.question.replace(/'/g, "\\'")}', '${joke.answer.replace(/'/g, "\\'")}')">
                        ➕ Tambah ke Koleksi
                    </button>
                `;
                resultsDiv.appendChild(jokeDiv);
            });
            
            showToast('Inspirasi joke berhasil didapat!', 'success');
        } else {
            showToast('Gagal mendapat inspirasi: ' + (data.message || 'Unknown error'), 'error');
        }
    } catch (error) {
        showToast('Gagal mendapat inspirasi: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = '💡 Minta Inspirasi AI';
        showLoading(false);
    }
}

// Add inspiration joke to collection
async function addInspirationJoke(question, answer) {
    showLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/jokes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Joke dari AI berhasil ditambahkan!', 'success');
        } else {
            showToast('Gagal menambahkan joke: ' + data.message, 'error');
        }
    } catch (error) {
        showToast('Gagal menambahkan joke: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Get lucky number
async function getLuckyNumber() {
    showLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/lucky-number`);
        const data = await response.json();
        
        if (data.luckyNumber) {
            // Animate the number change
            animateNumber(data.luckyNumber);
        }
    } catch (error) {
        showToast('Gagal mengambil lucky number: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Animate number change
function animateNumber(targetNumber) {
    const element = document.getElementById('luckyNumber');
    let currentNumber = 0;
    const increment = Math.ceil(targetNumber / 20);
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        element.textContent = currentNumber;
    }, 50);
}

// Show loading overlay
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'flex' : 'none';
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize - load a random joke on page load
document.addEventListener('DOMContentLoaded', () => {
    getRandomJoke();
});
