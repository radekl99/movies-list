export default async function setMovies(userId, moviesArray, idToken) {
  await fetch(
    `https://movieslist-ee4b0-default-rtdb.europe-west1.firebasedatabase.app/${userId}/movies.json?auth=${idToken}`,
    { method: "PUT", body: JSON.stringify(moviesArray) }
  );
}
