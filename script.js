const moodMap = {
  tired: "perseverance",
  hopeful: "hope",
  frustrated: "strength",
  motivated: "motivational"
};

const nicknames = ["Baby", "Booby", "Bighead"];

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

  try {
    const response = await fetch(`https://api.quotable.io/random?tags=${tag}`);
    const data = await response.json();

    if (data && data.content) {
      const personalized = personalizeQuote(data.content);
      resultDiv.innerHTML = `
        “${personalized}”
        <br />
        <span style="font-size: 0.9rem; color: #666;">— ${data.author}</span>
      `;
    } else {
      resultDiv.innerText = "Couldn't find a quote right now. Try again!";
    }
  } catch (error) {
    resultDiv.innerText = "There was a problem getting your quote 💔";
    console.error(error);
  }
}
