import {
  collection,
  doc,
  getDocs,
  getFirestore,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);
export async function retriveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retriveDataById(collectionName: string, id: string) {
  const snapshot: any = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}
export async function singUp(
  userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback({ status: false, message: "email already existt" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "register success" });
      })
      .catch((error) => {
        callback({ status: false, message: error.message });
      });
    callback({ status: true, message: "register success" });
  }
}
export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    console.log(data[0]);
    return data[0];
  } else {
    return null;
  }
}
export async function signInWidthGoogle(userData: any, callback: Function) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "users", data[0].id), userData)
      .then(() => {
        callback({
          status: true,
          message: "Sign iIn Width Google Success",
          data: userData,
        });
      })
      .catch(() => {
        callback({ status: false, message: "Sign In Width Google Failed" });
      });
  } else {
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({
          status: true,
          message: "Sign In Width Google Success",
          data: userData,
        });
      })
      .catch(() => {
        callback({ status: false, message: "Sign In Width Google Failed" });
      });
  }
}
