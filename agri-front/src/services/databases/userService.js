import { databaseId, databases, Query, usersCollectionId } from "../../config/appwriteConfig";

/**
 * Crée un document user
 * @param {Object} userData - Données de l'utilisateur
 * @param {userId} userId - id du documents (id de l'utilisateur dans l'auth)
 * @returns {Promise<Object>} Document créé
 */
async function createUser(userId, userData) {
    try {
        const document = await databases.createDocument(
            databaseId,
            usersCollectionId,
            userId,
            userData
        );
        return document;
    } catch (error) {
        console.error('Create user error:', error);
        throw error;
    }
}

/**
 * Récupère un user par son ID
 * @param {string} userId id de l'utilisateur dans l'auth
 * @returns {Promise<Object>} Document user
 */
async function getUser(userId) {
    try {
        const document = await databases.getDocument(
            databaseId,
            usersCollectionId,
            userId
        );
        return document;
    } catch (error) {
        console.error('Get user error:', error);
        throw error;
    }
}

/**
 * Met à jour un user
 * @param {string} userId 
 * @param {Object} userData 
 * @returns {Promise<Object>} Document mis à jour
 */
async function updateUser(userId, userData) {
    try {
        const document = await databases.updateDocument(
            databaseId,
            usersCollectionId,
            userId,
            userData
        );
        return document;
    } catch (error) {
        console.error('Update user error:', error);
        throw error;
    }
}

/**
 * Supprime un user
 * @param {string} userId 
 * @returns {Promise}
 */
async function deleteUser(userId) {
    try {
        await databases.deleteDocument(
            databaseId,
            usersCollectionId,
            userId
        );
    } catch (error) {
        console.error('Delete user error:', error);
        throw error;
    }
}

/**
 * Liste tous les users (avec pagination)
 * @param {number} limit 
 * @param {number} offset 
 * @returns {Promise<Array>} Liste des documents
 */
async function listUsers(limit = 10, offset = 0) {
    try {
        const response = await databases.listDocuments(
            databaseId,
            usersCollectionId,
            [],
            limit,
            offset
        );
        return response.documents;
    } catch (error) {
        console.error('List users error:', error);
        throw error;
    }
}

/**
 * Trouve un user par son auth userId
 * @param {string} authUserId 
 * @returns {Promise<Object|null>} Document user ou null
 */
async function findUserByAuthId(authUserId) {
    try {
        const response = await databases.listDocuments(
            databaseId,
            usersCollectionId,
            [Query.equal("$id", [authUserId])]
        );
        return response.documents[0] || null;
    } catch (error) {
        console.error('Find user by auth ID error:', error);
        throw error;
    }
}

export {
    createUser, deleteUser, findUserByAuthId, getUser, listUsers, updateUser
};
