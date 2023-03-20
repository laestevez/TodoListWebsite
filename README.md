# ListTogether is a Todo List website

For busy individuals with friends or no friends, who want to keep track of their daily lives.
Our Product will be flexible to the users needs and value creativity above all else.

Figma Link:
https://www.figma.com/team_invite/redeem/uw6Vj7wlOWbjUTFblXJENC

Class diagram link:
https://drive.google.com/file/d/1n8t6Fk2SGsVJp0R0WjdMzrhCS55_Z7fd/view?usp=sharing

Style guide:
https://airbnb.io/javascript/react/

Links for setting up IDE plugins:

1.) follow the instructions here to install ESlint https://eslint.org/

2.) install Prettier on top of ESlint: https://gist.github.com/bklingen-calpoly/4ed88b4093a5bcfa4be93a9ee0d8a31e

3.) add the format command to package.json: https://gist.github.com/bklingen-calpoly/c80cac4a012357dbb2751d22a428fd92  

Our emails:
sebastianchasmarino@gmail.com
teciorowski.anthony3@gmail.com
DillonjRego17@gmail.com
luisangel.e10@gmail.com

# Install frontend/Userfront
- cd to the app/frontend directory first
- npm install
- npm install react-router-dom --save
- npm install @userfront/react --save
- npm i react-bootstrap

# Backend linking with MongoDB
1. cd to app/backend dirrectory
2. npm install express
3. npm install --save-dev nodemon 
4. npm install dotenv
5. npm install multer
6. npm install jest
7. npm i mongodb-memory-server
8. Create .env local file following the format:

Update the fields below with your mongoDB atlas info
- `MONGODB_URI=replace_with_your_mongodb_atlas_url`
- `MONGO_USER=replace_with_your_mongodb_atlas_user`
- `MONGO_PWD=replace_with_your__mongodb_atlas_password`
- `MONGO_DB=replace_with_your_mongodb_db`
- `MONGO_CLUSTER=replace_with_your_mongodb_atlas_cluster`
- `PORT=5000`
