const fs = require('fs');

// Generate a random number within a range
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate a list of 200 users with random data
const users = [];
for (let i = 0; i < 200; i++) {
  const user = {
    name: `User ${i + 1}`,
    image: `https://example.com/user${i + 1}.jpg`,
    goldBadges: randomNumber(5, 4000),
    silverBadges: randomNumber(5, 4000),
    bronzeBadges: randomNumber(5, 4000)
  };
  users.push(user);
}

// Write the users array to a JSON file
fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
