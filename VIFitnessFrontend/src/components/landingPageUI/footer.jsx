import { Separator } from "@/components/ui/separator";
import { tokens } from "@/routes/theme";
import { useTheme } from "@mui/material";
export default function Footer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <div className="min-h-[30vh] bg-black ">
        <div className="flex justify-center pt-5">
          {/* <Separator
            className="w-[90vw]"
            style={{ backgroundColor: "#6e6e6e" }}
          /> */}
        </div>

        <footer className="bg-black dark:bg-gray-900 flex justify-center">
          <div className="w-full max-w-[90vw] p-4 py-6 ">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0 hover:opacity-70 transition-opacity h-fit">
                <a
                  href="https://github.com/bron322/SC2006VIFitness"
                  className="flex items-center"
                >
                  <img
                    src="/VIlogoWhite.png"
                    className="h-12 mr-3  "
                    alt="VI Fitness Logo"
                  />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-neutral-300">
                    VI Fitness
                  </span>
                </a>
              </div>

              <div className="w-fit flex mt-10 ml-10">
                <div className="relative w-[200px] h-[70px] opacity-70 hover:opacity-100 transition-opacity m-2">
                  <a
                    href="https://www.nutritionix.com/business/api"
                    target="_blank"
                  >
                    <img
                      src="/nutritionixLogo.png"
                      className="h-12 mr-3  "
                      alt="Nutritionix Logo"
                    />
                    <span className="absolute w-fit top-[14px] start-[40px] text-neutral-400 font-thin text-sm">
                      Powered by
                    </span>
                    <span className="absolute w-fit top-[25px] start-[30px] text-neutral-200 font-black text-2xl">
                      Nutritionix API
                    </span>
                  </a>
                </div>

                <div className="relative w-[200px] h-[70px] opacity-70 hover:opacity-100 transition-opacity m-2">
                  <a
                    href="https://developers.strava.com/docs/reference/"
                    target="_blank"
                  >
                    <img
                      src="/stravaLogo.png"
                      className="h-12 mr-3  "
                      alt="Strava Logo"
                    />
                    <span className="absolute w-fit top-[14px] start-[40px] text-neutral-400 font-thin text-sm">
                      Powered by
                    </span>
                    <span className="absolute w-fit top-[25px] start-[30px] text-neutral-200 font-black text-2xl">
                      Strava API
                    </span>
                  </a>
                </div>

                <div className="relative w-[200px] h-[70px] opacity-70 hover:opacity-100 transition-opacity m-2">
                  <a
                    href="https://api-ninjas.com/api/exercises"
                    target="_blank"
                  >
                    <img
                      src="/ninjaLogo.png"
                      className="h-12 mr-3  "
                      alt="Ninjas Logo"
                    />
                    <span className="absolute w-fit top-[14px] start-[40px] text-neutral-400 font-thin text-sm">
                      Powered by
                    </span>
                    <span className="absolute w-fit top-[25px] start-[30px] text-neutral-200 font-black text-2xl">
                      Ninjas API
                    </span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-neutral-300 uppercase dark:text-white">
                    Resources
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a
                        href="https://sc-2006-vi-fitness.vercel.app/docs/guides/introduction/"
                        target="_blank"
                        className="hover:underline"
                      >
                        User Manual
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://sc-2006-vi-fitness.vercel.app/docs/developerapi/getting-started/"
                        target="_blank"
                        className="hover:underline"
                      >
                        API Reference
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-neutral-300 uppercase dark:text-white">
                    Follow us
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a
                        href="https://github.com/bron322/SC2006VIFitness"
                        target="_blank"
                        className="hover:underline "
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Discord
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-neutral-300 uppercase dark:text-white">
                    Legal
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a
                        href="https://sc-2006-vi-fitness.vercel.app/privacy"
                        target="_blank"
                        className="hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://sc-2006-vi-fitness.vercel.app/terms/"
                        target="_blank"
                        className="hover:underline"
                      >
                        Term of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="my-6 border-neutral-400 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023{" "}
                <a
                  href="https://github.com/bron322/SC2006VIFitness"
                  target="_blank"
                  className="hover:underline"
                >
                  VI Fitness™
                </a>
                . All Rights Reserved.
              </span>
              <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">GitHub account</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
