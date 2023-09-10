// Generate a random username
function getRandomUsername() {
  const usernames = ["alice123", "bob456", "charlie789", "david101", "emma202"];
  return usernames[Math.floor(Math.random() * usernames.length)];
}

// Generate a random email
function getRandomEmail() {
  return `${getRandomUsername()}@example.com`;
}

// Generate a random password
function getRandomPassword() {
  return Math.random().toString(36).substring(7); // Random alphanumeric password
}

// Generate a random thought text
function getRandomThoughtText(wordCount) {
  const words = [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
  ];

  const randomWords = [];

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
  }

  return randomWords.join(" ");
}

module.exports = {
  getRandomUsername,
  getRandomEmail,
  getRandomPassword,
  getRandomThoughtText,
};
