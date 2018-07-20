# amazon-product-buylist

> A buylist for activities that finds and lists all the Amazon products you'll need to partake of mentioned activities.

What does that mean?

Well, you ever look up a how-to article to, say, make apple cider at home or a motion activated water cannon for the pigeons on your balcony? And then have you ever wondered what exactly you needed to buy to make it all work?

Yeah.

This is meant to create buylists for those types of projects and activities.

So when you visit the site you'll see a few already made buylists; maybe you want to make your own buylist, right? It's pretty straightforward. Just type your desired buylist's activity into your browser's url input after a frontslash `/` like this:
```
https://product-search-4aa25.firebaseapp.com/your activity here
```
Like, if you did this...
```
https://product-search-4aa25.firebaseapp.com/get revenge on the hissing cat down the street
```
...you'd be making a buylist to *Get revenge on the hissing cat down the street*. Afterwhich you'd probably want to start adding these Amazon ASIN product codes to your list: [B00DS3PU88](https://www.amazon.ca/Frontiersman-XTRA-Bear-Spray-Holster/dp/B00DS3PU88/ref=sr_1_6?ie=UTF8&qid=1532057750&sr=8-6&keywords=mace), [B01N4SVOYN](https://www.amazon.ca/15-Grizzly-Bear-Trap-Beamshot/dp/B01N4SVOYN/ref=sr_1_2?s=sports&ie=UTF8&qid=1532057786&sr=1-2&keywords=bear+trap), [B01CTA2EYS](https://www.amazon.ca/Reckitt-Benckiser-1920089479-Station-Refills/dp/B01CTA2EYS/ref=sr_1_2?s=sports&ie=UTF8&qid=1532057848&sr=1-2&keywords=rat+poison)

[Visit the live site and give it a whirl.](https://product-search-4aa25.firebaseapp.com)

## Build Setup



``` bash
# clone project into current directory
git clone git@github.com:romanchukenator/jungle-scout-take-home.git ./

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```
I didn't add the config files for firebase, google cloud functions or my Amazon keys to the .gitignore figuring getting this up and running on your local machine shouldn't be a headache of signing up to a firebase account and going through the hoops of lucking into a set of Amazon keys.

Please don't go around distributing these keys. Please.

## If you're interested...



``` bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
