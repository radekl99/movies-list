export default async function signInUser(email, password) {
  const signInUserPromise = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );

  const signInUserResponse = await signInUserPromise.json();

  if ("error" in signInUserResponse) {
    switch (signInUserResponse.error.message) {
      case "INVALID_EMAIL":
        return Promise.resolve({
          success: false,
          emailError: true,
          passwordError: false,
          errorMessage: "Please enter a valid email address!",
        });
      case "EMAIL_NOT_FOUND":
        return Promise.resolve({
          success: false,
          emailError: true,
          passwordError: false,
          errorMessage: "No account associated with the email address!",
        });
      case "INVALID_PASSWORD":
        return Promise.resolve({
          success: false,
          emailError: false,
          passwordError: true,
          errorMessage: "Invalid password!",
        });

      case "MISSING_PASSWORD":
        return Promise.resolve({
          success: false,
          emailError: false,
          passwordError: true,
          errorMessage: "Please enter a password",
        });
    }
  }

  const { localId: userId, idToken, expiresIn } = signInUserResponse;

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
