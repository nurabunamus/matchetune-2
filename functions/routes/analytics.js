const { collection, getDocs } = require("firebase/firestore");
const { store } = require("../config");

const analytics = async (req, res) => {
  try {
    const healers = await getDocs(collection(store, "healers"));
    const patients = await getDocs(collection(store, "patients"));
    const books = await getDocs(collection(store, "books"));
    const videos = await getDocs(collection(store, "videos"));
    const infographics = await getDocs(collection(store, "infographics"));
    const subscribers = await getDocs(collection(store, "subscribers"));

    res.json([
      { title: "healers", value: healers.docs.length },
      { title: "patients", value: patients.docs.length },
      { title: "books", value: books.docs.length },
      { title: "videos", value: videos.docs.length },
      { title: " infographics", value: infographics.docs.length },
      { title: " subscribers", value: subscribers.docs.length },
    ]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" });
  }
};
module.exports = analytics;
