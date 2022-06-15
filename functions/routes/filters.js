const {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} = require("firebase/firestore");
const { store } = require("../config");

const filters = async (req, res) => {
  let { options, type } = req.body;
  let { status, approach, language, category } = options;

  let q = query(
    collection(store, type),
    orderBy("title"),
    where("approach.code", "==", approach)
  );

  let getData = await getDocs(q);

  console.log(getData.docs.length);

  //   let cond1 = status && !language && !approach && !category;
  //   let cond2 = !status && language && !approach && !category;
  //   let cond3 = !status && !language && approach && !category;
  //   let cond4 = !status && !language && approach && category;
  //   let cond5 = status && language && approach && category;
  //   let cond6 = status && language && !approach && !category;
  //   let cond7 = !status && language && approach && category;
  //   let cond8 = status && !language && approach && category;

  //   let limitNum = 12;

  //   let refColl = collection(store, "books");

  //   let q = query(
  //     refColl,
  //     orderBy("title"),
  //     limit(limitNum),
  //     startAfter(this.lastIndex)
  //   );

  //   if (cond1) {
  //     q = query(
  //       refColl,
  //       orderBy("title"),
  //       where("status.code", "==", status),
  //       limit(limitNum),
  //       startAfter(this.lastIndex)
  //     );
  //   } else if (cond2) {
  //     q = query(
  //       refColl,
  //       orderBy("title"),
  //       where("language.code", "==", language),
  //       limit(limitNum),
  //       startAfter(this.lastIndex)
  //     );
  //   } else if (cond3) {
  //     q = query(
  //       refColl,
  //       orderBy("title"),
  //       where("approach.code", "==", approach),
  //       limit(limitNum),
  //       startAfter(this.lastIndex)
  //     );
  //   } else if (cond4) {
  //     q = query(
  //       refColl,
  //       orderBy("title"),
  //       where("approach.code", "==", approach),
  //       where("category.code", "==", category),
  //       limit(limitNum),
  //       startAfter(this.lastIndex)
  //     );
  //   } else if (cond5) {
  //     q = query(
  //       refColl,
  //       orderBy("title"),
  //       where("status.code", "==", status),
  //       where("language.code", "==", language),
  //       where("approach.code", "==", approach),
  //       where("category.code", "==", category),
  //       limit(limitNum),
  //       startAfter(this.lastIndex)
  //     );
  //   } else if (cond6) {
  //     q = query(
  //       refColl,
  //       orderBy("title"),
  //       where("status.code", "==", status),
  //       where("language.code", "==", language),
  //       limit(limitNum),
  //       startAfter(this.lastIndex)
  //     );
  //   } else if (cond7) {
  //     q = query(
  //       refColl,
  //       orderBy("title"),
  //       where("language.code", "==", language),
  //       where("approach.code", "==", approach),
  //       where("category.code", "==", category),
  //       limit(limitNum),
  //       startAfter(this.lastIndex)
  //     );
  //   } else if (cond8) {
  //     q = query(
  //       refColl,
  //       orderBy("title"),
  //       where("status.code", "==", status),
  //       where("approach.code", "==", approach),
  //       where("category.code", "==", category),
  //       limit(limitNum),
  //       startAfter(this.lastIndex)
  //     );
  //   }

  //   try {
  //     let getData = await getDocs(q);
  //     this.lastIndex = getData.docs[getData.docs.length - 1];
  //     if (getData.empty) {
  //       this.empty = true;
  //       this.loader = false;
  //     }
  //     getData.forEach((book) => {
  //       let doc = { id: book.id, ...book.data() };
  //       this.Books.push(doc);
  //     });
  //     this.loader = false;
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     if (this.isScrolling) {
  //       this.loadMore = false;
  //     }
  //   }

  return res.json({ msg: "no time to sleep!" });
};
module.exports = filters;
