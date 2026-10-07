import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook d'authentification fournissant des méthodes pour gérer l'inscription, la connexion,
 * la déconnexion et donnant accès aux informations de l'utilisateur connecté.
 * 
 * @returns {{
*   user: User | null,
*   loading: boolean,
*   signup: signUp(email, password, name, pays, region) => Promise<void>,
*   login: function(email, password): Promise<void>,
*   logout: function(): Promise<void>,
* }} Objet contenant l'état d'authentification et les méthodes
**/
export const useAuth =  () => useContext(AuthContext);