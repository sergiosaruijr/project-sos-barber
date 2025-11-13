[LICENSE__BADGE]: https://img.shields.io/github/license/Fernanda-Kipper/Readme-Templates?style=for-the-badge
[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[REACT__BADGE]: https://img.shields.io/badge/React-005CFE?style=for-the-badge&logo=react
[PROJECT__BADGE]: https://img.shields.io/badge/📱Visit_this_project-000?style=for-the-badge&logo=project
[PROJECT__URL]: [https://github.com/sergiosaruijr/project-sos-barber](https://project-sos-barber.vercel.app/)
[NODE_BADGE]:https://img.shields.io/badge/node.js-20.16.0-43853D?style=for-the-badge&logo=node.js

<h1 align="center" style="font-weight: bold;">Project SOS Barber</h1>

![license][LICENSE__BADGE]
![react][REACT__BADGE]
![typescript][TYPESCRIPT__BADGE]
![javascript][JAVASCRIPT__BADGE]
![node][NODE_BADGE]

<details open="open">
<summary>Table of Contents</summary>
 
- [📌 About](#started)
- [🚀 Getting started](#started)
  - [Prerequisites](#prerequisites)
  - [Cloning](#cloning)
  - [Starting](#starting)
- [📍 Application Routes](#routes)
  
</details>


<p align="center">
    <img src="https://github.com/sergiosaruijr/project-sos-barber/blob/main/public/Home.png?raw=true" alt="Home" width="400px">

</p>

<h2 id="started">📌 About</h2>

This is a full-stack project built with Next.js and Node.js, designed to simplify the connection between clients and barbershop professionals. The platform delivers an intuitive and user-friendly experience, allowing users to browse available time slots across different barbershops, select the desired service, and schedule appointments quickly and efficiently.

Users can perform customized searches, filtering barbershops by specific services and ratings to find the best match for their needs. Each barbershop features a dedicated profile page with detailed information about services, prices, and photos — helping clients make well-informed choices.

[![project][PROJECT__BADGE]][PROJECT__URL]

<h2 id="started">🚀 Getting started</h2>

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<h3>Prerequisites</h3>

- [NodeJS](https://github.com/)

<h3>Cloning</h3>

How to clone your project

```bash
git clone https://github.com/sergiosaruijr/project-sos-barber
```

<h3>Starting</h3>

How to start your project

```bash
cd project-sos-barber
npm run dev
```

<h2 id="routes">📍 Application Routes</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>/bookings</kbd>     | page that list all bookings
| <kbd>/barbershops/{id}</kbd>     | profile page with detailed information and booking system.
