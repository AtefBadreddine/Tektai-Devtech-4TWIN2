# sendinblue-v3-node-client

The Best Unofficial SendinBlue V3 API Node.js Client

sendinblue-v3-node-client exposes the entire SendinBlue API. Please refer to the full official [documentation](https://developers.sendinblue.com) to learn more.

This is an unofficial wrapper for the API. It implements all the features of the API v3. It supports promises and callbacks.

## Installation

If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/).

```shell
npm i -S sendinblue-v3-node-client
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
let sib = require('sendinblue-v3-node-client')("YOUR_API_KEY")

sib.account.get(function(error, account) {
  if(error) console.log("Error: ", error)
  else console.log("Your Account Object: ", account)
})

// OR 

sib.account.get().then(function(account) {
  console.log("Your Account Object: ", account)
}).catch(function(error) {
  console.log("Error: ", error)
})
```

## Documentation for API Endpoints

All URIs are relative to *https://api.sendinblue.com/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**account.get**](https://developers.sendinblue.com/v3.0/reference#getaccount-7) | **GET** /account | Get your account informations, plans and credits details
[**resellers.children.all**](https://developers.sendinblue.com/v3.0/reference#getresellerchilds-6) | **GET** /reseller | Gets the list of all reseller&#39;s children accounts
[**resellers.children.create**](https://developers.sendinblue.com/v3.0/reference#createresellerchild-7) | **POST** /reseller | Creates a reseller child
[**resellers.children.get**](https://developers.sendinblue.com/v3.0/reference#getchildinfo-1) | **GET** /reseller | Gets the info about a specific child account
[**resellers.children.update**](https://developers.sendinblue.com/v3.0/reference#updateresellerchild-1) | **PUT** /reseller | Updates infos of reseller&#39;s child based on the childAuthKey supplied
[**resellers.children.delete**](https://developers.sendinblue.com/v3.0/reference#deleteresellerchild) | **DELETE** /reseller | Deletes a single reseller child based on the childAuthKey supplied
[**resellers.children.ips.associate**](https://developers.sendinblue.com/v3.0/reference#associateiptochild-1) | **POST** /reseller | Associate a dedicated IP to the child
[**resellers.children.ips.dissociate**](https://developers.sendinblue.com/v3.0/reference#dissociateipfromchild-1) | **POST** /reseller | Dissociate a dedicated IP to the child
[**resellers.children.credits.add**](https://developers.sendinblue.com/v3.0/reference#addcredits-1) | **POST** /reseller | Add Email and/or SMS credits to a specific child account
[**resellers.children.credits.remove**](https://developers.sendinblue.com/v3.0/reference#removecredits-1) | **POST** /reseller | Remove Email and/or SMS credits from a specific child account
[**senders.all**](https://developers.sendinblue.com/v3.0/reference#getsenders-1) | **GET** /senders | Return all the dedicated IPs for your account
[**senders.create**](https://developers.sendinblue.com/v3.0/reference#createsender) | **POST** /senders | Create a new sender
[**senders.update**](https://developers.sendinblue.com/v3.0/reference#updatesender) | **PUT** /senders | Update a sender
[**senders.delete**](https://developers.sendinblue.com/v3.0/reference#deletesender-1) | **DELETE** /senders | Delete a sender
[**senders.ips.get**](https://developers.sendinblue.com/v3.0/reference#getipsfromsender-1) | **GET** /senders | Return all the dedicated IPs for a sender
[**senders.ips.all**](https://developers.sendinblue.com/v3.0/reference#getips) | **GET** /senders | Get the list of all your senders
[**processes.all**](https://developers.sendinblue.com/v3.0/reference#getprocesses-1) | **GET** /processes | Return all the processes for your account
[**processes.get**](https://developers.sendinblue.com/v3.0/reference#getprocess-1) | **GET** /processes | Return the informations for a process
[**campaigns.all**](https://developers.sendinblue.com/v3.0/reference#getemailcampaigns-1) | **GET** /emailCampaigns | Return all your created campaigns
[**campaigns.get**](https://developers.sendinblue.com/v3.0/reference#getemailcampaign) | **GET** /emailCampaigns | Get campaign informations
[**campaigns.create**](https://developers.sendinblue.com/v3.0/reference#createemailcampaign-1) | **POST** /emailCampaigns | Create an email campaign
[**campaigns.update**](https://developers.sendinblue.com/v3.0/reference#updateemailcampaign) | **PUT** /emailCampaigns | Update a campaign
[**campaigns.delete**](https://developers.sendinblue.com/v3.0/reference#deleteemailcampaign) | **DELETE** /emailCampaigns | Delete an email campaign
[**campaigns.send**](https://developers.sendinblue.com/v3.0/reference#sendemailcampaignnow-1) | **POST** /emailCampaigns | Send an email campaign id of the campaign immediately
[**campaigns.test**](https://developers.sendinblue.com/v3.0/reference#sendtestemail-1) | **POST** /emailCampaigns | Send an email campaign to your test list
[**campaigns.export**](https://developers.sendinblue.com/v3.0/reference#emailexportrecipients) | **POST** /emailCampaigns | Export the recipients of a campaign
[**campaigns.report**](https://developers.sendinblue.com/v3.0/reference#sendreport-1) | **POST** /emailCampaigns | Send the report of a campaigns
[**campaigns.status**](https://developers.sendinblue.com/v3.0/reference#updatecampaignstatus) | **PUT** /emailCampaigns | Update a campaign status
[**smtp.activity.day**](https://developers.sendinblue.com/v3.0/reference#getsmtpreport-1) | **GET** /smtp | Get your SMTP activity aggregated per day
[**smtp.activity.custom**](https://developers.sendinblue.com/v3.0/reference#getaggregatedsmtpreport) | **GET** /smtp | Get your SMTP activity aggregated over a period of time
[**smtp.activity.all**](https://developers.sendinblue.com/v3.0/reference#getemaileventreport-1) | **GET** /smtp | Get all your SMTP activity (unaggregated events)
[**smtp.templates.all**](https://developers.sendinblue.com/v3.0/reference#getsmtptemplates) | **GET** /smtp | Get the list of SMTP templates
[**smtp.templates.create**](https://developers.sendinblue.com/v3.0/reference#createsmtptemplate) | **POST** /smtp | Create an smtp template
[**smtp.templates.get**](https://developers.sendinblue.com/v3.0/reference#getsmtptemplate-1) | **GET** /smtp | Returns the template informations
[**smtp.templates.update**](https://developers.sendinblue.com/v3.0/reference#updatesmtptemplate-1) | **PUT** /smtp | Updates an smtp templates
[**smtp.templates.delete**](https://developers.sendinblue.com/v3.0/reference#deletesmtptemplate) | **DELETE** /smtp | Delete an inactive smtp template
[**smtp.templates.test**](https://developers.sendinblue.com/v3.0/reference#sendtesttemplate-1) | **POST** /smtp | Send a template to your test list
[**smtp.templates.send**](https://developers.sendinblue.com/v3.0/reference#sendtemplate-1) | **POST** /smtp | Send a template
[**smtp.transactionals.send**](https://developers.sendinblue.com/v3.0/reference#sendtransacemail) | **POST** /smtp | Send a transactional email
[**smtp.hardbounces.delete**](https://developers.sendinblue.com/v3.0/reference#deletehardbounces-1) | **POST** /smtp | Delete hardbounces
[**webhooks.all**](https://developers.sendinblue.com/v3.0/reference#getwebhooks-1) | **GET** /webhooks | Get all webhooks
[**webhooks.create**](https://developers.sendinblue.com/v3.0/reference#createwebhook) | **POST** /webhooks | Create a webhook
[**webhooks.get**](https://developers.sendinblue.com/v3.0/reference#getwebhook-1) | **GET** /webhooks | Get a webhook details
[**webhooks.update**](https://developers.sendinblue.com/v3.0/reference#updatewebhook-1) | **PUT** /webhooks | Update a webhook
[**webhooks.delete**](https://developers.sendinblue.com/v3.0/reference#deletewebhook-1) | **DELETE** /webhooks | Delete a webhook
[**contacts.all**](https://developers.sendinblue.com/v3.0/reference#getcontacts-1) | **GET** /contacts | Get all the contacts
[**contacts.create**](https://developers.sendinblue.com/v3.0/reference#createcontact) | **POST** /contacts | Create a contact
[**contacts.get**](https://developers.sendinblue.com/v3.0/reference#getcontactinfo-1) | **GET** /contacts | Retrieves contact informations
[**contacts.update**](https://developers.sendinblue.com/v3.0/reference#updatecontact) | **PUT** /contacts | Updates a contact
[**contacts.delete**](https://developers.sendinblue.com/v3.0/reference#deletecontact) | **DELETE** /contacts | Deletes a contact
[**contacts.statistics**](https://developers.sendinblue.com/v3.0/reference#getcontactstats) | **GET** /contacts | Get the campaigns statistics for a contact
[**contacts.attributes.all**](https://developers.sendinblue.com/v3.0/reference#getattributes-1) | **GET** /contacts | Lists all attributes
[**contacts.attributes.create**](https://developers.sendinblue.com/v3.0/reference#createattribute-1) | **POST** /contacts | Creates contact attribute
[**contacts.attributes.update**](https://developers.sendinblue.com/v3.0/reference#updateattribute) | **PUT** /contacts | Updates contact attribute
[**contacts.attributes.delete**](https://developers.sendinblue.com/v3.0/reference#deleteattribute-1) | **DELETE** /contacts | Deletes an attribute
[**contacts.folders.all**](https://developers.sendinblue.com/v3.0/reference#getfolders-1) | **GET** /contacts | Get all the folders
[**contacts.folders.create**](https://developers.sendinblue.com/v3.0/reference#createfolder) | **POST** /contacts | Create a folder
[**contacts.folders.get**](https://developers.sendinblue.com/v3.0/reference#getfolder-1) | **GET** /contacts | Returns folder details
[**contacts.folders.update**](https://developers.sendinblue.com/v3.0/reference#updatefolder-1) | **PUT** /contacts | Update a contact folder
[**contacts.folders.delete**](https://developers.sendinblue.com/v3.0/reference#deletefolder-1) | **DELETE** /contacts | Delete a folder (and all its lists)
[**contacts.folders.lists**](https://developers.sendinblue.com/v3.0/reference#getfolderlists-1) | **GET** /contacts | Get the lists in a folder
[**contacts.lists.all**](https://developers.sendinblue.com/v3.0/reference#getlists-1) | **GET** /contacts | Get all the lists
[**contacts.lists.create**](https://developers.sendinblue.com/v3.0/reference#createlist-1) | **POST** /contacts | Create a list
[**contacts.lists.get**](https://developers.sendinblue.com/v3.0/reference#getlist-1) | **GET** /contacts | Get the details of a list
[**contacts.lists.update**](https://developers.sendinblue.com/v3.0/reference#updatelist) | **PUT** /contacts | Update a list
[**contacts.lists.delete**](https://developers.sendinblue.com/v3.0/reference#deletelist-1) | **DELETE** /contacts | Delete a list
[**contacts.lists.contacts.get**](https://developers.sendinblue.com/v3.0/reference#getcontactsfromlist) | **GET** /contacts | Get the contacts in a list
[**contacts.lists.contacts.add**](https://developers.sendinblue.com/v3.0/reference#addcontacttolist-1) | **POST** /contacts | Add existing contacts to a list
[**contacts.lists.contacts.remove**](https://developers.sendinblue.com/v3.0/reference#removecontactfromlist) | **POST** /contacts | Remove existing contacts from a list
[**contacts.export**](https://developers.sendinblue.com/v3.0/reference#requestcontactexport-1) | **POST** /contacts | Export contacts
[**contacts.import**](https://developers.sendinblue.com/v3.0/reference#importcontacts-1) | **POST** /contacts | Import contacts
[**sms.send**](https://developers.sendinblue.com/v3.0/reference#sendtransacsms-1) | **POST** /transactionalSMS | Send the SMS campaign to the specified mobile number
[**sms.all**](https://developers.sendinblue.com/v3.0/reference#getsmsevents-1) | **GET** /transactionalSMS | Get all the SMS activity (unaggregated events)
[**sms.custom**](https://developers.sendinblue.com/v3.0/reference#gettransacaggregatedsmsreport-1) | **GET** /transactionalSMS | Get your SMS activity aggregated over a period of time
[**sms.day**](https://developers.sendinblue.com/v3.0/reference#gettransacsmsreport-1) | **GET** /transactionalSMS | Get your SMS activity aggregated per day

## Advanced

Using `path`, `query`, and `body` parameters.

```javascript
// sib.path.to.endpoint([path_params],[query_params],[body_params],[callback])

// Get all contacts
sib.contacts.all({
  limit: 50,  // query_param
  offset: 0   // query_param
}, function(error, contacts) {
  if(error) console.log("Error: ", error)
  else console.log("All Contacts: ", JSON.stringify(contacts, null, 2))
})

// Create new contact
sib.contacts.create({
  email: "johndoe@gmail.com", // body_param
}, function(error, newContact) {
  if(error) console.log("Error: ", error)
  else console.log("New Contact: ", JSON.stringify(newContact, null, 2))
})

// Updates a contact
sib.contacts.update("johndoe%40gmail.com", {
  emailBlacklisted: true
}, function(error, newContact) {
  if(error) console.log("Error: ", error)
  else console.log("Updated Contact: ", JSON.stringify(newContact, null, 2))
})
```

## Support and Feedback

Be sure to visit the SendinBlue official [documentation website](https://sendinblue.readme.io/docs) for additional information about the official API.

If you find a bug, please post the issue on [Github](https://github.com/luiscarbonell/sendinblue-v3-node-client/issues).

If you have any questions or comments, feel free to drop us a note [here](mailto:people@liquidcarrot.io).
