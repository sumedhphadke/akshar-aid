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

// Categorized Marathi Words
const wordCategories = {
    basicNeeds: [
        // Basic greetings and responses
        'नमस्कार', 'धन्यवाद', 'कृपया', 'माफ करा',
        'होय', 'नाही', 'ठीक आहे', 'समजले',
        
        // Basic needs & physical sensations
        'दुखत', 'वेदना', 'शौचालय', 'पाणी', 'जेवण', 'भुकेले', 'तहान',
        'थंड', 'गरम', 'थकले', 'झोप', 'आराम',
        'श्वास कमी', 'सुन्न', 'खाज', 'चक्कर', 'कमजोर',
        
        // Basic actions and pronouns
        'उठणे', 'बसणे', 'चालणे',
        'मी', 'तू', 'आपण', 'ते', 'ती',
        'आज', 'काल', 'उद्या', 'आता'
    ],
    
    medical: [
        'आयसीयू', 'रुग्णालय', 'डॉक्टर', 'नर्स', 'औषध',
        'सुई', 'नळी', 'ऑक्सिजन', 'श्वासयंत्र',
        'हृदय', 'फुफ्फुसे', 'मूत्रपिंड', 'संसर्ग', 'रक्त'
    ],
    
    emotions: [
        'माहित नाही', 'हरवले', 'गोंधळ', 'भीती', 'घाबरले',
        'चिंतित', 'काळजी', 'दुःखी', 'एकटे'
    ]
};

// Flatten all words for backward compatibility
const commonMarathiWords = [
    ...wordCategories.basicNeeds,
    ...wordCategories.medical,
    ...wordCategories.emotions
];

// Word completion dictionary (basic Marathi words)
const wordDictionary = {
    'न': ['नमस्कार', 'नाही', 'नवीन', 'नगर'],
    'म': ['मी', 'मदत', 'मशीन'],
    'प': ['पाणी', 'पुस्तक', 'पैसा', 'पाऊस', 'पक्षी'],
    'ज': ['जेवण', 'जागा', 'जन्म', 'जीवन', 'जवळ'],
    'घ': ['घर', 'घडी', 'घाबरले'],
    'द': ['दुखत', 'दिवस', 'देश', 'दार', 'दूर', 'दुःखी'],
    'ब': ['बसणे', 'बरे', 'बाजार', 'बाग', 'भुकेले'],
    'क': ['कृपया', 'काल', 'काम', 'काळजी', 'कमजोर'],
    'त': ['तू', 'ते', 'ती', 'तहान', 'थकले', 'थंड'],
    'स': ['समजले', 'सांगा', 'सर्व', 'सुंदर', 'सुई', 'सुन्न'],
    'ह': ['होय', 'हा', 'ही', 'हे', 'हृदय', 'हरवले'],
    'आ': ['आपण', 'आज', 'आता', 'आराम', 'आयसीयू'],
    'व': ['वेळ', 'वाट', 'वर्ष', 'वेदना'],
    'ल': ['लिहा', 'लोक', 'लहान', 'लांब'],
    'य': ['येथे', 'योग्य', 'यंत्र'],
    'र': ['राजा', 'रस्ता', 'रंग', 'रात्र', 'रक्त'],
    'श': ['शौचालय', 'श्वासयंत्र'],
    'औ': ['औषध'],
    'ड': ['डॉक्टर'],
    'फ': ['फुफ्फुसे'],
    'मू': ['मूत्रपिंड'],
    'सं': ['संसर्ग'],
    'ग': ['गरम', 'गोंधळ'],
    'भ': ['भीती'],
    'च': ['चिंतित', 'चक्कर', 'चालणे'],
    'ख': ['खाज']
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
        tile.addEventListener('touchstart', handleTouchStart, { passive: false });
        tile.addEventListener('touchmove', handleTouchMove, { passive: false });
        tile.addEventListener('touchend', handleTouchEnd, { passive: false });
        tile.addEventListener('touchcancel', handleTouchCancel, { passive: false });
        
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
        tile.addEventListener('touchstart', handleTouchStart, { passive: false });
        tile.addEventListener('touchmove', handleTouchMove, { passive: false });
        tile.addEventListener('touchend', handleTouchEnd, { passive: false });
        tile.addEventListener('touchcancel', handleTouchCancel, { passive: false });
        
        container.appendChild(tile);
    });
}

// Create common word tiles
function createCommonWordTiles() {
    // Create tiles for basic needs
    const basicNeedsContainer = document.getElementById('basicNeedsContainer');
    wordCategories.basicNeeds.forEach(word => {
        const tile = document.createElement('button');
        tile.className = 'word-tile';
        tile.textContent = word;
        tile.setAttribute('aria-label', `Select word ${word}`);
        
        tile.addEventListener('click', () => selectWord(word));
        tile.addEventListener('touchstart', handleTouchStart, { passive: false });
        tile.addEventListener('touchmove', handleTouchMove, { passive: false });
        tile.addEventListener('touchend', handleTouchEnd, { passive: false });
        tile.addEventListener('touchcancel', handleTouchCancel, { passive: false });
        
        basicNeedsContainer.appendChild(tile);
    });
    
    // Create tiles for medical words
    const medicalWordsContainer = document.getElementById('medicalWordsContainer');
    wordCategories.medical.forEach(word => {
        const tile = document.createElement('button');
        tile.className = 'word-tile';
        tile.textContent = word;
        tile.setAttribute('aria-label', `Select word ${word}`);
        
        tile.addEventListener('click', () => selectWord(word));
        tile.addEventListener('touchstart', handleTouchStart, { passive: false });
        tile.addEventListener('touchmove', handleTouchMove, { passive: false });
        tile.addEventListener('touchend', handleTouchEnd, { passive: false });
        tile.addEventListener('touchcancel', handleTouchCancel, { passive: false });
        
        medicalWordsContainer.appendChild(tile);
    });
    
    // Create tiles for emotion words
    const emotionWordsContainer = document.getElementById('emotionWordsContainer');
    wordCategories.emotions.forEach(word => {
        const tile = document.createElement('button');
        tile.className = 'word-tile';
        tile.textContent = word;
        tile.setAttribute('aria-label', `Select word ${word}`);
        
        tile.addEventListener('click', () => selectWord(word));
        tile.addEventListener('touchstart', handleTouchStart, { passive: false });
        tile.addEventListener('touchmove', handleTouchMove, { passive: false });
        tile.addEventListener('touchend', handleTouchEnd, { passive: false });
        tile.addEventListener('touchcancel', handleTouchCancel, { passive: false });
        
        emotionWordsContainer.appendChild(tile);
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

// Check if a character is a consonant
function isConsonant(char) {
    return marathiConsonants.includes(char);
}

// Check if a character is a vowel
function isVowel(char) {
    return marathiVowels.includes(char);
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
        // Stop any currently playing speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(currentWord);
        
        // Try Marathi first, fallback to English if not available
        utterance.lang = 'mr-IN';
        utterance.rate = 0.8; // Slightly slower for clarity
        utterance.volume = 1.0; // Maximum volume
        utterance.pitch = 1.0; // Normal pitch
        
        // Add event listeners for debugging
        utterance.onstart = () => {
            console.log('Speech started:', currentWord);
            // Visual feedback
            const displayElement = document.getElementById('currentWord');
            displayElement.style.background = '#e8f5e8';
        };
        
        utterance.onend = () => {
            console.log('Speech ended');
            // Reset visual feedback
            const displayElement = document.getElementById('currentWord');
            displayElement.style.background = '#f9f9f9';
        };
        
        utterance.onerror = (event) => {
            console.error('Speech error:', event.error);
            alert(`Speech error: ${event.error}. Trying English...`);
            
            // Fallback to English
            const englishUtterance = new SpeechSynthesisUtterance(currentWord);
            englishUtterance.lang = 'en-US';
            englishUtterance.rate = 0.8;
            englishUtterance.volume = 1.0;
            speechSynthesis.speak(englishUtterance);
        };
        
        speechSynthesis.speak(utterance);
        
        // Fallback: if no speech after 2 seconds, try English
        setTimeout(() => {
            if (speechSynthesis.speaking) {
                console.log('Still speaking...');
            } else {
                console.log('No speech detected, trying English fallback');
                const englishUtterance = new SpeechSynthesisUtterance(currentWord);
                englishUtterance.lang = 'en-US';
                englishUtterance.rate = 0.8;
                englishUtterance.volume = 1.0;
                speechSynthesis.speak(englishUtterance);
            }
        }, 2000);
        
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
let tileTouchStartTime = 0;
let tileTouchStartY = 0;
let isTileScrolling = false;

function handleTouchStart(event) {
    tileTouchStartTime = Date.now();
    tileTouchStartY = event.touches[0].clientY;
    isTileScrolling = false;
    
    // Don't prevent default - allow scrolling
    this.style.transform = 'scale(0.95)';
    this.classList.add('touched');
}

function handleTouchEnd(event) {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - tileTouchStartTime;
    const touchEndY = event.changedTouches[0].clientY;
    const touchDistance = Math.abs(touchEndY - tileTouchStartY);
    
    // If it's a quick tap (not a scroll), handle the tile action
    if (touchDuration < 300 && touchDistance < 10 && !isTileScrolling) {
        // This was a tap, not a scroll
        event.preventDefault();
    }
    
    this.style.transform = 'scale(1)';
    this.classList.remove('touched');
}

function handleTouchMove(event) {
    const currentY = event.touches[0].clientY;
    const touchDistance = Math.abs(currentY - tileTouchStartY);
    
    // If user moved finger significantly, mark as scrolling
    if (touchDistance > 5) {
        isTileScrolling = true;
    }
}

function handleTouchCancel(event) {
    this.style.transform = 'scale(1)';
    this.classList.remove('touched');
    isTileScrolling = false;
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

// Test speech synthesis function
function testSpeech() {
    console.log('Testing speech synthesis...');
    console.log('Available voices:', speechSynthesis.getVoices());
    
    if ('speechSynthesis' in window) {
        const testUtterance = new SpeechSynthesisUtterance('Hello, this is a test');
        testUtterance.lang = 'en-US';
        testUtterance.volume = 1.0;
        testUtterance.rate = 0.8;
        
        testUtterance.onstart = () => console.log('Test speech started');
        testUtterance.onend = () => console.log('Test speech ended');
        testUtterance.onerror = (e) => console.error('Test speech error:', e.error);
        
        speechSynthesis.speak(testUtterance);
    } else {
        console.log('Speech synthesis not supported');
    }
}

// Add test button to the page
document.addEventListener('DOMContentLoaded', function() {
    // Add test button after the speak button
    const speakBtn = document.querySelector('.speak-btn');
    if (speakBtn) {
        const testBtn = document.createElement('button');
        testBtn.className = 'action-btn';
        testBtn.style.background = '#ff9800';
        testBtn.textContent = 'Test Speech';
        testBtn.onclick = testSpeech;
        
        // Insert test button after speak button
        speakBtn.parentNode.insertBefore(testBtn, speakBtn.nextSibling);
    }
});
