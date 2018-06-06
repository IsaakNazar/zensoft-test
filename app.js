
const fetch = require('node-fetch'); // fetch data
const inquirer = require('inquirer');  // interactivity
const chalk = require('chalk');  //    Terminal string styling
inquirer.prompt([
  {
    type: 'input',
    name: 'teamname',
    message: 'Your Team\'s name'
  },
  {
    type: 'input',
    name: 'username',
    message: 'Your  Username'
  },
  {
    type: 'input',
    name: 'reponame',
    message: 'Your Repository name'
  }
]).then( answers => {

  
  fetch(`https://api.bitbucket.org/2.0/repositories/${answers.teamname}/`) //name of the inserted team 
    .then(res => res.json())
    .then(json => {
      json.values.filter(vals => {

        //api links of individual repository
        const repositoryApiLinks = vals.links.pullrequests.href;

        //validation of repository name
        if(answers.reponame === vals.name || 
            answers.reponame === vals.slug) {

              fetch(repositoryApiLinks)
                .then(res => res.json())

                //by default the length of a page = 10, 
                //so we travercing the next pages to get 
                //the rest values, until we hit the last page, 
                //so we use function recursively, to go as deep as possible   
                .then(function getNextPage(json) {
                  
                  if (json.next) {
                    fetch(json.next)
                      .then(res => res.json())
                      .then(json => {
                        return getNextPage(json)
                      }).catch(err => console.error(err));
                  }
                  json.values.filter(repo => {
                    //PR's status should be "OPEN"
                    if(repo.state === "OPEN") {
                      const activity = repo.links.activity.href;
                      
                      fetch(activity)
                        .then(res => res.json())
                        .then(json => {

                          //each element of the 'values' 
                          //array has PR links, it doesnt matter which element 
                          //take, and we took the first element
                          const pullRequestApiLink = json.values[0].pull_request.links.self.href;

                          fetch(pullRequestApiLink)
                            .then(res => res.json())
                            .then(json => {
                              //get only PR links related to the typed username
                              //in other words - filter reviewers by username
                              json.reviewers.filter(rev => {
                                if (answers.username === rev.username) {
                                  const prsFromTeammatesThatShouldBeReviewed = json.links.html.href;
                                  console.log(chalk.green
                                    (prsFromTeammatesThatShouldBeReviewed));
                                 } else {console.log(chalk.red('no such User name'))}
                              })
                            })
                            .catch(err => console.error(err));
                        })
                        .catch(err => console.error(err));
                      
                    }
                  })                 
                  
                })
                .catch(err => console.error(err));
            }            
      }); // FILTER outer
      
    })
    .catch(err => console.error(err));
}); 
