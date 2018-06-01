

const fetch = require('node-fetch');
const inquirer = require('inquirer');

    inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Your Username'
      },
      {
        type: 'input',
        name: 'reponame',
        message: 'Your Repository name'
      }
    ]).then((answers) => {
      //console.log('Hello ' + answers.username);
      fetch(`https://api.bitbucket.org/2.0/teams/${answers.username}/`)
          .then(res => res.json())
          .then(json => {
            //repository api link
            const hrefs = json.links.repositories.href;

            //console.log(hrefs);
            fetch(hrefs)
              .then(res => res.json())
              .then(json => {
                json.values.filter(req => {

                  //pull request api links of each repository
                  const pullreqs = req.links.pullrequests.href;

                  //if typed repository name equals to existing repo name
                  if (answers.reponame === req.name) {
                    fetch(pullreqs)
                      .then(res => res.json())
                      .then(json => {
                        json.values.map( prs => {
                          const prsFromTeamMatesThatShouldBeReviewed = prs.links.html.href;
                          //status should be OPEN
                          if (prs.state === "OPEN") {
                            console.log(prsFromTeamMatesThatShouldBeReviewed);
                          }
                        });// MAP method
                      })// inner JSON
                  }// IF end
                })// FILTER method END
              });// middle outer JSON

          });//outer JSON
    });
