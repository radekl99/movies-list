export default async function createUser(email, password) {
  const createUserPromise = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );

  const createUserResponse = await createUserPromise.json();

  if ("error" in createUserResponse) {
    switch (createUserResponse.error.message) {
      case "INVALID_EMAIL":
        return Promise.resolve({
          success: false,
          emailError: true,
          passwordError: false,
          errorMessage: "Please enter a valid email address!",
        });
      case "EMAIL_EXISTS":
        return Promise.resolve({
          success: false,
          emailError: true,
          passwordError: false,
          errorMessage:
            "There is an existing account associated with this email",
        });

      case "MISSING_PASSWORD":
      case "WEAK_PASSWORD : Password should be at least 6 characters":
        return Promise.resolve({
          success: false,
          emailError: false,
          passwordError: true,
          errorMessage: "Please enter a valid password (at least 6 characters)",
        });
    }
  }

  const { localId: userId, idToken, expiresIn } = createUserResponse;

  return Promise.resolve({
    success: true,
    userId,
    idToken,
    expiresIn,
    emailError: false,
    passwordError: false,
    errorMessage: "",
  });
}
