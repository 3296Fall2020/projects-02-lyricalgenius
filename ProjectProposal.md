# LyricalGenius

## Project Abstract
LyricalGenius is a Web application lyric scraper that uses the Genius api to grab lyrics from a song. Before getting any further, Genius is a media company that has lyrical artists come on, perform acapella and explain the lyrics they used in their song. They also stream music as well. From there the lyrics are parsed and sent, **one by one** as a mobile message using the Twilio api. Making this into a web app is easier for the user such that all they have to do is search the song that they want and click send to have these song lyrics be sent one by one. Sending messages one by one to a person, very rapidly, will probably result in them getting very annoyed, but that is part of the fun in this assignment.<br><br><br>

![image](https://user-images.githubusercontent.com/59904666/94629857-f2aefd80-0291-11eb-8122-596f505a010d.png)



## Project Relevance
Looking at **Educational Goals** there are some concepts that will be applied into this assignment. First is the design pattern, we will use Vanilla js which will parse the lyrics in the front end, that were acquired with the Genius api, then from there the lyrics will be sent to the backend. With Node.js as the backend language we will finally then send the messages using the Twilio api. What I am trying to indicate here is, design is crucial, we need to know exactly what connections are being made throughout the system. Next this project is one that can be broken down into parts. Developers can be working on the connection side while another on the front end side, that is why git is very import here, by merging all the changes and consistently bug fixing we will be able to create a **mainline** that represents all of our ideas. On top of that all of us will gain experience on both the backend and frontend because by the way the connections will be made we need to be communicative with each other about what happens when a user clicks a certain button or when an invalid response is sent, etc. 

##  Conceptual Design
This project will build off of an already existing open source lyric scraper project. Along with that, Genius and Twilio both have api's that can be used for free. HTML/CSS will be used for design and styling parts of the application while React and Node.js will be responsible for handling the heavy work. This heavy work includes grabbing the song name, finding it (using the Genius api on the backend) displaying it to the user (on the client side), then from there having the user enter the number at which they would like to send the lyrics to. From there once "send" button is hit the  lyrics and mobile number are sent to node to be used with twilio api to begin to send the messages. 

##  Background
-Github for Genius npm package below: <a href="https://github.com/farshed/genius-lyrics-api#types">Genius Lyric Scraper Repo</a>
-NPM for using Genius's Api: <a href ="https://www.npmjs.com/package/genius-lyrics-api">Genius Lyric NPM</a>
-NPM for using Twilio's Api: <a href ="https://www.npmjs.com/package/twilio">Twilio NPM</a>
<br>
Installation involves downloading the npm packages, but before that you must download node to be able to use 
these packages. For the front end, react will need to be installed on your system. Also to allow any user to connect we will 
need something like an AWS EC2 instance to keep our server (subject to change depending on what the group prefers), made by Node, active.

## Insights
**Johnny Gangoo:** after hearing the feedback from the team, I believe there is room for improvement within the initial application, our main
priority within the first few weeks is to get the core functionality down. Then from there, implement any additional features that we discuss.

**Kyle Skelly:** I believe that getting the basic functionality early will be very important due to the group wanting to add a variety of features. After achieving this functionality, the group will have some tough decisions to make in regards to features and whether to include them or leave them out.

**Jason Xhoxhi:** The project has a strong base which will offer great and smooth functionality to users and also gives us room to expand and add new ideas which would help build out the application overall. I believe that the way we have structed it will allow us to adapt it to face user needs.

**Vlad Karepov:** The project has a good plan for the fundamental tools and frameworks it will be using. The main challenge I think is being able to foresee any possible issues that will occur from implementing late-stage features with our current starting toolkit.

## Feedbacks
**Johnny Gangoo:** overall the project seems fair for all members, we are all ready to learn and build Lyrical Genius with tools we have previously
used and also learn/use new tools along the way.

**Kyle Skelly:** The project is going very smoothly so far. All group members are meeting on time as well as getting all of their necessary work done. There seems to be a concensus on what the group's vision is for the project and I believe this universal understanding of a common endgoal will allow us to move quickly.

**Jason Xhoxhi:** Project planning and meetings have been going very well with encouragement on new ideas. The whole group is excited to start working on the project and to learn the new technologies it will be built with. Everyone seems on the same page with time and getting together as well.

**Vlad Karepov:** The meetings and planning have been consistent and thorough. The team is on the same page about the project goals, and everyone's contribution have been fair and substantial.

## Expectations
**Johnny Gangoo:** For this project I expect the team members to be available to meet roughly 1-3 times per week to discuss project details, as well 
as complete there part of the sprints.

**Kyle Skelly:** I expect the group to be willing to meet weekly as well as keep in contact when not in meetings. I also expect for group members to work on this assignment outside of our grouptimes. 

**Jason Xhoxhi:** I expect that everyone will be able to come together at least once a week to meet as well as being able to communicate together to convey ideas. Also being able to ask questions and get answers in a reasonable amount of time.

**Vlad Karepov:** I expect everyone to be able to communicate clearly and directly. Any issues, feedback, or criticisms should be aired without any hesitation. I also expect team members to fairly contribute and give bi-weekly updates on their progress.

## Required Resources
Students participating in this assignment will need the follow:
 *  HTML
 *  CSS
 *  React
 *  Node.js<br>
**If they are new to any of these, this project is a good gateway to learning about them, also if you have additional
ideas or know of any other useful libs/packages we could use, I am open to that.**

## Sample Use:
- Below is a link to a github repo I created to show a simple way to use both the Genius and Twilio api's, you will need an
api client to get the secret keys for both <a href="https://genius.com/signup_or_login">Genius</a> and <a href="https://www.twilio.com/try-twilio">Twilio</a>. GITHUB LINK: <a href="https://github.com/johnnygangoo/GeniusAndTwilioAPI">UsingGeniusAndTwilioAPI</a>

## Slide From Whiteboard Presentation:
![lyricalgenius](https://user-images.githubusercontent.com/59904666/94632457-94394d80-0298-11eb-952e-da5a28b64296.PNG)
