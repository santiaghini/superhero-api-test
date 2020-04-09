# albo-test
This repo is a test app developed my me as an exercise to measure my skills for albo.

The app itself is useful to get information from the Marvel API and help the people at Albo know about the people that contributed to a character (like Iron Man or Captain America!).

### Instructions:
- Upload a .env file to the server with environment variables. In this case, the two needed are MARVELAPIKEY and DATABASEURL.

### Things to improve:
- It is assumed that we have a connection to a database. We would need to correctly set up the database URL. Could be by installing MongoDB in the instance or by connecting to a hosted MongoDB database (e.g. MongoAtlas).
- It is assumed that we could push this to Heroku or something like that.
- The service fetches the Marvel API and updates de database accordingly once for every request. An improvement would be to shcedule a chron job to run periodically, fetch the Marvel API and then udpate the database.
- The returned object of comics from the API could return a limited number of creators and characters, i.e. a comic could have a larger number of elements than the ones return. We would need to make subsecuent calls to the Marvel API until we have fetched all the data. While this is not common, it could happen.
- Error handling in some of the functions.
- General styling of the application and documentation.