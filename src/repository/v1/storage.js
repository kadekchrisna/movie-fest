class StorageRepository {

    constructor(storage) {
      this.storage = storage;
    }

    async generateUploadSignedUrl(params) {
        try {
            return this.storage.upload.GenerateUploadSignedUrl({
                duration: params.duration,
                fileName: params.fileName
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = StorageRepository