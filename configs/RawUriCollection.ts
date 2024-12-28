interface RawUriCollection {
  [key: string]: string;
}

const RawUriCollection: RawUriCollection = {
  searchList: '/search/users?q=:query',
  user: '/users/:login',
  followers: '/users/:login/followers',
  following: '/users/:login/following',
};

export default RawUriCollection;
