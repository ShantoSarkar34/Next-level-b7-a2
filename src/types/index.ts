const roles = ["contributor", "maintainer"] as const;
export type Role = typeof roles[number];

const issueTypes = ["bug", "feature_request"] as const;
export type IssueType = typeof issueTypes[number];

const statuses = ["open", "in_progress", "resolved"] as const;
export type Status = typeof statuses[number];

export type User = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
};

export type RUser = Omit<User, "id" | "created_at" | "updated_at" | "password_hash">;

export type Issue = {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: Status;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateIssuePayload = {
  title: string;
  description: string;
  type: IssueType;
};

export type IssueQuery = {
  sort?: string;
  type?: IssueType;
  status?: Status;
};

export type UpdateIssuePayload ={
  title?: string;
  description?:string;
  type?:IssueType;
  status?: "open" | "in_progress" | "resolved";
}