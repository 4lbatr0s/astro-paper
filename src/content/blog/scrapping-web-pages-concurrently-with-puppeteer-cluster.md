---
author: Serhat Oner
pubDatetime: 2023-08-06
title: Scraping Web Pages Concurrently with Puppeteer Cluster
postSlug: scrapping-web-pages-concurrently-with-puppeteer-cluster
featured: true
draft: false
tags:
  - javascript
  - web-scraping
  - browser-automation
  - puppeteer
  - cluster
  - parallel-programming
  - multithreading
ogImage: "https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1130107/retina_1708x683_cover-headless-browser-puppeteer-tutorial-88ee90dab2aea8163e7622b6ec02df6b.png"
description: Learn how to wield the power of Puppeteer-Cluster for concurrent web scraping and conquer the web like a pro.
---

## Table of Contents

1. Introduction
2. Setting Up the Development Environment
3. Scraping Web Pages with Puppeteer-Cluster
4. Understanding the Code
5. Conclusion and Summary

## 1. Introduction

Hey there, fellow developers and mischief-makers! Today, we're diving headfirst into the exciting world of web scraping with Puppeteer-Cluster! If you're ready to scrape multiple web pages concurrently and feel the thrill of parallel programming, then buckle up because we're about to embark on a wild ride through the web's most hidden corners. So, grab your chimichangas and let's get started!

## 2. Setting Up the Development Environment

Before we unleash our inner Deadpool, let's set up our development environment. Ensure you have Node.js and npm installed on your machine. Create a new project folder for your web scraping escapades.

To initialize the project, open your terminal and run:

```bash
npm init
```

Once you have your `package.json` ready, install the necessary dependencies:

```bash
npm install puppeteer puppeteer-cluster
```

Now that we're all geared up, let's wield the power of Puppeteer-Cluster!

## 3. Scraping Web Pages with Puppeteer-Cluster

Puppeteer-Cluster is a formidable tool that empowers us to scrape multiple web pages concurrently. By harnessing the Chromium browser, we can interact with web pages just like a user would – clicking buttons, filling out forms, and extracting valuable information.

To showcase the magic of Puppeteer-Cluster, let's create a simple script that concurrently scrapes data from multiple URLs. We'll extract the title and meta description of each page and save the results in an array.

Here's the code:

```javascript
const { Cluster } = require('puppeteer-cluster');

(async () => {
  const urls = ['https://example.com', 'https://samplewebsite.com', 'https://awesomepage.com'];
  const results = [];

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_BROWSER,
    maxConcurrency: 5, // Adjust this based on your machine's capacity
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    const title = await page.title();
    const metaDescription = await page.$eval('meta[name="description"]', (element) => element.content);
    results.push({ url, title, metaDescription });
  });

  for (const url of urls) {
    cluster.queue(url);
  }

  await cluster.idle();
  await cluster.close();

  console.log(results);
})();
```


## 4. Understanding the Code

In this section, we'll delve into the code snippet provided above and understand how Puppeteer-Cluster enables concurrent web scraping.

First, we import the `Cluster` class from `puppeteer-cluster`. This class allows us to manage multiple browser instances concurrently.

```javascript
const { Cluster } = require('puppeteer-cluster');
```

Next, we define an array of URLs that we want to scrape concurrently:

```javascript
const urls = ['https://example.com', 'https://samplewebsite.com', 'https://awesomepage.com'];
```

We also create an empty array called `results` to store the scraping results:

```javascript
const results = [];
```

Now comes the exciting part – setting up the Puppeteer-Cluster. We create a new cluster instance with the desired concurrency level. In this example, we're using `CONCURRENCY_BROWSER` to create separate browser instances for each task and `maxConcurrency` set to 5 to run a maximum of 5 browser instances simultaneously. You can adjust this number based on your machine's capacity and performance requirements.

```javascript
const cluster = await Cluster.launch({
  concurrency: Cluster.CONCURRENCY_BROWSER,
  maxConcurrency: 5,
});
```

We define a task function that will be executed for each URL in the cluster. Inside this task, we navigate to the URL using `page.goto()`, extract the page title with `page.title()`, and retrieve the meta description using `page.$eval()`. The `data` parameter in the task function represents each URL from the `urls` array.

```javascript
await cluster.task(async ({ page, data: url }) => {
  await page.goto(url);
  const title = await page.title();
  const metaDescription = await page.$eval('meta[name="description"]', (element) => element.content);
  results.push({ url, title, metaDescription });
});
```

After defining the task function, we queue up each URL in the cluster using `cluster.queue(url)`. Puppeteer-Cluster will efficiently manage the concurrency and distribute the tasks across the available browser instances.

```javascript
for (const url of urls) {
  cluster.queue(url);
}
```

Next, we wait for the cluster to become idle, which means all tasks are completed and no more tasks are in progress:

```javascript
await cluster.idle();
```

Finally, we close the cluster to release the browser instances:

```javascript
await cluster.close();
```

The scraping results are stored in the `results` array, and we can log them to the console or process them further according to our requirements.


## 5. Conclusion and Summary

Congratulations, you've just unleashed the power of Puppeteer-Cluster and scraped web pages like a pro! With concurrency on your side, you can collect data faster and more efficiently. Whether you're scraping for research, competitive analysis, or pure curiosity, Puppeteer-Cluster has got your back.

In this article, we explored the exhilarating world of web scraping with Puppeteer-Cluster. We set up our development environment, delved into the magic of concurrency, and built a practical code example for simultaneous web scraping. Armed with the power of Puppeteer-Cluster, you're now equipped to scrape data like a true superhero developer!

So, what are you waiting for?

Happy scraping, folks! Chimichangas not included!