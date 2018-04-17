---
sidebar: false
---

# myopenHAB
<div style="float: right; border: 1px solid black; background: lightgrey; padding: 80px; margin: 40px">Login or register box</div>


myopenHAB is an instance of the openHAB Cloud service, which is hosted by the openHAB Foundation e.V.

We are offering this service completely for free. It is meant to allow users to quickly check out its features without having to set up and host a personal instance.

Although it is mainly meant as a demonstrator, it is absolutely fine to use it for your production system as well. You must be aware though that we cannot offer any SLAs regarding availability etc, but we promise to keep it up and running to the best of our capabilities. Please read our Terms of Use for all details.

If you use and love this free service, please consider becoming a member of the openHAB Foundation or do a one-time donation, which will allow us to move forward and further work in the interest of the openHAB community!

## Features of the openHAB Cloud service

### Remote Accesss

It allows remote access to local openHAB instances without having to expose ports to the Internet or to require a complex VPN setup.

### Push Notifications

It serves as a connector to Google Cloud Messaging (GCM) and Apple Push Notifications (APN) for pushing notifications to mobile phone apps.

### 3rd Party App Integration

It brings integration possibilities with services that require an OAuth2 authentication against a web server, such as IFTTT or Amazon Alexa Skills.

## Setup and Configuration

### openHAB Runtime

In order to use myopenHAB, you will need to install and configure the openHAB Cloud Connector bundle on your local openHAB runtime. This bundle establishes the connection to myopenHAB.org and authenticates against it.

Please check the documentation for openHAB 1.8 or for openHAB 2 (requires a recent snapshot).

### Web Access

In order to use myopenHAB, you will need to install and configure the openHAB Cloud Connector bundle on your local openHAB runtime. This bundle establishes the connection to myopenHAB.org and authenticates against it.

Please check the documentation for openHAB 1.8 or for openHAB 2 (requires a recent snapshot).

### Mobile Apps

If you want to use myopenHAB through your native Android, iOS or Pebble apps, please enter "https://myopenhab.org" as a remote url and your myopenHAB account username and password as credentials.

### Push Notifications

Once you have set up your mobile app to connect to myopenHAB, it will automatically register itself to receive notifications. Now you can use special actions in your openHAB rules to send notifications:

Example: `sendNotification("your@email.address", "Hello world!")`

This will send a notification with "Hello world!" to your device. If you use multiply devices with the same account configured, all of them will receive this notifications.

Example: `sendBroadcastNotification("Hello world!")`

This will send a notification with "Hello world!" to all devices of all users of your myopenHAB account.

Example: `sendLogNotification("Hello world!")`

This will send a log notification with "Hello world!". Log notifications are not sent to devices, they are merely kept in the notifications list and are available in the notifications area of myopenHAB and the mobile apps.

You can test if notifications are correctly sent to any of your mobile devices by going to the devices section section and sending test message.

### Status Notifications

Every time your openHAB connects to myopenHAB or disconnects from it, you will automatically receive a notification to your devices telling you if openHAB is online or offline. myopenHAB has a 300 seconds (5 minute) delay on sending those notifications. When your openHAB goes offline we will wait for 5 minutes. If your openHAB goes online during this period, nothing will happen and we will not bother you. If not, we will notify you that your openHAB is offline.

### IFTTT

Activating IFTTT integration is easy. Just log in to your IFTTT account and activate the openHAB channel. You will be forwarded to the myopenHAB website to authorize the IFTTT channel connection. Before you start creating IFTTT recipes you need to make sure that you have your runtime configured to expose certain items to myopenHAB. Only those items will be visible to IFTTT. You will also be able to send commands to those items from IFTTT Applets. Items will appear in myopenHAB and thus in IFTTT only after at least one state update has been received by myopenHAB from your runtime.

You can delete the IFTTT authorization token in the myopenHAB "applications" section at any time.

### Amazon Echo

We have published an openHAB Alexa Smart Home skill, based on the code that is maintained by the community.

You can simply activate this skill in your Alexa app. You need to make sure that all items that you want to control through your Amazon Echo are correctly tagged (similar to the Homekit integration and that you have enabled remote access in your cloud connector.

The current skill is a pure smart home skill, i.e. it is not required to say "ask openhab", but you can directly say stuff like "turn the table light on".

Please note that the Amazon Echo integration only works with openHAB 2.

### Google Home

...