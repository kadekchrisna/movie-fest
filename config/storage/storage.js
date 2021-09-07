const {Storage} = require('@google-cloud/storage');
const storage = new Storage({keyFilename: './key.json'});

const upload = {
    async GenerateUploadSignedUrl(params) {
        // These options will allow temporary uploading of the file with outgoing
        // Content-Type: application/octet-stream header.
        const options = {
          version: 'v4',
          action: 'write',
          expires: Date.now() + params.duration * 1000, // 15 minutes
          contentType: 'application/octet-stream',
        };
      
        // Get a v4 signed URL for uploading file
        const [url] = await storage
          .bucket(params.bucketName)
          .file(params.fileName)
          .getSignedUrl(options);
      
        console.log('Generated PUT signed URL:');
        console.log(url);
        console.log('You can use this URL with any user agent, for example:');
        console.log(
          "curl -X PUT -H 'Content-Type: application/octet-stream' " +
            `--upload-file my-file '${url}'`
        );

        return url
    }
}

module.exports = {
  upload
}