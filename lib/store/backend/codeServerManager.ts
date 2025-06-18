import { exec } from "child_process";

interface CodeServerInstance {
  url: string;
  password: string;
  containerId: string;
  port: number;
}

function getRandomPort(min = 10000, max = 20000) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generatePassword(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export async function startCodeServer(userId: string): Promise<CodeServerInstance> {
  const port = getRandomPort();
  const password = generatePassword();
  const containerName = `code-server-${userId}-${Date.now()}`;

  const cmd = [
    "docker run -d",
    `--name ${containerName}`,
    `-e PASSWORD=${password}`,
    `-p ${port}:8080`,
    "codercom/code-server:latest"
  ].join(" ");

  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(stderr || err);
        return;
      }
      const containerId = stdout.trim();
      const url = `http://localhost:${port}/?folder=/home/coder/project`;
      resolve({ url, password, containerId, port });
    });
  });
}

// Optionally, add stopCodeServer for cleanup
export async function stopCodeServer(containerId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`docker rm -f ${containerId}`, (err, stdout, stderr) => {
      if (err) reject(stderr || err);
      else resolve();
    });
  });
}