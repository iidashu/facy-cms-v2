import firebase from "firebase";

//Firebase データベース　クエリ
//https://firebase.google.com/docs/database/admin/retrieve-data?hl=ja#top_of_page

export const Users = () => {
  const db = firebase.database();

  const getUsers = (order) => {
    return new Promise(async (resolved) => {
      const ref = await db.ref("/users");
      ref.on("value", (snapshot) => {
        const _users = snapshot.val();
        const users = Object.keys(_users).map((key) => {
          const user = _users[key];
          return {
            username: user.username,
            roll: user.roll,
            uid: user.uid,
            email: user.email
          };
        });
        resolved(users);
      });
    });
  };

  const updateUserProfile = async ({ uid, name, roll, email }) => {
    return new Promise(async (resolved) => {
      const result = await db.ref("users/" + uid).update(
        {
          username: name,
          roll,
          email
        },
        (error) => {
          if (error) {
            resolved({ result: false, error });
          } else {
            resolved({ result: true });
          }
        }
      );
    });
  };

  return {
    getUsers,
    updateUserProfile
  };
};
