export default async function getData(userId, idToken) {
  if (!idToken) return;
  try {
    const getDataPromise = await fetch(
      `https://movieslist-ee4b0-default-rtdb.europe-west1.firebasedatabase.app/${userId}.json?auth=${idToken}`
    );

    if (!getDataPromise.ok) {
      throw new Error();
    }

    const getDataResponse = await getDataPromise.json();

    const { movies, watched, toWatch } = getDataResponse;

    return Promise.resolve({
      movies: movies ? movies : [],
      watched: watched ? watched : [],
      toWatch: toWatch ? toWatch : null,
    });
  } catch (err) {
    return Promise.resolve({
      movies: [],
      watched: [],
      toWatch: null,
    });
  }
}
