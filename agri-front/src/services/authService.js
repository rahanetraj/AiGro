import { account, ID } from "../config/appwriteConfig";
import { createUser, findUserByAuthId } from "./databases/userService";

/**
 * Inscription d'un nouvel utilisateur
 * @param {string} email 
 * @param {string} password 
 * @param {string} name 
 * @param {string} pays 
 * @param {string} region
 * @returns {Promise<Object>} User account and document
 */
async function signUp({email, password, name, country, region}) {
    try {
        const userAccount = await account.create(ID.unique(), email, password, name);

        const userDocument = await createUser(
            userAccount.$id,
            {
                name,
                pays: country,
                region,
                email
            });

        return userDocument;
    } catch (error) {
        console.log('SignUp error:', error);
        throw error;
    }
}

/**
 * Récupère l'utilisateur courant (compte auth + document user)
 * @returns {Promise<Object>} userDocument
 */
async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) return null;

        const userDocument = await findUserByAuthId(currentAccount.$id);

        return userDocument;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}
/**
 * Connexion d'un utilisateur
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} user Connected
 */
async function logIn(email, password) {
    try {
        await account.createEmailPasswordSession(email, password);
        return await getCurrentUser();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

/**
 * Déconnexion de l'utilisateur courant
 * @returns {Promise}
 */
async function logOut() {
    try {
        await account.deleteSession('current');
        return null
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

/**
 * Supprime le compte utilisateur et le document associé
 * @returns {Promise}
 */
// async function deleteAccount() {
//     try {
//         const currentUser = await account.get();

//         if (!currentUser) {
//             throw new Error('No authenticated user');
//         }

//         // Suppression du document user
//         const userDoc = await findUserByAuthId(currentUser.$id);
//         if (userDoc) {
//             await deleteUser(userDoc.$id);
//         }

//         // Suppression du compte auth
//         await account.delete();

//     } catch (error) {
//         console.error('Delete account error:', error);
//         throw error;
//     }
// }

/**
 * Met à jour les informations du user
 * @param {string} userId 
 * @param {Object} userData 
 * @returns {Promise<Object>} Document mis à jour
 */
// async function updateCurrentUser(userData) {
//     try {
//         const currentUser = await getCurrentUser();

//         if (!currentUser?.userDocument?.$id) {
//             throw new Error('User document not found');
//         }

//         return await updateUser(currentUser.userDocument.$id, userData);
//     } catch (error) {
//         console.error('Update current user error:', error);
//         throw error;
//     }
// }

export {
    getCurrentUser, logIn,
    logOut, signUp
};
