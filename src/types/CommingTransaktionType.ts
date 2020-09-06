import AccauntType from "./AccauntType";
import UserType from "./UserType";

export default class CommingTransaktionType {
    accauntId?: number;
    amount?: number;
    transaktionAt?: string;
    transaktionToAccauntNumber?: number;
    status?: string;
    userId?: number;
    commingTransaktionId?: number;
    createdAt?: string;
    accaunt?: AccauntType;
    user?: UserType;
}