import CareerMap from '../../components/CareerMap/CareerMap';
import { post10thCareerMap } from '../../data/careerMapData';

export default function Page() {
  return (
    <div className="container" style={{ padding: '24px', textAlign: 'center', maxWidth: '100vw', overflowX: 'hidden' }}>
      <div style={{ margin: '0 auto', width: '100%' }}>
        <CareerMap data={post10thCareerMap} />
      </div>
    </div>
  );
}
