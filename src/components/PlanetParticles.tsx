import Spline from '@splinetool/react-spline';

export default function PlanetParticles() {
  return (
    <Spline scene="https://prod.spline.design/ddFcNRl76yfR7o1R/scene.splinecode" 
    style={{ background: 'transparent' }}
  onLoad={(spline) => {
    spline.setZoom(1);
  }}
  className="w-full h-full"
    />
  );
}