import { sql } from "../../db";
import type {
  CreateIssuePayload,
  Issue,
  IssueQuery,
  SafeUser,
  UpdateIssuePayload,
  User,
} from "../../types";

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

export const getSingleIssueFromDB = async (id: number) => {
  const issues = (await sql`
        SELECT * FROM issues WHERE id = ${id}
        `) as Issue[];

  const issue = issues[0];
  if (!issues[0]) {
    return null;
  }

  const users = await sql`
  SELECT id, name, role
  FROM users
  WHERE id = ${issue?.reporter_id}
  `;
  const reporter = users[0];

  return {
    ...issue,
    reporter,
  };
};

export const updateIssueIntoDB = async (
  id: number,
  payload: UpdateIssuePayload,
  currentUser: SafeUser
) => {
  const issues = (await sql`
    SELECT *
    FROM issues
    WHERE id = ${id}
  `) as Issue[];

  const issue = issues[0];

  if (!issue) {
    return null;
  }

  if (currentUser.role === "contributor") {
    if (issue.reporter_id !== currentUser.id) {
      throw new Error("You can update only your own issues!");
    }

    if (issue.status !== "open") {
      throw new Error("You can only update open issues!");
    }
  }

  const title = payload.title ?? issue.title;
  const description = payload.description ?? issue.description;
  const type = payload.type ?? issue.type;
  const status = payload.status ?? issue.status;

  const result = (await sql`
    UPDATE issues
    SET
      title = ${title},
      description = ${description},
      type = ${type},
      status = ${status},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `) as Issue[];

  return result[0];
};

export const deleteIssueFromDB = async (id: number) => {
  const result = (await sql`
    DELETE FROM issues
    WHERE id = ${id}
    RETURNING *
  `) as Issue[];

  return result[0];
};
