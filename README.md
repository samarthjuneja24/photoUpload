# photoUpload

This application launches a frontend and a backend. You can upload a photo via the UI and the backend will save the photo in a GCS bucket. The bucket in turn will trigger a cloud function that sends that image to Vision API and fetches contextual data about the image uploaded, and prints the output in Cloud Logging.
