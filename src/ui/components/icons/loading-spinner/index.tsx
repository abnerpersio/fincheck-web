import './styles.css';

export function LoadingSpinner() {
  return (
    <svg
      className="loading-spinner"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      stroke="currentColor"
    >
      <g>
        <circle cx={12} cy={12} r={9.5} fill="none" strokeWidth={3} />
      </g>
    </svg>
  );
}
