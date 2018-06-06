# ZENSOFT TEST

### Part 1
## What.
The test project was created using technologies: JavaScript, Node.js, npm.

3 packages are used:
1. [node-fetch](https://www.npmjs.com/package/node-fetch) - A light-weight module that brings window.fetch to Node.js
2. [Inquirer.js](https://www.npmjs.com/package/inquirer) - A collection of common interactive command line user interfaces.
3. [chalk](https://www.npmjs.com/package/chalk) - Terminal string styling

`node -v : 8.10.0`<br> 
`npm -v : 6.1.0`

## How to.
Clone the project. Open your command line (Git Bash preferrably). Specify the path of the project on Git Bash. <br>
run: `npm install` <br>
after installing necessary packages <br>
run: `node app.js` <br>

command line will ask you 3 questions:
1. Team name ![team](https://user-images.githubusercontent.com/25715575/41024456-1dfef888-6991-11e8-89a9-3285fd4d78fd.jpg)

2.  User name ![user](https://user-images.githubusercontent.com/25715575/41024335-c9ca92ae-6990-11e8-8e20-3b3d020f692d.jpg)

3. Repository name ![repo](https://user-images.githubusercontent.com/25715575/41024437-0d849c38-6991-11e8-8afb-b76a73927c1a.jpg)



How actially it works.
Its considered that repository was created by a team. After submitting all three questions the programm will filter output by teamname, 
then by repository name. When repository is found , it will filter the output depending on reviewer's name (user name).
Then you get PR links only related to a user, that was submitted.

### Part 2
We open Bitbucket website, go to the bottom-left corner -> click on user icon -> Bitbucket settings -> OAuth -> <br> `Add consumer`
Fill up forms. Recommended fill the "Callback Url" form. Check Permissions (I checked all "read" checkboxes) -> click `Save` <br>
We get consumer's **Key** and **Secret**.
We get the <br> `https://bitbucket.org/site/oauth2/authorize?client_id={client_id}&response_type=code` from [docs](https://developer.atlassian.com/bitbucket/api/2/reference/meta/authentication)
When a user submits, we send him(her) that link with client_id=**Key** (get the **Key** and paste it inside `client_id`) <br>
We will be redirected to bitbucket login page and be asked to confirm access to user account:
![confirm](https://user-images.githubusercontent.com/25715575/41024547-5caf0974-6991-11e8-8c48-984394a1bd9d.jpg)
Click `Grant access` and get a link. We need only `access_token={access token}` part of the link. Copy it and paste it to this link:
`https://api/bitbucket.org/2.0/repositories/{user name}?access_token={access token}`.
So this link gives us access to private repositories of submitted {user name}. <br>

The problem was: How to handle that access token when a user signs in? Where to store that link to get the access token?
If that problem was resolved, then the rest of the implementation of the code would be like the required part of the task.
### output public PRs -> console
### output private PRs -> new tab of a browser



