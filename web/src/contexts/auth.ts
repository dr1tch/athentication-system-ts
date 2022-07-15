import React from "react";
interface IUser {
  _id?: number;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
}
export type IAuth = {
  isAuth: boolean;
  setIsAuth?: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: IUser;
  setCurrentUser?: React.Dispatch<React.SetStateAction<IUser>>;
} | null;

const AuthContext = React.createContext<IAuth>({
  isAuth: false,
  currentUser: null,
});

export default AuthContext;
