### Prerequisites:
Node.js installed and npm(comes with Node.js)
Git installed

# Local Machine Setup [TESTED]:

#### 1. Click the <>Code drop down button inside our github STAR repository page.
Under the HTTPS tab copy the following link:
https://github.com/fabianwolski/STAR.git

#### 2. Create a new folder on your local machine where you would like to clone the
repository into.

#### 3. Open VSCode(or in GitBash), open the fresh folder you have just created, go into view>terminal. Once you have the terminal open
run the following command:

git clone https://github.com/fabianwolski/STAR.git

[ERROR] git : The term 'git' is not recognized as the name of a cmdlet, function, script file, or 
operable program.

This means you have not installed git or there is issues with your current version. Please install/reinstall

#### 4. Navigate to project directory
run the following command:
cd STAR

#### 5 Installing dependencies
run the following commands:

npm install i react-lottie --legacy-peer-deps

npm install react-datepicker --legacy-peer-deps

npm install react-intersection-observer --legacy-peer-deps

npm install

If you get this error: 
[ERROR] npm ERR! While resolving: react-lottie@1.2.3
Run npm install i react-lottie --legacy-peer-deps once again.
All this is is that we are using React 18 while currently lottie supports React 16 and under.
This is just for the animation aspect of our project.

#### 6. Start the project
run the following command:
npm start
