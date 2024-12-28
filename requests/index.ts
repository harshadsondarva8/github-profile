import GetUsersList from './GetUsersList';
import GetUser from './GetUser';
import GetFollowers from './GetFollowers';
import GetFollowing from './GetFollowing';

interface Requests {
  GetUsersList: typeof GetUsersList;
  GetUser: typeof GetUser;
  GetFollowers: typeof GetFollowers;
  GetFollowing: typeof GetFollowing;
}

const Requests: Requests = {
  GetUsersList,
  GetUser,
  GetFollowers,
  GetFollowing,
};

export default Requests;
