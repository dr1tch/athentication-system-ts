const users: IUser[] = [
  {
    email: "john.doe@gmail.com",
    password: "john.doe123",
    username: "dr1tch",
    firstName: "John",
    lastName: "Doe",
  },
];

// const dr1tch = await User.create({ firstName: "Jane", lastName: "Doe" });
// console.log("Jane's auto-generated ID:", jane.id);

export const sessions: Record<
  string,
  { sessionId: string; email: string; valid: boolean }
> = {};

export function getSession(sessionId: string) {
  console.log("sessions", sessions);
  const session = sessions[sessionId];

  return session && session.valid ? session : null;
}

export function invalidateSession(sessionId: string) {
  const session = sessions[sessionId];

  if (session) {
    sessions[sessionId].valid = false;
  }

  return sessions[sessionId];
}

export function createSession(email: string, username: string) {
  const sessionId = String(Object.keys(sessions).length + 1);

  const session = { sessionId, email, valid: true, username };

  sessions[sessionId] = session;

  return session;
}

export function getUser(email: string) {
  return users.find((user) => user.email === email);
}
