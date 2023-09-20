<p align="center">
    <a href="#about-application">About Application</a>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#technologies">Technologies</a>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#how-to-run">How to Run</a>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#project-status">Project Status</a>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#license">License</a>
</p>

</br>

![web-chat](https://github.com/shunny2/web-chat/assets/72872854/033d73ef-f088-438b-a13c-861d8722196f)

<p align="center">
    <a href="https://img.shields.io/github/stars/shunny2/web-chat?style=social"><img src="https://img.shields.io/github/stars/shunny2/web-chat?style=social" alt="Repo Stars"/></a>
    <a href="https://img.shields.io/github/forks/shunny2/web-chat?style=social"><img src="https://img.shields.io/github/forks/shunny2/web-chat?style=social" alt="Repo Forks"/></a>
    <a href="https://img.shields.io/github/license/shunny2/web-chat?style=social"><img src="https://img.shields.io/github/license/shunny2/web-chat?style=social" alt="License"/></a>
</p>

## About Application

<b>Web Chat</b> is a web application that allows users to communicate in real-time by exchanging messages. To ensure security and authenticity, we developed a Node.js [server](https://github.com/shunny2/jwt-prisma) that uses [JSON Web Token (JWT)](https://jwt.io/) technology to authenticate users. Additionally, we created another Node.js [server](https://github.com/shunny2/server-socket) dedicated exclusively to managing conversations between users. This server keeps a record of authenticated users and stores their corresponding messages, using [sockets](https://en.wikipedia.org/wiki/WebSocket) as the primary tool for exchanging information in real-time. Its principal function is to maintain open connections to enable a seamless and instant messaging experience between users.

## Technologies

<table>
  <thead>
  </thead>
  <tbody>
    <td>
      <a href="https://reactjs.org/" title="React"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/react-2.svg" alt="React logo image." /></a>
    </td>
    <td>
      <a href="https://www.typescriptlang.org/" title="TypeScript"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/typescript-2.svg" alt="Typescript logo image." /></a>
    </td>
    <td>
      <a href="https://tailwindcss.com/" title="Tailwind CSS"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" alt="Tailwind CSS logo image." /></a>
    </td>
    <td>
      <a href="https://socket.io/" title="Socket.io"><img width="128" height="128" src="https://socket.io/images/logo.svg" alt="Socket.io logo image." /></a>
    </td>
  </tbody>
</table>

## How to Run

First, start by cloning the repository:
```shell
git clone https://github.com/shunny2/web-chat/
```

Run the command below to install all dependencies:
```bash
npm install
```

Run the application (frontend):
```bash
npm start
```

Your application will be available at [Home](http://localhost:3000/)

## Project Status

> Status: Developing.

## License

This project is under an [MIT](https://opensource.org/licenses/MIT) license.

<hr/>

<p align="center">Created by <a href="https://github.com/shunny2"><b>Alexander Davis</b></a>.</p>
