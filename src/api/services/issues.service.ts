import { sql } from "../../db";
import type { CreateIssuePayload, Issue, IssueQuery } from "../../types";

export const createIssueIntoDB = async (
  payload: CreateIssuePayload,
  reporter_id: number
) => {
  const { title, description, type } = payload;
  const result = await sql`
    INSERT INTO issues(
    title,
    description,
    type,
    reporter_id
    )
    VALUES (
    ${title},
    ${description},
    ${type},
    ${reporter_id}
    )
    RETURNING *
    `;
  return result[0];
};

export const getAllIssuesFromDB = async (query: IssueQuery) => {
  const { sort, type, status } = query;

  const orderBy = sort === "oldest" ? sql`ASC` : sql`DESC`;

  let issues = [] as Issue[];

  if (type && status) {
    issues = (await sql`
      SELECT *
      FROM issues
      WHERE type = ${type}
      AND status = ${status}
      ORDER BY created_at ${orderBy}
    `) as Issue[];
  } else if (type) {
    issues = (await sql`
      SELECT *
      FROM issues
      WHERE type = ${type}
      ORDER BY created_at ${orderBy}
    `) as Issue[];
  } else if (status) {
    issues = (await sql`
      SELECT *
      FROM issues
      WHERE status = ${status}
      ORDER BY created_at ${orderBy}
    `) as Issue[];
  } else {
    issues = (await sql`
      SELECT *
      FROM issues
      ORDER BY created_at ${orderBy}
    `) as Issue[];
  }

  const reporterIds = [
    ...new Set(issues.map((issue: Issue) => issue.reporter_id)),
  ];

  const users = await sql`
    SELECT id, name, role
    FROM users
    WHERE id = ANY(${reporterIds})
  `;

  const formattedIssues = issues.map((issue: Issue) => {
    const reporter = users.find((user) => user.id === issue.reporter_id);

    return {
      ...issue,
      reporter,
    };
  });

  return formattedIssues;
};
