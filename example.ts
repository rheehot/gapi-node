import path from "path";
import GoogleApi from "./src";

const CREDENTIAL_PATH = path.resolve(__dirname, ".credentials", "wp.json");
const TOKEN_PATH = path.resolve(__dirname, ".credentials", "wp-token.json");

const SCOPE = [
  // gmail
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  // spreadsheets
  "https://www.googleapis.com/auth/spreadsheets"
];

main();

async function main() {
  const app = "wp";
  await GoogleApi.auth({
    credentialPath: CREDENTIAL_PATH,
    tokenPath: TOKEN_PATH,
    scope: SCOPE
  });

  const testLabelName = "CS테스트";
  const testQuery = "in:sent after:2019/10/11 before:2019/10/12";
  await testLabel(testLabelName);
  await testMessages(testQuery);

  async function testLabel(labelName) {
    console.log(`👉🏼 GET Label ID by Label ${labelName}`);
    const id = await GoogleApi.getLabelByName(labelName);
    console.log(id);
  }

  async function testMessages(q) {
    console.log(`👉🏼 GET Messages with query: ${q}`);
    const messages = await GoogleApi.getMessages({ q });
    console.log(messages);
  }
}
