# Architecture

## Overview

ARchaeology is a web application built with a Jamstack architecture, which separates the business logic and data layer from the web experience layer. See [jamstack.org](https://www.jamstack.org) for more information on this architectural approach.

In the case of ARchaelogy, the web experience is to be implemented in the Astro framework using the React UI library and Tailwind CSS framework. ARchaelogy will be hosted on Vercel and use edge functions (isolated javascript runtimes in a CDN) to server render HTML pages, serve prerendered HTML pages from the CDN, and server other static assets (i.e. scripts, stylesheets, images) from the CDN. This is the separated web experience part of Jamstack.

As per the Jamstack architecture, the business logic and data is composed from third party services via APIs. The business logic will be implemented in Serverless functions in Vercel's data centeres. The data will be stored in a postgresql database managed by the Supabase application development service.

      ┌───────────────────────────────────────────────────┐
      │                                                   │
      │   ┌────────────┐                                  │
      │┌─▶│File storage│      Supabase                    │
      ││  └────────────┘                                  │
      ││         ▲                        ┌───────────┐   │
      ││      ┌──┼───────────────────────▶│ Database  │   │
      ││      │  │                        └───────────┘   │
      ││      │  │                              ▲         │
      ││      │  │                              │         │
      └┼──────┼──┼──────────────────────────────┼─────────┘
       └──────┤  │                              │
              │  └────────────────┐             │
              │                   ├─────────────┘
┌─────────────┼───────────────────┼───────────────────────────────┐
│             │                   │    Vercel                     │
│             │                   │                               │
│ ┌──────────────────────┐        │      ┌──────────────────────┐ │
│ │ Serverless Functions │        │      │ Static File Storage  │ │
│ └──────────────────────┘        │      └──────────────────────┘ │
│             ▲           ┌──────────────┐           ▲            │
│             └───────────│Edge Functions│───────────┤            │
│                         └──────────────┘           │            │
│                                 ▲                  │            │
└─────────────────────────────────┼──────────────────┼────────────┘
                                  │                  │
                                  │                  │
                                  │                  │
                          ┌──────────────┐           │
                          │ Web Browser  │───────────┘
                          └──────────────┘

## Frontend

### Languages

- TypeScript
- HTML
- CSS

### Frameworks

#### Remix

Remix is an open source frontend meta framework that supportings creating server rendered (dynamic) websites and web applications. It produces single-page applications (SPA), which means that when you navigate to a new page, the applications renders the new page in your browser without making a roundtrip to the server (though it may still make a request to the server for data, additional javascript or css resources, or even partial HTML).

 - 🔗 [Website](https://remix.run)
 - 📚 [Documentation](https://remix.run/docs/en/v1)
 - 💻 [Source Code](https://github.com/remix-run)

#### Tailwind

Tailwind is an open source utility-based CSS framework where you "style" your website, web application, and/or components, by composing small utility classes in your HTML.

Tailwind is a highly configurable which would allow us to theme the web application based on the NOTL Museum brand; however, it provides strong defaults and a rigid system that helps to maintain a unified look and feel from component to component.

- 🔗 [Website](https://tailwindcss.com)
- 📚 [Documentation](https://tailwindcss.com/docs/installation)
- 💻 [Source Code](https://github.com/tailwindlabs/tailwindcss)

### Tools

#### Storybook

Storybook is an open source interactive preview environment for UI components. It is UI framework agnostic and can be used with React, Vue, Svelte, etc. It will be used to help support the component-first development approach that ARchaeology team intends to follow.

- 🔗 [Website](https://storybook.js.org)
- 📚 [Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- 💻 [Source Code](https://github.com/storybookjs/storybook)

### Hosting

Vercel is a hosting provider focused on hosting frontend web applications, offering:

- A content delivery network that is responsible for routing requests to static files in the CDN and serverless functions
- Edge functions that are executed within the CDN (edge functions are run in an isolated V8 runtime)
- Serverless functions that are deployed in a specific region (serverless functions are available for NodeJS, Go, Python, and Ruby)
- Caching for content in the CDN and for responses from serverless functions
- Automatic builds and deployments for production (main branch)
- Automatic builds deployments for previews (features branches)

Vercel has a free tier that should be adequate for this project. It includes:

- 500,000 edge function executions
- 1,000,000 edge middleware incovations
- 100 GB-hours of serveless function execution with 10-second maximum execution time per invocation
- 6,000 build minutes
- 100GB of bandwidth

The ARcheology frontend will be hosted on Vercel, utilizing edge functions to fetch data from the Supabase instance and to server render HTML pages. Stylesheets, JavaScript, and other static assets will be served via the CDN. Serverless functions may be used to support tasks such as sending email.

Note: Astro has an [adapter for deploying to Vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/).

- 🔗 [Website](https://vercel.com)
- 📚 [Documentation](https://vercel.com/docs)

## Backend

### Languages

- TypeScript
- SQL

### Services

#### Supabase

Supabase is an open source alternative to Google's Firebase application development platform. The most notable difference between Supabase and Firebase is that Supabase uses Postgres as its database, whereas Firebase uses a NoSQL database.

Supabase offers a number of features supporting modern web application development, including:

- Authentication
- REST and GraphQL APIs for accessing data from the Postgres database
- REST API for managing the Postgres database
- A Postgres connection pooler which prevents creating a new database connection on request
- Realtime API for user presence, broading messages, and streaming database changes to connected clients
- Amazon S3-compatible object storage
- Support for running server-side TypeScript functions distributed globally at the edge (i.e. edge functions)

In addition, Supabase allows direct, full access to the underlying Postgres database.

Supabase offers a hosted version of its application development platform. It offers a free tier which should be sufficient for this project. It includes:

- Up to 5000MB database
- Up to 1GB file storage with up to 50MB file uploads
- 50,000 monthly active users
- Up to 500,000 edge function invocations

### Hosting

Since the ARChaeology backed is a hosted service, there should be no need for a hosting provider.
