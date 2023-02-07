# MIND THE GAP

![amiresponsive](/assets/images/site-screenshots/am-i-responsive.png "Site responsiveness test")

## Table of contents

- [Introduction](#introduction)
- [UI Decisions](#ui-decisions)
- [Features](#features)
- [Features left to implement](#features-left-to-implement)
- [Technology Used](#technology-used)
  - [HTML](#html)
  - [CSS](#css)
  - [Javascript](#javascript)
- [Testing](#testing)
- [Browser Compatibility Checks](#browser-compatibility-checks)
  - [Microsoft Edge](#microsoft-edge)
  - [Firefox Dev Edition](#firefox-developer-edition)
  - [Opera](#opera)
- [Manual Feature Testing](#manual-feature-testing)
- [Bugs](#bugs)
- [Deployment](#deployment)
  - [Cloning and Forking](#cloning-and-forking)
  - [Local Deployment](#local-deployment)
  - [Remote Deployment](#remote-deployment)
- [Credits and Acknowledgements](#credits-and-acknowledgements)

[Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

## Introduction

![Home page](/assets/images/site-screenshots/home-page.png "Site home page")

Cloud Cover provides an easy to use and comprehensive forecast of the weather. By entering a location (City, Country), users can access the current forecast and a four day forecast. The current forecast includes details such as temperature, humidity, wind speed and direction, chance of rain, and more. The four day forecast shows the main weather conditions expected during each day. Cloud Cover utilizes the power of JavaScript and OpenWeatherMap API data to deliver up-to-date and accurate forecasts.
The API has a limit of 60 requests per minute, which could be a limiting factor if the site had a large number of users.

## UI Decisions

## Features

This section explains each part of the project and the value it brings to acheiving the project goal.

## Features left to implement

## Technology Used

### HTML

### CSS

### Javascript

## Testing

- HTML  
  No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fbwnc-code.github.io%2Fcloud-cover%2F)

- CSS
  - No errors were found when passing through the official [W3C validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fbwnc-code.github.io%2Fcloud-cover%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

- JavaScript
  - No errors were found when passing through JSHint

  ![JSHint](/assets/images/site-screenshots/jshint.png)

- Accessibility
  - I used dev tools lighthouse to confirm performance, readability and best practices for the site
  ![Lighthouse](/assets/images/site-screenshots/lighthouse.png)

### Responsiveness / Device Testing

The site was tested on the following devices;

- HP Elitebook 840
- AOC Q27V4EA - 27 Inch QHD Monitor
- Apple iPhone 13 Pro max
- Google Chrome Developer Tools - simulator for all different device options as well as using the adjustable sizing options

The website functioned as expected in all of these devices.

## Browser Compatibility Checks

### Microsoft Edge

The latest deployment of the site was loaded onto Microsoft Edge (a Chromium browser) with no visible issues

![Edge](/assets/images/site-screenshots/edge.png "Microsoft Edge")

### Firefox Developer Edition

The latest deployment of the site was loaded onto Firefox developer edition with no visible issues

![Firefox Developer Edition](/assets/images/site-screenshots/firefox-dev.png)

### Opera

The latest deployment of the site was loaded onto Opera with no visible issues

![Opera](/assets/images/site-screenshots/opera.png)

## Manual Feature Testing

## Bugs

Because openweathermap uses data from local weather stations, the location displayed when searching some areas will not match the exact name that was searched. It will however be a location very close, or a particular district or area within the location which was searched.

## Deployment

This section describes the process of obtaining a copy of this websites files in a new repository, running an environment to work on the site, and deploying to a live platform

### Cloning and Forking

-At the top of the repository page, select fork and choose a name for the new repository to create a copy

-Alternatively select code above the file viewer and either use the link to pull a copy of the code or download the code as a zip file

### Local Deployment

- Navigate to [Gitpod](https://gitpod.io/)
- Login using a Github account
- Download and install the Gitpod browser extension
- Return to the repository
- Select the green Gitpod button above the file viewer

### Remote Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows:
  - In the GitHub repository, navigate to the Settings tab
  - Select the pages link in the sidebar
  - Under "Build and deployment", under "Branch", use the None or Branch drop-down menu and select a publishing source.
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found [here](https://bwnc-code.github.io/mind-the-gap/index.html)

## Credits and Acknowledgements

[All weather data and forecast icons are provided by OpenWeatherMap](https://openweathermap.org/)

[Background Image by starline](https://www.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_8562848.htm#query=weather%20background&position=3&from_view=keyword")

[Sunrise icon created by 7AM - Flaticon](https://www.flaticon.com/free-icons/sun>)
