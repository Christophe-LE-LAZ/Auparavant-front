import { ICredentials } from "./credentials";
import { ILocation, IMemory, IPlace} from "./memory";

// Typage d'inputName comme étant une clé de l'interface ICredentials
export type TInputNameCred = keyof ICredentials;

export type TInputNameMemory = keyof IMemory;
export type TInputNamePlace = keyof IPlace;
export type TInputNameLocation = keyof ILocation;