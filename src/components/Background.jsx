/** Fixed decorative backdrop: soft gradient orbs over a faint grid. Pure CSS animation. */
export default function Background() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop-grid" />
      <div className="orb orb-violet" />
      <div className="orb orb-cyan" />
      <div className="orb orb-pink" />
      <div className="backdrop-noise" />
    </div>
  );
}
