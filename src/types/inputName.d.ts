import { ICredentials } from "./credentials";
import { IMemoryCreate } from "./memory";

// Typage d'inputName comme étant une clé de l'interface ICredentials
export type TInputNameCred = keyof ICredentials;

export type TInputNameMemo = keyof IMemoryCreate;