/**
 * Linear GraphQL API Utility
 * 
 * Creates Linear tickets programmatically via the GraphQL API.
 * Usage:
 *   npx tsx src/scripts/linear-create.ts --title "Feature X" --body "Description..." [--priority 2] [--team MYM]
 * 
 * Requires LINEAR_API_KEY in .env.local
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const LINEAR_API_URL = 'https://api.linear.app/graphql';
const API_KEY = process.env.LINEAR_API_KEY || '';

// ─── Types ────────────────────────────────────────────────────

interface LinearTeam {
  id: string;
  name: string;
  key: string;
}

interface LinearLabel {
  id: string;
  name: string;
}

interface LinearIssueResult {
  id: string;
  identifier: string;
  title: string;
  url: string;
}

interface LinearGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

// ─── Core GraphQL Client ──────────────────────────────────────

async function linearQuery<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!API_KEY) {
    throw new Error(
      'LINEAR_API_KEY is not set in .env.local.\n' +
      'Generate one at: Linear → Settings → API → Personal API Keys'
    );
  }

  const response = await fetch(LINEAR_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result: LinearGraphQLResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(`Linear API Error: ${result.errors[0].message}`);
  }

  if (!result.data) {
    throw new Error('Linear API returned no data');
  }

  return result.data;
}

// ─── API Functions ────────────────────────────────────────────

/** Fetch all teams to resolve team key → team UUID */
export async function getTeams(): Promise<LinearTeam[]> {
  const data = await linearQuery<{ teams: { nodes: LinearTeam[] } }>(`
    query {
      teams {
        nodes {
          id
          name
          key
        }
      }
    }
  `);
  return data.teams.nodes;
}

/** Resolve a team key (e.g. "MYM") to its UUID */
export async function getTeamId(teamKey: string): Promise<string> {
  const teams = await getTeams();
  const team = teams.find(t => t.key.toUpperCase() === teamKey.toUpperCase());
  if (!team) {
    const available = teams.map(t => `${t.key} (${t.name})`).join(', ');
    throw new Error(`Team "${teamKey}" not found. Available teams: ${available}`);
  }
  return team.id;
}

/** Fetch available labels for a team */
export async function getLabels(teamId: string): Promise<LinearLabel[]> {
  const data = await linearQuery<{ issueLabels: { nodes: LinearLabel[] } }>(`
    query Labels($teamId: ID) {
      issueLabels(filter: { team: { id: { eq: $teamId } } }) {
        nodes {
          id
          name
        }
      }
    }
  `, { teamId });
  return data.issueLabels.nodes;
}

/** Create a new Linear issue */
export async function createIssue(options: {
  teamId: string;
  title: string;
  description: string;
  priority?: number;  // 0=No priority, 1=Urgent, 2=High, 3=Medium, 4=Low
  labelIds?: string[];
}): Promise<LinearIssueResult> {
  const data = await linearQuery<{
    issueCreate: {
      success: boolean;
      issue: LinearIssueResult;
    };
  }>(`
    mutation CreateIssue($teamId: String!, $title: String!, $description: String!, $priority: Int, $labelIds: [String!]) {
      issueCreate(input: {
        teamId: $teamId
        title: $title
        description: $description
        priority: $priority
        labelIds: $labelIds
      }) {
        success
        issue {
          id
          identifier
          title
          url
        }
      }
    }
  `, {
    teamId: options.teamId,
    title: options.title,
    description: options.description,
    priority: options.priority ?? 3,
    labelIds: options.labelIds,
  });

  if (!data.issueCreate.success) {
    throw new Error('Failed to create Linear issue');
  }

  return data.issueCreate.issue;
}

// ─── CLI Entry Point ──────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  // Parse CLI args
  let title = '';
  let body = '';
  let teamKey = 'MYM';
  let priority = 3;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--title':
        title = args[++i] || '';
        break;
      case '--body':
        body = args[++i] || '';
        break;
      case '--team':
        teamKey = args[++i] || 'MYM';
        break;
      case '--priority':
        priority = parseInt(args[++i] || '3', 10);
        break;
    }
  }

  if (!title) {
    console.log('Usage: npx tsx src/scripts/linear-create.ts --title "Feature X" --body "Description..." [--priority 2] [--team MYM]');
    console.log('\nPriority: 0=None, 1=Urgent, 2=High, 3=Medium, 4=Low');
    process.exit(1);
  }

  try {
    console.log(`Resolving team "${teamKey}"...`);
    const teamId = await getTeamId(teamKey);
    console.log(`Team resolved: ${teamId}`);

    console.log(`Creating issue: "${title}"...`);
    const issue = await createIssue({ teamId, title, description: body, priority });
    
    console.log(`\n✅ Issue created successfully!`);
    console.log(`   ID: ${issue.identifier}`);
    console.log(`   Title: ${issue.title}`);
    console.log(`   URL: ${issue.url}`);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run if executed directly
const isDirectExecution = process.argv[1]?.includes('linear-create');
if (isDirectExecution) {
  main();
}
