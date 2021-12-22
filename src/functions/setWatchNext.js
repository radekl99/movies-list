export default async function setWatchNext(userId, watchNextMovie, idToken) {
  await fetch(
    `https://movieslist-ee4b0-default-rtdb.europe-west1.firebasedatabase.app/${userId}/toWatch.json?auth=${idToken}`,
    { method: "PUT", body: JSON.stringify(watchNextMovie) }
  );
}
