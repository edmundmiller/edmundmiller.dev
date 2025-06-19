/**
 * Author information mapping
 * Maps GitHub usernames to their display names and additional info
 */
export interface KnownAuthor {
  username: string;
  displayName: string;
  bio?: string;
  website?: string;
}

export const knownAuthors: Record<string, KnownAuthor> = {
  edmundmiller: {
    username: "edmundmiller",
    displayName: "Edmund Miller",
    bio: "Bioinformatics, Biology, Genomics",
    website: "https://edmundmiller.dev",
  },
  ewels: {
    username: "ewels",
    displayName: "Phil Ewels",
    bio: "Bioinformatics developer, nf-core co-founder",
    website: "https://phil.ewels.co.uk",
  },
};

/**
 * Get known author information by username
 * @param username GitHub username
 * @returns KnownAuthor object or null if not found
 */
export function getKnownAuthor(username: string): KnownAuthor | null {
  return knownAuthors[username] || null;
}
