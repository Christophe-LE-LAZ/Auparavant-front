import { ICredentials } from "./credentials";
import { ILocationToCreate, IMemoryToCreate, IPlaceToCreate} from "./memory";

// Typage d'inputName comme étant une clé de l'interface ICredentials
export type TInputNameCred = keyof ICredentials;

export type TInputNameMemory = keyof IMemoryToCreate;
export type TInputNamePlace = keyof IPlaceToCreate;
export type TInputNameLocation = keyof ILocationToCreate;