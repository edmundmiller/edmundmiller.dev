import { getKnownAuthor } from '../data/authors';

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
}

export interface AuthorInfo {
  username: string;
  displayName: string;
  githubUrl: string;
  avatarUrl?: string;
  bio?: string;
  website?: string;
}

// Cache for GitHub user data to avoid excessive API calls
const userCache = new Map<string, GitHubUser>();

/**
 * Fetch GitHub user information
 * @param username GitHub username
 * @returns Promise<GitHubUser | null>
 */
export async function fetchGitHubUser(
  username: string
): Promise<GitHubUser | null> {
  // Check cache first
  if (userCache.has(username)) {
    return userCache.get(username)!;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'edmundmiller.dev-blog',
      },
    });

    if (!response.ok) {
      console.warn(
        `Failed to fetch GitHub user ${username}: ${response.status}`
      );
      return null;
    }

    const userData: GitHubUser = await response.json();
    userCache.set(username, userData);
    return userData;
  } catch (error) {
    console.warn(`Error fetching GitHub user ${username}:`, error);
    return null;
  }
}

/**
 * Convert GitHub username to author information with known author fallback
 * @param username GitHub username (e.g., "ewels")
 * @returns AuthorInfo object with enhanced display name when available
 */
export function createAuthorInfo(username: string): AuthorInfo {
  const knownAuthor = getKnownAuthor(username);

  if (knownAuthor) {
    const authorInfo: AuthorInfo = {
      username,
      displayName: knownAuthor.displayName,
      githubUrl: `https://github.com/${username}`,
    };

    if (knownAuthor.bio) {
      authorInfo.bio = knownAuthor.bio;
    }

    if (knownAuthor.website) {
      authorInfo.website = knownAuthor.website;
    }

    return authorInfo;
  }

  // Fallback for unknown authors
  return {
    username,
    displayName: username, // Fallback to username
    githubUrl: `https://github.com/${username}`,
  };
}

/**
 * Enhance author info with GitHub data
 * @param username GitHub username
 * @returns Promise<AuthorInfo> with GitHub data if available
 */
export async function getEnhancedAuthorInfo(
  username: string
): Promise<AuthorInfo> {
  const baseInfo = createAuthorInfo(username);

  const githubUser = await fetchGitHubUser(username);
  if (githubUser) {
    const enhanced: AuthorInfo = {
      ...baseInfo,
      displayName: githubUser.name || baseInfo.displayName, // Prefer GitHub name but fallback to known author
      avatarUrl: githubUser.avatar_url,
    };

    if (githubUser.bio && !baseInfo.bio) {
      enhanced.bio = githubUser.bio;
    }

    return enhanced;
  }

  return baseInfo;
}

/**
 * Process multiple authors and enhance with GitHub data
 * @param authors Array of GitHub usernames or single username
 * @returns Promise<AuthorInfo[]>
 */
export async function processAuthors(
  authors: string | string[] | undefined
): Promise<AuthorInfo[]> {
  if (!authors) return [];

  const authorList = Array.isArray(authors) ? authors : [authors];

  // For static sites, we'll use the simpler createAuthorInfo without API calls
  // but keep this function for potential future enhancement
  return authorList.map((username) => createAuthorInfo(username));
}
