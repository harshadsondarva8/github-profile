interface RawUriCollection {
  [key: string]: string;
}

const RawUriCollection: RawUriCollection = {
  user: '/users/:login',
  followers: '/users/:login/followers',
  following: '/users/:login/following',
};

export default RawUriCollection;
