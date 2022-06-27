const {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} = require("firebase/firestore");
const { store } = require("../config");

const filters = async (req, res) => {
  let { options, type } = req.body;
  let { status, approach, language, category } = options;
  let q;
  let cond1 = status && !language && !approach;
  let cond2 = !status && language && !approach;
  let cond3 = !status && !language && approach;
  let cond5 = status && language && approach;
  let cond6 = status && language && !approach;
  let cond7 = !status && language && approach;
  let cond8 = status && !language && approach;

  try {
    let refColl = collection(store, type);
    if (cond1) {
      q = query(refColl, orderBy("title"), where("status.code", "==", status));
    } else if (cond2) {
      q = query(
        refColl,
        orderBy("title"),
        where("language.code", "==", language)
      );
    } else if (cond3) {
      q = query(
        refColl,
        orderBy("title"),
        where("approach.code", "==", approach)
      );
    } else if (cond5) {
      q = query(
        refColl,
        orderBy("title"),
        where("status.code", "==", status),
        where("language.code", "==", language),
        where("approach.code", "==", approach)
      );
    } else if (cond6) {
      q = query(
        refColl,
        orderBy("title"),
        where("status.code", "==", status),
        where("language.code", "==", language)
      );
    } else if (cond7) {
      q = query(
        refColl,
        orderBy("title"),
        where("language.code", "==", language),
        where("approach.code", "==", approach)
      );
    } else if (cond8) {
      q = query(
        refColl,
        orderBy("title"),
        where("status.code", "==", status),
        where("approach.code", "==", approach)
      );
    } else {
      q = query(refColl, orderBy("title"), limit(50));
    }

    let getData = await getDocs(q);
    let list = [];
    getData.forEach((item) => {
      list.push({ ...item.data(), id: item.id });
    });

    if (category && category?.length) {
      list = list.filter((e) => {
        return category.includes(e.category.code) ? e : null;
      });
    }

    return res.json(list);
  } catch {
    return res.json({ msg: "errors error!" });
  }
};
module.exports = filters;
