import { bucketId, ID, storage } from "../../config/appwriteConfig";

/**
 * Upload un fichier image vers un bucket Appwrite
 * @param {File} file - Fichier image à uploader
 * @param {string} bucketId - ID du bucket cible
 * @param {function} [onProgress] - Callback pour suivre la progression
 * @returns {Promise<Object>} - Réponse de l'API
 */
export async function uploadImage(file, onProgress = null) {
    try {
        if (!file.type.startsWith('image/')) {
            throw new Error('Le fichier doit être une image');
        }

        const response = await storage.createFile(
            bucketId,
            ID.unique(),
            file,
            onProgress && ((progress) => {
                onProgress(progress.loaded / progress.total * 100);
            })
        );
        return response;
    } catch (error) {
        console.error("Erreur lors de l'upload:", error);
        throw error;
    }
}