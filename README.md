<!-- PROJECT BIEF -->
<br />
<div align="center">
  <h3 align="center">
    <a href="https://github.com/ngocchu153/primer">
      Primier
    </a>
  </h3>

  <p align="center">
    A web application to find largest prime number less than user input interger
    <br />
    <a href="https://primer.ngocchu.dev/api-docs"><strong>Explore API docs »</strong></a>
  </p>
</div>

[![Product Name Screen Shot][product-screenshot]](https://primer.ngocchu.dev)

<!-- ABOUT THE PROJECT -->
## About The Project

Tradeoffs and design decisions:

- The requirements is using TypeScript and ReactJS, with the basic use case of input a number and get the result. Therefore, I decided to go with NextJS which have everything I need.
- Algorithm:
  - Build an Eratosthenes seive to store whether a number in range of 0 to $10^6$ on runtime and store in server memory.
  - The array of $10^6$ + 1 element is relatively cheap and fast to build. Bring it to Redis may be slower due to network parsing process, and also the cost of maintaining and monitoring.
  - When the input number is larger than $10^6$ and smaller than $10^{53}$ - 1, fallback to use the algorithm with complexity O(k\*$\sqrt{n}$) with `n` is the input and `k` is constant.
- FrontEnd:
  - [TailwindCSS][tailwindcss-url] because its fast & simple.
- BackEnd:
  - [NextJS][next-url] with custom ExpressJS server for Rate Limiting middleware & initialize other services (if needed). The response send to FrontEnd with headers Cache-Control for a year, since the result will never change for the same input.
  - [Winston](https://github.com/winstonjs/winston) for logger with log rotation config. It could be easily migrate to log streaming of a cloud service provider later.
- Deployment: they are simply too famous
  - [Digital Ocean][digitalocean-url] for hosting.
  - [PM2][pm2-url] for clustering and process management.
  - [Docker][docker-url] for containerization.
  - [GitHub Actions][github-action-url] for CI/CD.

Besides, there are a few things I couldn't finished, I'll mark them as Future Works below.

<br />

### Built With

This project is built with:

- [![Next][next.js]][next-url]
- [![React][react.js]][react-url]

and running on

- [![Digital Ocean][digitalocean]][digitalocean-url]

<br />

<!-- GETTING STARTED -->
## Getting Started

Follow these simple steps to setting up the project locally:

### Prerequisites
You shall install these on your local machine:

- [NodeJS](https://nodejs.org/) version >= 16
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ngocchu153/primer
   ```
2. Install dependencies
   ```sh
   yarn install
   ```
3. Run on your machine
   ```sh
   yarn dev
   ```
4. To deploy on Digital Ocean, you need to update Github Secrets to your own credetials

<br />

<!-- FUTURE WORKS -->

## Future works

- [x] Config NGIИX & map current IP to a proper domain
- [ ] Benmark current solution vs using worker threads
- [ ] Add e2e testing
- [ ] Add tracing & metric
- [ ] Multi-language support with i18n

<br/>

<!-- CONTACT -->

## Contact

Ngoc Chu - [LinkedIn][linkedin-url]

<br/>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ngocchu153
[product-screenshot]: images/primer.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[digitalocean]: https://www.digitalocean.com/_next/static/media/logo.87a8f3b8.svg
[digitalocean-url]: https://www.digitalocean.com
[react-url]: https://reactjs.org/
[pm2-url]: https://pm2.keymetrics.io/
[tailwindcss-url]: https://tailwindcss.com/
[docker-url]: https://www.docker.com/
[github-action-url]: https://github.com/features/actions
