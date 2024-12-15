import GetUser from './GetUser';
import GetFollowers from './GetFollowers';
import GetFollowing from './GetFollowing';

interface Requests {
  GetUser: typeof GetUser;
  GetFollowers: typeof GetFollowers;
  GetFollowing: typeof GetFollowing;
}

const Requests: Requests = {
  GetUser,
  GetFollowers,
  GetFollowing,
};

export default Requests;
