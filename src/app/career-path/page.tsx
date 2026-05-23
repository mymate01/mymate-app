import CareerMap from '../../components/CareerMap/CareerMap';
import { supabase } from '../../utils/supabase';
import { CareerNode } from '../../types/career';

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
  const { data: nodes, error } = await supabase.from('career_nodes').select('*');
  
  if (error || !nodes || nodes.length === 0) {
    console.error('Failed to load career nodes', error);
    return <div>Failed to load career data. Make sure to run the migration script and create the tables.</div>;
  }

  // Build the tree starting from the root node (assuming 10th_grade has parent_id = null)
  const tree = buildTree(nodes, null);
  const rootNode = tree[0];

  return (
    <div className="container" style={{ padding: '24px', textAlign: 'center', maxWidth: '100vw', overflowX: 'hidden' }}>
      <div style={{ margin: '0 auto', width: '100%' }}>
        {rootNode ? (
          <CareerMap data={rootNode} />
        ) : (
          <p>Loading career data...</p>
        )}
      </div>
    </div>
  );
}
