import { Reel } from './reel';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  spotifyId: string;
  friendIds: string[];
  reels: Reel[];
  email: string;
  profilePic: string | null;
  bio: string;
}
