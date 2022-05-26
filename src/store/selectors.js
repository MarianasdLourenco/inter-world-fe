import { selector } from "recoil";
import { requester } from "../services/requester";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import { atomCurrentUser } from "./atoms";
import { firebase } from "../firebase";

const fireStore = getFirestore(firebase);

const CollectionRef = collection(fireStore, "destinations");

export const selectorGetRatingUsers = selector({
  key: "GetRatingUsers",
  get: async () => {
    const { data } = await requester({
      baseURL: "https://randomuser.me/api/",
    }).get("?results=3&nat=br");

    const results = data?.results;

    return results;
  },
});

export const selectorGetCountrys = selector({
  key: "GetCountrys",
  get: async () => {
    const { data } = await requester({
      baseURL: "https://restcountries.com",
    }).get("/v3.1/all");

    return data;
  },
});

export const selectorGetDestinations = selector({
  key: "selectorGetDestinations",
  get: async () => {
    const data = await getDocs(CollectionRef);

    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },
});
