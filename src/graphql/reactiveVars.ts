import { makeVar } from "@apollo/client";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "DONE";

export const statusVar = makeVar<TaskStatus | undefined>(undefined);
export const sortByVar = makeVar<string | undefined>(undefined);