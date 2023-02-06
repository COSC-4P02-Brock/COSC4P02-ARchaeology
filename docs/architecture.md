# Architecture

## Frontend

### Astro

Astro is an open source frontend meta framework that supports creating pre-rendered (static), server rendered (dynamic) and hybrid (static and dynamic) websites and web applications. It produces multi-page applications (MPA), which means that when you navigate to a new page, the browser requests a new page of HTML from the server.

Astro is UI framework agnostic, supporting, React, Vue, Svelte, Solid, and more. It uses an island architecture meaning that the frontend UI components are rendered to static HTML ahead of time and all JavaScript is stripped out, except for regions where interactivity is explicitly preserved. Not only does prerendering or server side rendering reduce the time to first paint and largest contentful paint, but this specific island architecture approach also reduces the JavaScript payload and the time to interactive since only parts of the page require rehydration by the UI framework, with most of the page being static HTML allowing for immediate user interaction.

- 🔗 [Website](https://astro.build)
- 📚 [Documentation](https://docs.astro.build/en/getting-started/)
- 💻 [Source Code](https://github.com/withastro/astro)

The ARchaeology frontend can be built with Astro allowing for the use of a UI framework for component-based development and to support rich interactivity for multimedia features. Support for server side rendering allows for improved SEO, easier handling of authentication, and safer use of databases and other services.

### Remix (Possible alternative to Astro)

Remix is an open source frontend meta framework that supportings creating server rendered (dynamic) websites and web applications. It produces single-page applications (SPA), which means that when you navigate to a new page, the applications renders the new page in your browser without making a roundtrip to the server (though it may still make a request to the server for data, additional javascript or css resources, or even partial HTML).

Unlike Astro, Remix is not UI framework agnostic (though that is a goal). It currently only supports React. It also does not uses client side hydration instead of an island architecture. In the case of Remix, this means that the application is rendered on the server to HTML which is delivered to the browser and after the browser downloads JavaScript, the application is rehydrated as a React app, where hydration adds interactivity and state. This menas tha the time to first paint and largest contentful paint is reduced compared to a purely client side application, however, time to interactive is increased as the page is not interactive until the application has rehydrated.

- 🔗 [Website](https://remix.run)
- 📚 [Documentation](https://remix.run/docs/en/v1)
- 💻 [Source Code](https://github.com/remix-run)

### Astro versus Remix

The ARchaeology frontend can be built with either Astro or Remix allowing for the use of a UI framework for component-based development and to support rich interactivity. Support for server-side rendering allows for improved SEO, easier handling of authentication and authorization, and safer use of databases and other services.

Astro may provide a slight edge in that we can minimize the amount of JavaScript delivered to the user and decrease time to interactivity without sacrificing developer experience.

Where Astro may have a disadvantage is in the development of features that need to persist across multiple pages. Since Astro replaces entire pages, it would be more difficult to create experiences that should persist between pages, such as having an audio player for listening to a podcast that should continue to play without interruption when navigating between pages. This is an area where SPAs shine; however, this does not seem likely to be an issue for the ARchaelogy app.

### Tailwind

Tailwind is an open source utility-based CSS framework where you "style" your website, web application, and/or components, by composing small utility classes in your HTML.

Tailwind is a highly configurable which would allow us to theme the web application based on the NOTL Museum brand; however, it provides strong defaults and a rigid system that helps to maintain a unified look and feel from component to component.

- 🔗 [Website](https://tailwindcss.com)
- 📚 [Documentation](https://tailwindcss.com/docs/installation)
- 💻 [Source Code](https://github.com/tailwindlabs/tailwindcss)

### Open Props

Open Props is an open source CSS variable system where you use CSS variables when creating your CSS for your website, web application, and/or components instead of hard-coding values.

Open Props is highly configurable which would allow us to theme the web application based on the NOTL Museum brand; however, it provides strong defaults that help to create unified look and feel from component to component.

- 🔗 [Website](https://open-props.style)
- 📚 [Documentation](https://open-props.style/#getting-started)
- 💻 [Source Code](https://github.com/argyleink/open-props)

### Tailwind versus Open Props

Both Tailwind and Open Props come with a lot of great looking defaults and have strong support for customization. Tailwind is very popular and utility classes allow for the application to be styled without writing CSS and is generally fast to work with. The downside to that is that it can lead to bloated HTML templates which can be hard to read and maintain. Open Props on the other hand, requires writing CSS which has its own issues to content with such as dealing with the cascade and naming things (however these issues are mitigated by CSS modules which both Astro and Remix support). 

### Storybook

Storybook is an open source interactive preview environment for UI components. It is UI framework agnostic and can be used with React, Vue, Svelte, etc. It will be used to help support the component-first development approach that ARchaeology team intends to follow.

- 🔗 [Website](https://storybook.js.org)
- 📚 [Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- 💻 [Source Code](https://github.com/storybookjs/storybook)

## Backend

### Supabase

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

More information:

- 🔗 [Website](https://www.supabase.com)
- 📚 [Documentation](https://supabase.com/docs/)
- 💻 [Source Code](https://github.com/supabase/supabase)

## Frontend Hosting

### Vercel

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

## Backend Hosting

### Supabase

Supabase offers a hosted version of its application development platform. It offers a free tier which should be sufficient for this project. It includes:

- Up to 500MB database
- Up to 1GB file storage with up to 50MB file uploads
- 50,000 monthly active users
- Up to 500,000 edge function invocations

The ARcheology backend will use the online offering of Supabase, rather than a self hosted instance.

- 🔗 [Website](https://supabase.com/)
- 📚 [Documentation](https://supabase.com/docs/)
