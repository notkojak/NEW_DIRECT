import { profiles } from './profiles.js';

export const getProfileBySlug = (slug) => {
  // Default to the first profile if slug doesn't exist
  return profiles[slug] || profiles.pauline;
}; 
