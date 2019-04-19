import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { convertSqlUser } from '../util/sql-user-converter';
import { convertSqlRole } from '../util/sql-role-converter';

export async function findByUsernameAndPassword(username: string, password: string) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const queryString = `SELECT * FROM project1.users as us
      INNER JOIN project1.roles as ro ON (us.user_role = ro.roleid)
      WHERE username = $1 AND user_password = $2`;
    const result = await client.query(queryString, [username, password]);
    const user = convertSqlUser(result.rows[0]);
    if (user) {
     user.role = convertSqlRole(result.rows[0]);
      return (user);
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}

export async function findUsersById(userid: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `Select * From project1.users as us1
        INNER JOIN project1.roles as ro ON (us1.user_role = ro.roleid)
        WHERE us1.userid = $1`;
        const result = await client.query(queryString, [userid]);
        return result.rows[0];
    } catch (err) {
      console.log(err);
      return undefined;
    } finally {
      client && client.release();
    }
}

export async function findUsers() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `Select * From project1.users as us
        INNER JOIN project1.roles as ro ON (us.user_role = ro.roleid)`;
        const result = await client.query(queryString);
        return result.rows;
    }
    catch (err) {
    console.log(err);
    return undefined;
    } finally {
        client && client.release();
    }
}

export async function updateUsers(userid, username, user_password, first_name, last_name, email, user_role) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const queryString = `Update project1.users
    set username = $1, user_password = $2, first_name = $3, last_name = $4, email = $5, user_role = $6
    where users.userid = $7;`;
    await client.query(queryString, [username, user_password, first_name, last_name, email, user_role, userid]);
  }
  catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
  }

  export async function findReimbursementByAuthor(author) {
    let client: PoolClient;
    try {
      client = await connectionPool.connect();
      const queryString = `Select * From project1.reimbursement
      WHERE author = $1 Order By datesubmitted ASC`;
      const reAuthor = await client.query(queryString, [author]);
      return reAuthor.rows[0];
    }
    catch (err) {
      console.log(err);
      return undefined;
    } finally {
      client && client.release();
    }
    }

    export async function findReimbursementByStatus(status) {
      let client: PoolClient;
      try {
        client = await connectionPool.connect();
        const queryString = `Select * From project1.reimbursement
        WHERE status = $1 Order By datesubmitted ASC`;
        const reAuthor = await client.query(queryString, [status]);
        return reAuthor.rows;
      }
      catch (err) {
        console.log(err);
        return undefined;
      } finally {
        client && client.release();
      }
      }

      export async function updateReimbursement(author, amount, datesubmitted, dateresolved, description,
        resolver, status, type, reimbursementid) {
        let client: PoolClient;
        try {
          client = await connectionPool.connect();
          const queryString = `Update project1.reimbursement
          set author = $1, amount = $2, datesubmitted = $3, dateresolved = $4, description = $5, resolver = $6, status = $7, type = $8
          where reimbursementid = $9`;
          const reAuthor = await client.query(queryString, [author, amount, datesubmitted, dateresolved,
            description, resolver, status, type, reimbursementid]);
          return reAuthor.rows[0];
        }
        catch (err) {
          console.log(err);
          return undefined;
        } finally {
          client && client.release();
        }
        }

        export async function findReimbursementById(reimbursementid) {
          let client: PoolClient;
          try {
            client = await connectionPool.connect();
            const queryString = `Select * From project1.reimbursement
            WHERE reimbursementid = $1`;
            const reBurse = await client.query(queryString, [reimbursementid]);
            return reBurse.rows[0];
          }
          catch (err) {
            console.log(err);
            return undefined;
          } finally {
            client && client.release();
          }
          }

          export async function createReimbursement(author, amount, datesubmitted, dateresolved, description,
            resolver, status, type) {
            let client: PoolClient;
            try {
              client = await connectionPool.connect();
              const queryString = `insert into reimbursement (userid, author, datesubmitted, datesresolved, description, resolver, status, type)
              values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
               const result = await client.query(queryString, [author, amount, datesubmitted, dateresolved,
                description, resolver, status, type]);
                return result.rows[0];
            }
            catch (err) {
              console.log(err);
              return undefined;
            } finally {
              client && client.release();
            }
            }