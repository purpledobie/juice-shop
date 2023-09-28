# Pre-reqs
1. Make sure Snyk CLI is updated
2. Code itself is pretty simple - it's a javascript app
3. Open Source:
  * Open `package.json` and make sure the line `"nemo-appium": "0.0.8",` is NOT in the file (we'll add it back during the demo)
4. Container:
  * The Purple Dobie org already has the "custom base images" needed for the Snyk Container demo - make sure they're not gone. Look for `purpledobie/juice-shop` CLI results
    * Debian image - 2 custom base image recs -- 1.18 and 1.22
    * Base images are projects `purpledobie/node-base` and there are two subprojects that should match versions above. They're really olde images. They have a ton of vulns. 
    * 📋 TODO: Would love to get to a modern version of Node for this app!
  * Make sure you have a Docker client on your machine (Docker Desktop, Rancher Desktop - whatever you like to build and manage container images)
  * Check to see if the `purpledobie/juice-shop` image exists locally - if not, build it.
    * The Dockerfile _should_ be using `purpledobie/node-base:1.18` as the parent. If not, change the FROM line
    * `docker build -t purpledobie/juice-shop .`
5. IaC:
  * For simple IaC scans, everything is good as is...but results will be basic.
  * For better scans, with the cloud context, you'll need access to an active cloud environment
    * `--snyk-cloud-environment=3b37a615-97dd-466f-ba2e-91aac91a032a` was used in a previous demo...not currently working 📋
6. Insights & Ent Analytics - make sure you have access to orgs with these turned on. `Goof Enterprises`, the SE org, works fine


# Get ready to demo
* Container pre-scans (they take a minute or two & are boring too watch run live)
  * Open a terminal window - you'll end up with many tabs, each representing a better & better workflow for a dev
  * First term tab: - run `snyk container test purpledobie/juice-shop --exclude-app-vulns`
    * Result will have hundreds of vulns...it'll show recs to upgrade based on Docker base images which we're not using directly in this case
    * We ignore all the app vulns b/c we'll cover those in Snyk Open Source demo, where they make more sense
  * 2nd term tab: run `snyk container test purpledobie/juice-shop --file=Dockerfile --exclude-base-image-vulns --exclude-app-vulns`
    * Now it should pick up the custom base image (purpledobie/node-base:1.18) and recommend the 1.22 version
    * Should also ignore display of any vulns that are -not- part of the base img (that is, it only shows vulns that the DEV is responsible for...which should be very close to 0)
* IaC pre-scans - these run fast but good to get them out of the way ahead of time just to make sure they work as expected
  * We cannot show of the cloud context results in the IDE so we run the IaC tests at the CLI
  * 3rd term tab: run `snyk iac test`
  * 4th term tab: `snyk iac test --snyk-cloud-environment=3b37a615-97dd-466f-ba2e-91aac91a032a --org=34c8f01d-ae1a-423d-a205-6eff50be87a6 .`

  # Demo steps
  1. Dev workflow
    * IDE
      * AI
        * Generate code in `routes/baskets.js` - prompt with `// create and export a function to delete a basket` and Copilot should produce some stuff
        * Snyk Code should run on save
      * Code issues - `fileUpload.js`
        * line 49 - dir traversal - issue & analysis & fixes


        // create and export a function to delete a basket

        `"nemo-appium": "0.0.8",`

    
