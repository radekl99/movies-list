export default async function setWatched(userId, watchedArray, idToken) {
  await fetch(
    `https://movieslist-ee4b0-default-rtdb.europe-west1.firebasedatabase.app/${userId}/watched.json?auth=${idToken}`,
    { method: "PUT", body: JSON.stringify(watchedArray) }
  );
}
