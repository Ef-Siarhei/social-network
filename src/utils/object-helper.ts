import {UserType} from "../types/types";

type NewObjPropsType ={
  [key: string]: boolean
}

export const updateObjectInArray = (
  items: Array<UserType>,
  itemId: number,
  objPropName: keyof UserType,
  newObjProps: NewObjPropsType,
) => {
  return items.map((user) => {
    if (user[objPropName] === itemId) {
      return { ...user, ...newObjProps };
    }
    return user;
  });
};
