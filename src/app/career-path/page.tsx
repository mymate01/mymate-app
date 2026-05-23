import CareerMap from '../../components/CareerMap/CareerMap';
import { post10thCareerMap } from '../../data/careerMapData';

export default function Page() {
  return (
    <div className="container" style={{ padding: '60px 24px', textAlign: 'center', maxWidth: '100vw' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem' }}>Interactive Career Map</h1>
      <p style={{ marginTop: '16px', marginBottom: '60px', color: 'var(--text-muted)' }}>
        Explore your educational pathways after 10th grade. Click to expand!
      </p>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-start', 
        textAlign: 'left', 
        overflowX: 'auto', 
        padding: '20px 40px',
        minHeight: '600px'
      }}>
        <div style={{ margin: 'auto' }}>
          <CareerMap data={post10thCareerMap} />
        </div>
      </div>
    </div>
  );
}
