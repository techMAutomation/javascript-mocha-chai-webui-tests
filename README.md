# WEB UI Automation Framework using Selenium, Mocha, Javascript & Chai

## PreRequisites:
1. node.js
2. npm
3. Visual Studio Code Editor (VS Code)

# Steps:
1. Clone the Repo from GitHub
2. Open the project in the VS Code editor
3. Create the following files in the project, if you don't see them in the project 

   Filename: .babelrc
   Add the below info to the file: 
   {
    "presets": ["@babel/preset-env"],
    "plugins": [
                    ["@babel/plugin-proposal-class-properties",
                        { "loose": true}
                    ],
                    ["@babel/transform-runtime",
                        {"regenerator": true}
                    ]
                ]
}

  Filename: .mocharc.yaml
  Add the below info:
                    require: '@babel/register'
   
4. In VS Code editor - open Terminal and run the command to install project existing dependencies: `npm install`

5. In case, `npm install` fails to install required dependencies then run the below command:
    `npm install --save-dev @babel/core @babel/node @babel/register @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-regenerator @babel/plugin-transform-runtime selenium-webdriver mocha chai chromedriver geckodriver mochawesome`

6. If Step 4 works fine, ignore Step 5

7. # Simply to Run the tests: 
`npm test`

# To see tests along with Passed/Failed report run the command as below:
`npm test -- --reporter mochawesome`

# NOTE: 
1. Once the tests are completed running, in the terminal displays 2 different Report links such as JSON and HTML like below :

JSON Link: `[mochawesome] Report JSON saved to /Users/xxxx/xxxx/xxxx/javascript-mocha-chai-webui-tests/mochawesome-report/mochawesome.json`

HTML link: `[mochawesome] Report HTML saved to /Users/xxxx/xxxx/xxxx/javascript-mocha-chai-webui-tests/mochawesome-report/mochawesome.html`

2. Copy the HTML report link and paste it in a browser to see the TESTS report 
  (or)
- Click on the 'mochawesome.html' file under the 'mochawesome-report' folder 

## NOTE: 
In this project, under 'screenshots' folder, attached the tests passed report
