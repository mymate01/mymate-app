import * as fs from 'fs';
import * as path from 'path';
import CareerMap from '../../components/CareerMap/CareerMap';
import { supabase } from '../../utils/supabase';
import { CareerNode } from '../../types/career';

// This page fetches from Supabase at runtime — skip static pre-rendering
export const dynamic = 'force-dynamic';

interface CareerNodeRow {
  id: string;
  parent_id: string | null;
  label: string;
  description: string | null;
  details: CareerNode['details'] | null;
}

// Reconstruct the tree from flattened database rows
function buildTree(nodes: CareerNodeRow[], parentId: string | null = null): CareerNode[] {
  return nodes
    .filter(node => node.parent_id === parentId)
    .map(node => ({
      id: node.id,
      label: node.label,
      description: node.description ?? undefined,
      details: node.details ?? undefined,
      children: buildTree(nodes, node.id)
    }));
}

export default async function Page() {
  let rootNode: CareerNode | null = null;

  try {
    const { data: nodes, error } = await supabase.from('career_nodes').select('*');
    
    if (error || !nodes || nodes.length === 0) {
      console.warn('Supabase career_nodes empty or unconfigured. Falling back to local seed JSON...');
      
      const seedPath = path.join(process.cwd(), 'supabase', 'seed_career_nodes.json');
      if (fs.existsSync(seedPath)) {
        rootNode = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
      }
    } else {
      // Build the tree starting from the root node (assuming 10th_grade has parent_id = null)
      const tree = buildTree(nodes, null);
      rootNode = tree[0];
    }
  } catch (err) {
    console.error('Exception fetching career nodes, using local fallback...', err);
    const seedPath = path.join(process.cwd(), 'supabase', 'seed_career_nodes.json');
    if (fs.existsSync(seedPath)) {
      rootNode = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    }
  }

  if (!rootNode) {
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#ff6b4a', fontWeight: 800 }}>Failed to load career data</h2>
        <p style={{ marginTop: '16px', color: '#718096' }}>
          Please make sure the seed file exists at `supabase/seed_career_nodes.json`.
        </p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px', textAlign: 'center', maxWidth: '100vw', overflowX: 'hidden' }}>
      <div style={{ margin: '0 auto', width: '100%' }}>
        <CareerMap data={rootNode} />
      </div>
    </div>
  );
}
