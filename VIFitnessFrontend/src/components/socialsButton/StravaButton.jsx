export default function StravaButton({ children, ...attributes }) {
  return (
    <button
      type="button"
      className="min-w-[202px] text-white bg-[#FC4C02] hover:bg-[#ff6524]/90 focus:ring-2 focus:outline-none focus:ring-[#ffffff]/50 font-medium rounded-lg text-sm px-7 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      {...attributes}
    >
      <svg
        className="w-4 h-4 mr-2"
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Strava</title>
        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
      </svg>
      {children}
    </button>
  );
}
