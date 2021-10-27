import { atom } from "recoil";

export const coursesReload = atom({
  key: "coursesReload",
  default: false,
  dangerouslyAllowMutability: true,
});

export const coursesDelete = atom({
  key: "coursesDelete",
  default: false,
  dangerouslyAllowMutability: true,
});

export const filesReload = atom({
  key: "filesReload",
  default: false,
  dangerouslyAllowMutability: true,
});

export const filesDelete = atom({
  key: "coursesDelete",
  default: false,
  dangerouslyAllowMutability: true,
});
