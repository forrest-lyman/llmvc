LLMVC
=====

LLMVC is a full-stack platform built on React, Typescript and LLMs. This project is currently in 
planning / prototyping stage and is not ready to be used for production software.

Core Concepts
-------------

### Platform

We developed this package to make it easier to develop LLM powered applications that run across
a wide range of platforms. Initial target platforms include:

* NodeJS: the default platform, provides separate client / server environments that can run on any Node platform
* VSCode Extension: accelerate AI driven VSCode extension development
* Firebase: hosts the client package on Firebase hosting and serves the server package in Firebase Cloud Functions

You can also use any component of the framework independently.

### Controllers

Controllers handle application logic and communication between the views and models.

### Models

Models handle requesting and parsing data from the LLMs.

### Views

Views are React based UI components.

