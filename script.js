// Marathi Consonants (व्यंजने)
const marathiConsonants = [
    'क', 'ख', 'ग', 'घ', 'ङ',
    'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण',
    'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म',
    'य', 'र', 'ल', 'व', 'श',
    'ष', 'स', 'ह', 'ळ', 'क्ष',
    'ज्ञ', 'त्र', 'श्र'
];

// Marathi Vowels (स्वर)
const marathiVowels = [
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ',
    'ऋ', 'ए', 'ऐ', 'ओ', 'औ'
];

// Common Marathi Words (सामान्य शब्द)
const commonMarathiWords = [
    'नमस्कार', 'धन्यवाद', 'कृपया', 'माफ करा',
    'होय', 'नाही', 'ठीक आहे', 'समजले',
    'पाणी', 'जेवण', 'झोप', 'उठणे',
    'बसणे', 'चालणे', 'दुखत', 'बरे',
    'मी', 'तू', 'आपण', 'ते', 'ती',
    'आज', 'काल', 'उद्या', 'आता'
];

// Word completion dictionary (basic Marathi words)
const wordDictionary = {
    'न': ['नमस्कार', 'नाही', 'नवीन', 'नदी', 'नगर'],
    'म': ['मी', 'माझे', 'माझा', 'माझी', 'मदत'],
    'प': ['पाणी', 'पुस्तक', 'पैसा', 'पाऊस', 'पक्षी'],
    'ज': ['जेवण', 'जागा', 'जन्म', 'जीवन', 'जवळ'],
    'घ': ['घर', 'घडी', 'घोडा', 'घाट', 'घाण'],
    'द': ['दुखत', 'दिवस', 'देश', 'दार', 'दूर'],
    'ब': ['बसणे', 'बरे', 'बाजार', 'बाग', 'बस'],
    'क': ['कृपया', 'काल', 'काम', 'काळ', 'कळ'],
    'त': ['तू', 'ते', 'ती', 'त्याचे', 'तिचे'],
    'स': ['समजले', 'सांगा', 'सर्व', 'सुंदर', 'सुरू'],
    'ह': ['होय', 'हा', 'ही', 'हे', 'होते'],
    'आ': ['आपण', 'आज', 'आता', 'आणि', 'आले'],
    'व': ['वेळ', 'वाट', 'वाटत', 'वर्ष', 'वाढ'],
    'ल': ['लागत', 'लिहा', 'लोक', 'लहान', 'लांब'],
    'य': ['येथे', 'येत', 'योग्य', 'योग', 'येणे'],
    'र': ['राहत', 'राजा', 'रस्ता', 'रंग', 'रात्र']
};

let currentWord = '';
let suggestions = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    createConsonantTiles();
    createVowelTiles();
    createCommonWordTiles();
    updateDisplay();
});

// Create consonant tiles
function createConsonantTiles() {
    const container = document.getElementById('consonantsContainer');
    
    marathiConsonants.forEach(consonant => {
        const tile = document.createElement('button');
        tile.className = 'consonant-tile';
        tile.textContent = consonant;
        tile.setAttribute('aria-label', `Add consonant ${consonant}`);
        
        tile.addEventListener('click', () => addConsonant(consonant));
        tile.addEventListener('touchstart', handleTouchStart);
        tile.addEventListener('touchend', handleTouchEnd);
        
        container.appendChild(tile);
    });
}

// Create vowel tiles
function createVowelTiles() {
    const container = document.getElementById('vowelsContainer');
    
    marathiVowels.forEach(vowel => {
        const tile = document.createElement('button');
        tile.className = 'vowel-tile';
        tile.textContent = vowel;
        tile.setAttribute('aria-label', `Add vowel ${vowel}`);
        
        tile.addEventListener('click', () => addVowel(vowel));
        tile.addEventListener('touchstart', handleTouchStart);
        tile.addEventListener('touchend', handleTouchEnd);
        
        container.appendChild(tile);
    });
}

// Create common word tiles
function createCommonWordTiles() {
    const container = document.getElementById('commonWordsContainer');
    
    commonMarathiWords.forEach(word => {
        const tile = document.createElement('button');
        tile.className = 'word-tile';
        tile.textContent = word;
        tile.setAttribute('aria-label', `Select word ${word}`);
        
        tile.addEventListener('click', () => selectWord(word));
        tile.addEventListener('touchstart', handleTouchStart);
        tile.addEventListener('touchend', handleTouchEnd);
        
        container.appendChild(tile);
    });
}

// Add consonant to current word
function addConsonant(consonant) {
    currentWord += consonant;
    updateDisplay();
    showSuggestions();
    addVisualFeedback(consonant);
}

// Add vowel to current word
function addVowel(vowel) {
    currentWord += vowel;
    updateDisplay();
    showSuggestions();
    addVisualFeedback(vowel);
}

// Select a complete word
function selectWord(word) {
    currentWord = word;
    updateDisplay();
    hideSuggestions();
    addVisualFeedback(word);
}

// Update the display area
function updateDisplay() {
    const displayElement = document.getElementById('currentWord');
    
    if (currentWord === '') {
        displayElement.innerHTML = '<span class="placeholder">तुमचा संदेश येथे दिसेल...</span>';
    } else {
        displayElement.textContent = currentWord;
    }
}

// Show word suggestions based on current input
function showSuggestions() {
    if (currentWord.length === 0) {
        hideSuggestions();
        return;
    }
    
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';
    
    // Get suggestions from dictionary
    const firstChar = currentWord[0];
    let possibleWords = wordDictionary[firstChar] || [];
    
    // Filter words that start with current input
    possibleWords = possibleWords.filter(word => 
        word.startsWith(currentWord) && word !== currentWord
    );
    
    // Add some generic suggestions
    if (currentWord.length > 1) {
        possibleWords.push('...', '✓');
    }
    
    if (possibleWords.length > 0) {
        document.getElementById('suggestions').style.display = 'block';
        
        possibleWords.forEach(word => {
            const suggestion = document.createElement('span');
            suggestion.className = 'suggestion-item';
            suggestion.textContent = word;
            
            if (word === '...') {
                suggestion.textContent = 'अधिक...';
                suggestion.onclick = () => showMoreSuggestions();
            } else if (word === '✓') {
                suggestion.textContent = 'पूर्ण करा';
                suggestion.onclick = () => completeWord();
            } else {
                suggestion.onclick = () => selectSuggestion(word);
            }
            
            suggestionsList.appendChild(suggestion);
        });
    } else {
        hideSuggestions();
    }
}

// Show more suggestions
function showMoreSuggestions() {
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';
    
    // Show all words that start with the first character
    const firstChar = currentWord[0];
    const possibleWords = wordDictionary[firstChar] || [];
    
    possibleWords.forEach(word => {
        const suggestion = document.createElement('span');
        suggestion.className = 'suggestion-item';
        suggestion.textContent = word;
        suggestion.onclick = () => selectSuggestion(word);
        suggestionsList.appendChild(suggestion);
    });
}

// Select a suggestion
function selectSuggestion(word) {
    currentWord = word;
    updateDisplay();
    hideSuggestions();
}

// Complete the current word (basic completion)
function completeWord() {
    const firstChar = currentWord[0];
    const possibleWords = wordDictionary[firstChar] || [];
    
    // Find the best match
    const bestMatch = possibleWords.find(word => 
        word.startsWith(currentWord) && word !== currentWord
    );
    
    if (bestMatch) {
        currentWord = bestMatch;
        updateDisplay();
        hideSuggestions();
    }
}

// Hide suggestions
function hideSuggestions() {
    document.getElementById('suggestions').style.display = 'none';
}

// Clear the current word
function clearWord() {
    currentWord = '';
    updateDisplay();
    hideSuggestions();
    
    // Visual feedback
    const displayElement = document.getElementById('currentWord');
    displayElement.style.background = '#ffebee';
    setTimeout(() => {
        displayElement.style.background = '#f9f9f9';
    }, 300);
}

// Speak the current word (using browser's speech synthesis)
function speakWord() {
    if (currentWord === '') return;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentWord);
        utterance.lang = 'mr-IN'; // Marathi language
        utterance.rate = 0.8; // Slightly slower for clarity
        speechSynthesis.speak(utterance);
        
        // Visual feedback
        const displayElement = document.getElementById('currentWord');
        displayElement.style.background = '#e8f5e8';
        setTimeout(() => {
            displayElement.style.background = '#f9f9f9';
        }, 1000);
    } else {
        alert('Speech synthesis not supported in this browser');
    }
}

// Add visual feedback when tiles are tapped
function addVisualFeedback(text) {
    // Find the tile that was tapped
    const tiles = document.querySelectorAll('.consonant-tile, .vowel-tile, .word-tile');
    const tappedTile = Array.from(tiles).find(tile => tile.textContent === text);
    
    if (tappedTile) {
        tappedTile.classList.add('tapped');
        setTimeout(() => {
            tappedTile.classList.remove('tapped');
        }, 200);
    }
}

// Touch event handlers for mobile devices
function handleTouchStart(event) {
    event.preventDefault();
    this.style.transform = 'scale(0.95)';
}

function handleTouchEnd(event) {
    event.preventDefault();
    this.style.transform = 'scale(1)';
}

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        clearWord();
    } else if (event.key === 'Enter') {
        speakWord();
    } else if (event.key === 'Backspace') {
        currentWord = currentWord.slice(0, -1);
        updateDisplay();
        showSuggestions();
    }
});

// Add swipe gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Swipe left to clear
    if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
        clearWord();
    }
    // Swipe right to speak
    else if (Math.abs(diffX) > Math.abs(diffY) && diffX < -50) {
        speakWord();
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// Auto-hide suggestions after inactivity
let suggestionTimeout;
function resetSuggestionTimeout() {
    clearTimeout(suggestionTimeout);
    suggestionTimeout = setTimeout(() => {
        if (currentWord.length > 0) {
            hideSuggestions();
        }
    }, 5000); // Hide after 5 seconds of inactivity
}

// Reset timeout when user interacts
document.addEventListener('click', resetSuggestionTimeout);
document.addEventListener('touchstart', resetSuggestionTimeout);
