---
title: Website
date: 2022-05-02T16:20:29Z
description: The home for everything I create.
projectLink: https://jacklabbe.com
image: none
tags: javascript,gatsby
---
Having a home is essential. Having one online is also becoming more and more essential. Personal websites allow you to have one place where you can direct people to learn more about you, view any work you've done, and contact you.

Creating a website that is beautiful, functional, and extensible was of high priority.

Throughout the years I have used many templates and website builders. I would never get exactly what I wanted unless I built it myself. This website (and this project) is my attempt at building my vision.

## Decisions

### Why Gatsby?
Gatsby is a static site generator with features like GraphQL that allow for easy data querying. Gatsby easily allows for back-end CMS systems. This site uses [Netlify CMS](https://www.netlifycms.org/) on the back-end to allow me to write, edit, and delete posts like this as I wish. 

Gatsby also has various performance optimizations and plugins that make building a static site easy and intuitive. If you wish to learn more about Gatsby, you can view their website here: [https://gatsbyjs.com/why-gatsby/](https://gatsbyjs.com/why-gatsby/)

### Why this theme?
My goal was to create a familiar yet unique, beautiful yet functional interface that takes inspiration from GitHub and other sites. My goal was also to have it feel "techy", since that is my field of expertise. I am a fan of the "dark mode" concept, and so on all devices my site is in "dark mode".

## Challenges
I ran into a few challenges while building this site, like [this flickering issue](https://scrollrevealjs.org/guide/user-experience.html). I always follow this 5 step process to solve challenges:
1. Identify the problem
2. Assess the problem (what could be the root cause?)
3. Brainstorm potential solutions, weighing the pros and cons of each
4. Implement the solution
5. Test the solution

Throughout the process, I ensure to keep detailed records of each step so that I can go back and view them, if needed.

Ironically, one of the ways I fixed many issues with this project view and the back-end systems behind it was by using the system itself.

## Changes
Since this version (V2) of my website is built upon V1, many structural things didn't change. The main `<Layout>` component still is in use, although I moved all the SEO to a new `<Seo>` component.

V2 brought about many changes to this site, too many to go into depth here. But mainly, my focus for V2 was on completing the display of projects and tweaking styles and animations.

## Wrapping Up
This website is always evolving, so don't be surprised if this post is updated in the future. You can view the active development [here](https://github.com/j-labbe/website).