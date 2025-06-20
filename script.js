const moodMap = {
  tired: "perseverance",
  hopeful: "hope",
  frustrated: "strength",
  motivated: "motivational"
};

const nicknames = ["Baby", "Booby", "Bighead"];

const fallbackQuotes = {
  tired: [
    "Even on your most exhausted days, your strength shines through.",
    "Rest if you must, but don’t you quit.",
    "You’re allowed to pause, but never stop believing in yourself."
  ],
  hopeful: [
    "The light inside you is brighter than any darkness ahead.",
    "Each day is a fresh start, and you're doing amazing.",
    "Hope is the quiet voice whispering 'you can' when the world says 'you can't'."
  ],
  frustrated: [
    "Deep breaths. You’re growing through what you’re going through.",
    "This feeling is temporary. Your power is permanent.",
    "You've overcome worse — and you will rise again, love."
  ],
  motivated: [
    "Let’s get it, Baby — today is YOURS.",
    "You're not just trying — you’re *doing*. Keep it up.",
    "Every step forward is a win. I see you."
  ]
};

function personalizeQuote(text) {
  const name = nicknames[Math.floor(Math.random() * nicknames.length)];
  const shouldInsert = Math.random() < 0.7;

  if (!shouldInsert) return text;

  if (text.length < 60) {
    return `${name}, ${text}`;
  }

  const words = text.split(" ");
  const insertType = Math.floor(Math.random() * 3);

  if (insertType === 0) {
    return `${name}, ${text}`;
  } else if (insertType === 1) {
    const mid = Math.floor(words.length / 2);
    words.splice(mid, 0, `${name},`);
    return words.join(" ");
  } else {
    return `${text} ${name}.`;
  }
}

async function showQuote() {
  const mood = document.getElementById('mood-select').value;
  const resultDiv = document.getElementById('quote-result');

  if (!mood || !moodMap[mood]) {
    resultDiv.innerText = "Please select a mood first, love 💖";
    return;
  }

  const tag = moodMap[mood];
  resultDiv.innerHTML = "Loading a little love for you... 💫";

  const apiUrl = `https://api.quotable.io/random?tags=${tag}`;
  console.log("Fetching quote for tag:", tag);
  console.log("API URL:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("API response:", data);

    if (data && data.content) {
      const personalized = personalizeQuote(data.content);
      resultDiv.innerHTML = `
        “${personalized}”
        <br />
        <span style="font-size: 0.9rem; color: #666;">— ${data.author}</span>
      `;
    } else {
      throw new Error("Invalid response from API");
    }
  } catch (error) {
    console.error("Fetch failed:", error);
    console.log("Using fallback quote.");
    const fallback = fallbackQuotes[mood];
    const quote = fallback[Math.floor(Math.random() * fallback.length)];
    const personalized = personalizeQuote(quote);
    resultDiv.innerHTML = `
      “${personalized}”
      <br />
      <span style="font-size: 0.9rem; color: #666;">— your Ernest 💖 (local backup)</span>
    `;
  }
}
