const bcrypt = require("bcryptjs");
const password = "123413";

// Hash the password
bcrypt.hash(password, 10, (err, hash) => {
  if (err) return console.error("Hashing error:", err);

  console.log("Generated hash:", hash);

  // Now compare it
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) return console.error("Comparison error:", err);

    console.log("Password is correct:", isMatch); // Should print true
  });
});
