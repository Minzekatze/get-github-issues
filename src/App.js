import React, { useState, useEffect } from "react";
import { Octokit } from "octokit";
import { RxRadiobutton } from "react-icons/rx";
import Labels from "./Labels";
import Comments from "./Comments";
import token from "./Token";

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: token(),
});

function App() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function loadIssues() {
      try {
        const result = await octokit.request(
          "GET /repos/{owner}/{repo}/issues",
          {
            owner: "facebook",
            repo: "create-react-app",
            per_page: 100,
            state: "open",
            since: "2023-02-15T00:00:01Z",
          }
        );
        console.log(
          `Success! Status: ${result.status}. Rate limit remaining: ${result.headers["x-ratelimit-remaining"]}`
        );
        return result;
      } catch (error) {
        console.log(
          `Error! Status: ${error.status}. Rate limit remaining: ${error.headers["x-ratelimit-remaining"]}. Message: ${error.response.data.message}`
        );
      }
    }
    async function waitLoadIssues() {
      const myData = await loadIssues();
      // setIssues();
      setIssues(myData.data);
    }
    waitLoadIssues();
  }, []);

  console.log(issues);

  return (
    <div className="container">
      <div className="d-flex flex-row align-items-center">
        <RxRadiobutton
          style={{
            fontSize: "1.25em",
            marginRight: "0.25em",
            marginBottom: "0.25em",
          }}
        />
        <h4>{issues.length} Open issues</h4>
      </div>
      <div className="card">
        <div className="card-header">
          <ul
            className="d-flex justify-content-between list-group-item"
            style={{ width: "60%", listStyleType: "none" }}
          >
            <li>Author</li>
            <li>Label</li>
            <li>Assignee</li>
            <li>Sort</li>
          </ul>
        </div>
        {issues?.map((issue) => (
          <div key={issue.id}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item list-group-item-action border flex-wrap">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="d-flex flex-row">
                      <RxRadiobutton
                        style={{
                          fontSize: "1.25em",
                          marginRight: "0.25em",
                          marginBottom: "0.25em",
                        }}
                      />
                      <h5>{issue.title}</h5>
                    </div>
                    <div>
                      <Labels issue={issue} />
                      <p>
                        #{issue.id} opened on {issue.created_at} by{" "}
                        {issue.user.login}
                      </p>
                    </div>
                  </div>
                  {issue.comments > 0 && <Comments issue={issue} />}
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
